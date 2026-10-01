import { Resend } from "resend";
import { contactSchema } from "@/lib/contact-schema";

// Sends the request to Marco with Resend. Stores nothing.
// Spam protection: honeypot field, minimum fill time of 3 seconds, basic rate limit per IP.

const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string) {
  const now = Date.now();
  const list = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  list.push(now);
  hits.set(ip, list);
  return list.length > MAX_PER_WINDOW;
}

function escapeHtml(s: string) {
  return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
}

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (rateLimited(ip)) {
    return Response.json({ ok: false, error: "rate_limited" }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: "bad_json" }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return Response.json({ ok: false, error: "invalid", fields: parsed.error.issues.map((i) => i.path.join(".")) }, { status: 422 });
  }
  const d = parsed.data;

  // Bots fill the honeypot or submit instantly. Answer "ok" so they learn nothing.
  if (d.company || Date.now() - d.startedAt < 3000) {
    return Response.json({ ok: true });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;
  if (!apiKey || !to || !from) {
    console.error("[contact] RESEND_API_KEY, CONTACT_TO_EMAIL or CONTACT_FROM_EMAIL missing");
    return Response.json({ ok: false, error: "not_configured" }, { status: 503 });
  }

  const when = new Intl.DateTimeFormat("de-DE", {
    timeZone: "Europe/Berlin",
    dateStyle: "full",
    timeStyle: "short",
  }).format(new Date());

  const lines = [
    `Name: ${d.name}`,
    `Email: ${d.email}`,
    `Website or LinkedIn: ${d.website || "-"}`,
    `Wants help with: ${d.topic}`,
    `Ready to invest: ${d.invest}`,
    `Received: ${when} (Europe/Berlin)`,
    "",
    d.message,
  ];
  const text = lines.join("\n");
  const html = `<div style="font-family:system-ui,sans-serif;font-size:15px;line-height:1.55;color:#14142B">
<table style="border-collapse:collapse">${lines
    .slice(0, 6)
    .map((l) => {
      const [k, ...v] = l.split(": ");
      return `<tr><td style="padding:2px 12px 2px 0;color:#6b6e8a">${escapeHtml(k)}</td><td>${escapeHtml(v.join(": "))}</td></tr>`;
    })
    .join("")}</table>
<p style="white-space:pre-wrap;margin-top:16px;padding:16px;background:#F4F1EA;border-radius:8px">${escapeHtml(d.message)}</p></div>`;

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from,
    to,
    replyTo: d.email,
    subject: `New request: ${d.name} (${d.topic})`,
    text,
    html,
  });
  if (error) {
    console.error("[contact] resend error", error.name);
    return Response.json({ ok: false, error: "send_failed" }, { status: 502 });
  }

  if (process.env.AUTO_REPLY_ENABLED === "true") {
    await resend.emails
      .send({
        from,
        to: d.email,
        subject: "Your request / Deine Anfrage",
        text: `Hi ${d.name},\n\nthank you for your request. I read every message myself and will get back to you.\n\nDanke für deine Anfrage. Ich lese jede Nachricht selbst und melde mich bei dir.\n\nMarco Bednarz\nBrand Sculptors`,
      })
      .catch(() => undefined);
  }

  return Response.json({ ok: true });
}
