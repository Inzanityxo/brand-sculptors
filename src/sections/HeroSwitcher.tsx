import { en } from "@/content/en";

/**
 * Review helper for v1: switches the hero on the home page (/?hero=a, b or c).
 * Shown in development and whenever a hero is chosen in the URL. Remove before launch.
 */
export function HeroSwitcher({ current }: { current: "a" | "b" | "c" }) {
  const items = [
    { id: "a", label: "A", title: "Ignition" },
    { id: "b", label: "B", title: "Living board" },
    { id: "c", label: "C", title: "Pixel to premium" },
  ] as const;
  return (
    <nav
      aria-label="Hero variants"
      className="fixed bottom-4 right-4 z-[70] flex items-center gap-1 rounded-full border border-paper/15 bg-ink-950/85 p-1 pl-3 shadow-[0_10px_40px_-10px_rgba(0,0,0,.8)] backdrop-blur-xl"
    >
      <span className="pixel mr-1 text-[10px] text-spark">{en.hero.switcher.toUpperCase()}</span>
      {items.map((it) => (
        <a
          key={it.id}
          href={`/?hero=${it.id}${it.id === "a" ? "&replay" : ""}`}
          title={it.title}
          aria-current={current === it.id ? "true" : undefined}
          className={`flex h-9 min-w-9 items-center justify-center rounded-full px-3 font-mono text-[13px] transition-colors ${
            current === it.id ? "bg-spark text-note-ink" : "text-paper/80 hover:bg-paper/10"
          }`}
        >
          {it.label}
          <span className="ml-1.5 hidden text-[11px] opacity-70 sm:inline">{it.title}</span>
        </a>
      ))}
    </nav>
  );
}
