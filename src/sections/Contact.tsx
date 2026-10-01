"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Button, SparkBurst } from "@/components/Button";
import { MaskLines, Reveal } from "@/components/Reveal";
import { PixelBar, RichText } from "@/components/bits";
import { en } from "@/content/en";
import { play } from "@/lib/sound";

type Status = "idle" | "sending" | "success" | "error";
type Errors = Partial<Record<"name" | "email" | "topic" | "invest" | "message" | "consent", string>>;

const CONTACT_EMAIL = process.env.NEXT_PUBLIC_CONTACT_EMAIL || "marco@brandsculptors.info";
const FORM_NAME = "demo-request";
const CALENDLY_ON = process.env.NEXT_PUBLIC_FEATURE_CALENDLY === "true";
const CALENDLY_URL = process.env.NEXT_PUBLIC_CALENDLY_URL || "";

/**
 * GO: the contact form. The one primary action of the site.
 * Labels always visible, errors announced, works without the animation layer.
 * On error nothing the visitor typed gets lost, plus a mailto fallback.
 */
export function Contact() {
  const c = en.contact;
  const fl = c.fields;
  const [values, setValues] = useState({ name: "", email: "", website: "", topic: "", invest: "", message: "", consent: false, company: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [sendProg, setSendProg] = useState(0);
  const startedAt = useRef<number>(0);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  useEffect(() => {
    if (status !== "sending") return;
    const id = window.setInterval(() => setSendProg((p) => Math.min(0.92, p + 0.07)), 120);
    return () => window.clearInterval(id);
  }, [status]);

  const set = (k: keyof typeof values, v: string | boolean) => {
    setValues((s) => ({ ...s, [k]: v }));
    if (errors[k as keyof Errors]) setErrors((e) => ({ ...e, [k]: undefined }));
  };

  const validate = (): Errors => {
    const e: Errors = {};
    if (!values.name.trim()) e.name = c.errors.name;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email.trim())) e.email = c.errors.email;
    if (!values.topic) e.topic = c.errors.topic;
    if (!values.invest) e.invest = c.errors.invest;
    if (values.message.trim().length < 30) e.message = c.errors.message;
    if (!values.consent) e.consent = c.errors.consent;
    return e;
  };

  const submit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    const first = Object.keys(e)[0];
    if (first) {
      formRef.current?.querySelector<HTMLElement>(`[data-field='${first}']`)?.focus();
      return;
    }
    setSendProg(0.06);
    setStatus("sending");
    try {
      // Bots submit within seconds or fill the hidden field. They get the success screen and nothing is sent.
      if (values.company || Date.now() - startedAt.current < 3000) {
        setSendProg(1);
        setStatus("success");
        return;
      }
      // Netlify Forms: the form is registered through public/__forms.html, Netlify emails every request to Marco.
      const body = new URLSearchParams({
        "form-name": FORM_NAME,
        name: values.name.trim(),
        email: values.email.trim(),
        website: values.website.trim(),
        topic: values.topic,
        invest: values.invest,
        message: values.message.trim(),
        consent: values.consent ? "yes" : "no",
        company: "",
      });
      const res = await fetch("/__forms.html", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: body.toString(),
      });
      if (!res.ok) throw new Error(String(res.status));
      setSendProg(1);
      play("success");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  const mailto = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(`Request: ${values.name || ""}`)}&body=${encodeURIComponent(
    `${values.message}\n\n${values.topic}\n${values.website}`,
  )}`;

  const labelCls = "mb-2 block text-[14px] font-medium text-paper";
  const errCls = "mt-2 text-[14px] text-[#ffb3a7]";

  return (
    <section
      id="contact"
      className="glow-royal relative flex min-h-[100svh] items-center overflow-hidden bg-ink-950 py-28"
      style={{ "--glow-y": "40%", "--glow-size": "1300px" } as React.CSSProperties}
    >
      <div className="mx-auto grid w-full max-w-[1320px] gap-14 px-5 sm:px-8 lg:grid-cols-[1fr_1.15fr] lg:gap-20">
        <Reveal>
          <p className="eyebrow mb-5" data-reveal="rise">{c.eyebrow}</p>
          <MaskLines lines={c.h2} className="h2 max-w-[14ch] text-paper" />
          <p className="lede mt-8 max-w-[34rem]" data-reveal="rise">
            <RichText text={c.sub} />
          </p>
          <p className="mt-8 max-w-[30rem] border-l-2 border-spark pl-4 text-[17px] text-paper/85" data-reveal="rise">
            {c.promise}
          </p>
          <a
            href={c.socialHref}
            target="_blank"
            rel="noreferrer"
            className="mt-10 inline-flex items-center gap-2 font-mono text-[13px] text-royal-soft hover:text-paper"
            data-reveal="rise"
          >
            {c.social}: {c.socialHandle} ↗
          </a>
        </Reveal>

        <div className="relative">
          <AnimatePresence mode="wait">
            {status === "success" ? (
              <motion.div
                key="ok"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="glass relative flex min-h-[320px] flex-col items-start justify-center rounded-[28px] p-8 md:p-12"
                role="status"
              >
                <span className="relative mb-6 block h-4 w-4 rounded-full bg-spark shadow-[0_0_30px_8px_rgba(255,204,77,.6)]">
                  <SparkBurst x={8} y={8} count={10} />
                </span>
                <h3 className="h3 text-paper">{c.successTitle}</h3>
                <p className="mt-3 text-paper/75">
                  <RichText text={c.successBody} />
                </p>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                ref={formRef}
                onSubmit={submit}
                noValidate
                exit={{ opacity: 0, scale: 0.97 }}
                className="glass rounded-[28px] p-6 md:p-9"
              >
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="cf-name" className={labelCls}>
                      {fl.name}
                    </label>
                    <input id="cf-name" name="name" data-field="name" autoComplete="name" className="field" value={values.name} onChange={(e) => set("name", e.target.value)} aria-invalid={!!errors.name} aria-describedby={errors.name ? "cf-name-err" : undefined} required />
                    {errors.name && <p id="cf-name-err" className={errCls} role="alert">{errors.name}</p>}
                  </div>
                  <div>
                    <label htmlFor="cf-email" className={labelCls}>
                      {fl.email}
                    </label>
                    <input id="cf-email" name="email" type="email" data-field="email" autoComplete="email" className="field" value={values.email} onChange={(e) => set("email", e.target.value)} aria-invalid={!!errors.email} aria-describedby={errors.email ? "cf-email-err" : undefined} required />
                    {errors.email && <p id="cf-email-err" className={errCls} role="alert">{errors.email}</p>}
                  </div>
                </div>

                <div className="mt-5">
                  <label htmlFor="cf-website" className={labelCls}>
                    {fl.website} <span className="font-normal text-muted">({fl.optional})</span>
                  </label>
                  <input id="cf-website" name="website" autoComplete="url" className="field" value={values.website} onChange={(e) => set("website", e.target.value)} />
                </div>

                <fieldset className="mt-6" aria-describedby={errors.topic ? "cf-topic-err" : undefined}>
                  <legend className={labelCls}>{fl.topic}</legend>
                  <div className="flex flex-wrap gap-2" role="radiogroup">
                    {fl.topics.map((t, i) => {
                      const on = values.topic === t;
                      return (
                        <label
                          key={t}
                          className={`cursor-pointer rounded-full border px-4 py-2.5 text-[14.5px] transition-all duration-200 has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-royal-glow ${
                            on ? "border-royal-glow bg-royal-glow/25 text-paper" : "border-paper/15 text-paper/80 hover:border-royal-soft/50"
                          }`}
                        >
                          <input type="radio" name="topic" value={t} checked={on} onChange={() => set("topic", t)} className="sr-only" data-field={i === 0 ? "topic" : undefined} />
                          {t}
                        </label>
                      );
                    })}
                  </div>
                  {errors.topic && <p id="cf-topic-err" className={errCls} role="alert">{errors.topic}</p>}
                </fieldset>

                <fieldset className="mt-6" aria-describedby={errors.invest ? "cf-invest-err" : undefined}>
                  <legend className={labelCls}>{fl.invest}</legend>
                  <div className="flex flex-wrap gap-2" role="radiogroup">
                    {fl.invests.map((t, i) => {
                      const on = values.invest === t;
                      return (
                        <label
                          key={t}
                          className={`cursor-pointer rounded-full border px-4 py-2.5 text-[14.5px] transition-all duration-200 has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-royal-glow ${
                            on ? "border-note-proof bg-note-proof/15 text-paper shadow-[0_0_20px_-6px_rgba(255,210,63,.7)]" : "border-paper/15 text-paper/80 hover:border-note-proof/50"
                          }`}
                        >
                          <input type="radio" name="invest" value={t} checked={on} onChange={() => set("invest", t)} className="sr-only" data-field={i === 0 ? "invest" : undefined} />
                          {t}
                        </label>
                      );
                    })}
                  </div>
                  {errors.invest && <p id="cf-invest-err" className={errCls} role="alert">{errors.invest}</p>}
                </fieldset>

                <div className="mt-6">
                  <label htmlFor="cf-message" className={labelCls}>
                    {fl.message}
                  </label>
                  <textarea id="cf-message" name="message" data-field="message" rows={5} className="field resize-y" placeholder={fl.messagePlaceholder} value={values.message} onChange={(e) => set("message", e.target.value)} aria-invalid={!!errors.message} aria-describedby={errors.message ? "cf-message-err" : undefined} required />
                  {errors.message && <p id="cf-message-err" className={errCls} role="alert">{errors.message}</p>}
                </div>

                {/* honeypot: hidden from people, tempting for bots */}
                <div className="absolute -left-[9999px] h-px w-px overflow-hidden" aria-hidden>
                  <label htmlFor="cf-company">Company</label>
                  <input id="cf-company" name="company" tabIndex={-1} autoComplete="off" value={values.company} onChange={(e) => set("company", e.target.value)} />
                </div>

                <div className="mt-6">
                  <label className="flex cursor-pointer items-start gap-3 text-[15px] text-paper/85">
                    <input type="checkbox" name="consent" data-field="consent" checked={values.consent} onChange={(e) => set("consent", e.target.checked)} className="mt-1 h-5 w-5 shrink-0 accent-[#4B48FF]" aria-invalid={!!errors.consent} aria-describedby={errors.consent ? "cf-consent-err" : undefined} required />
                    <span>
                      {fl.consent}{" "}
                      <Link href="/datenschutz" className="text-royal-soft underline underline-offset-4 hover:text-paper">
                        {fl.consentLink}
                      </Link>
                    </span>
                  </label>
                  {errors.consent && <p id="cf-consent-err" className={errCls} role="alert">{errors.consent}</p>}
                </div>

                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <Button variant="spark" type="submit" disabled={status === "sending"} magnetic={status !== "sending"}>
                    {status === "sending" ? <PixelBar label={c.sending} value={sendProg} blocks={10} className="!text-note-ink [&_span.border-2]:border-note-ink/60" /> : c.submit}
                  </Button>
                </div>

                {status === "error" && (
                  <div className="mt-6 rounded-[16px] border border-[#ffb3a7]/40 bg-[#ffb3a7]/10 p-4" role="alert">
                    <p className="font-medium text-paper">{c.errorTitle}</p>
                    <p className="mt-1 text-[15px] text-paper/80">{c.errorBody}</p>
                    {CONTACT_EMAIL && (
                      <a href={mailto} className="mt-2 inline-block font-mono text-[13px] text-royal-soft underline underline-offset-4 hover:text-paper">
                        {c.errorMail} ↗
                      </a>
                    )}
                  </div>
                )}
              </motion.form>
            )}
          </AnimatePresence>

          {CALENDLY_ON && CALENDLY_URL && <CalendlyOption url={CALENDLY_URL} />}
        </div>
      </div>
    </section>
  );
}

/** Behind NEXT_PUBLIC_FEATURE_CALENDLY. Loads no Calendly script before the click. */
function CalendlyOption({ url }: { url: string }) {
  const [open, setOpen] = useState(false);
  const box = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    const s = document.createElement("script");
    s.src = "https://assets.calendly.com/assets/external/widget.js";
    s.async = true;
    document.body.appendChild(s);
  }, [open]);
  return (
    <div className="mt-8">
      {!open ? (
        <p className="text-[15px] text-muted">
          {en.contact.calendlyLead}{" "}
          <button type="button" onClick={() => setOpen(true)} className="text-royal-soft underline underline-offset-4 hover:text-paper">
            {en.contact.calendlyCta}
          </button>
        </p>
      ) : (
        <div ref={box} className="calendly-inline-widget overflow-hidden rounded-[20px]" data-url={url} style={{ minWidth: 320, height: 700 }} />
      )}
    </div>
  );
}
