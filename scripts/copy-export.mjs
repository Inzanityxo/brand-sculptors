// Prints all visible copy from src/content as markdown, for voice-check.py and proofreading.
// Usage: node scripts/copy-export.mjs > /tmp/site-copy.md        (prose only, what voice-check measures)
//        node scripts/copy-export.mjs --all > /tmp/site-copy.md  (also labels and buttons)
import { en } from "../src/content/en.ts";

const SKIP_KEYS = new Set(["href", "image", "target", "key", "id", "tone", "noteTones", "column", "instagramHref", "schoolHref", "notFitHref", "value", "l", "chat", "command"]);
const out = [];
const ALL = process.argv.includes("--all");
const clean = (s) => s.replace(/\[(PROOF|CONFIRM)[^\]]*\]/g, "").replace(/\s+/g, " ").trim();
const end = (s) => (/[.!?:]$/.test(s) ? s : `${s}.`);

function walk(node, key) {
  if (typeof node === "string") {
    if (SKIP_KEYS.has(key) || node.startsWith("/") || node.startsWith("http") || node === "#") return;
    const t = clean(node);
    if (t && (ALL || t.split(" ").length >= 5)) out.push(end(t));
  } else if (Array.isArray(node)) node.forEach((n) => walk(n, key));
  else if (node && typeof node === "object") for (const [k, v] of Object.entries(node)) walk(v, k);
}

for (const [section, data] of Object.entries(en)) {
  if (["meta", "nav", "footer", "go"].includes(section)) continue;
  out.push(`\n## ${section}\n`);
  walk(data, section);
}
console.log(out.join("\n"));
