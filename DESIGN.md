# DESIGN.md: Fire × Code

Generated from `docs/DESIGN_FRAMEWORK.md` (Prompt 1). This file is the working design system.
When it conflicts with `CLAUDE.md` or `docs/VOICE_AND_COPY.md`, those win.

## Concept

The site makes one idea visible: human storytelling and data-driven systems run together and
become one thing called leverage. **Humanity × Media & Code = Leverage.**

- **Fire, the human side:** warm, hand-made. Sticky notes, Caveat handwriting, film grain, hand-drawn underlines.
- **Code, the system side:** cool, precise. Grids, Geist Mono, data, glass surfaces.
- **Meeting point:** royal blue and yellow appear only where both sides become one.

Leverage is trust at scale. The human side creates trust, Media & Code scales it.

## Three layers, fixed ratio

| Layer | Share | Elements |
|---|---|---|
| Shell | 70 % | Dark ink UI, glass, 1px lines, slow confident motion. Hero, nav, type, buttons, section frames |
| Board | 20 % | Dot grid, sticky notes, connectors, pipes, decision trees, framed screenshots |
| Pixel | 10 % | Silkscreen micro labels, pixel progress bars, sound equalizer, hidden GO mode. Never headlines or body |

## Color tokens

Defined in `src/app/globals.css` (`@theme`), usable as Tailwind classes (`bg-ink-950`, `text-royal-glow`).

| Token | Value | Use |
|---|---|---|
| `ink-950` | `#07081A` | Base background. Never `#000` |
| `ink-900` | `#0C0E26` | Section surface |
| `ink-800` | `#15183A` | Raised cards |
| `line` | `rgba(244,241,234,0.08)` | 1px lines |
| `royal` | `#1210A1` | Large fills, gradients, glows. **Never text or thin lines on ink** |
| `royal-glow` | `#4B48FF` | Links, focus rings, active states on dark |
| `royal-soft` | `#9A98FF` | Small accent text on dark |
| `spark` | `#FFCC4D` | Primary action and GO moments only, max 5 % of a viewport |
| `paper` | `#F4F1EA` | Body text, the light Proof & Stage section |
| `muted` | `#A3A6C2` | Secondary text |
| `note-ink` | `#14142B` | Text on sticky notes and on paper |

Notes are dark glass cards with a neon edge and glow (`.note`), never tilted, never pinned.
On the paper section they turn white with a neon border. Their colors carry meaning:

| Meaning | Colors |
|---|---|
| Human (warm) | `#FF6A3D`, `#FF4FB8` |
| System (cool) | `#7B78FF`, `#22E3D0`, `#5AB8FF` |
| Proof | `#FFD23F` |

**Anti-dark rules:** every dark section has a soft royal radial glow (`.glow-royal`). Proof & Stage
flips to paper. Body text is paper, 17 to 19px, line height 1.6. All text WCAG AA.

## Typography

All fonts self-hosted through `next/font`. No request to Google from the visitor's browser.

| Role | Font | Rule |
|---|---|---|
| Display and UI | Geist | Headlines semibold/bold, tracking -0.02em |
| System voice | Geist Mono | Labels, numbers, data, code-like micro copy |
| Human voice | Geist with a warm neon accent | No handwriting font since 2026-10-01 |
| Pixel | Silkscreen | 8-bit micro labels only |

Scale: H1 `clamp(38px, 10vw, 112px)` (the framework says 48px minimum; 38px lets "your market trusts." fit on one line at 375px), H2 `clamp(36px, 4.6vw, 68px)`, body `clamp(17px, 1.2vw, 19px)`.

## Motion

- Default ease `cubic-bezier(0.22, 1, 0.36, 1)` (`--ease-premium`). Reveals 500 to 800ms, hovers 150 to 250ms.
- Buttons: magnetic within 12px, light sweep on hover, press scales to 0.97 and emits a yellow spark.
- Sections reveal with mask wipes and staggered children (`Reveal` component), not generic fade-ups.
- GSAP ScrollTrigger for scroll choreography, Lenis for smooth scroll, Framer Motion for micro-interactions.
- `prefers-reduced-motion`: Lenis off, no pinning, every choreography shows its final state with a plain opacity transition.

## Sound

Off by default. Toggle in the nav, saved in `localStorage` (`bs-sound`). Placeholder sounds are
synthesized with the Web Audio API in `src/lib/sound.ts`. To replace one, drop a file into
`/public/sounds/` and set its path in `SOUND_FILES`; it then plays through Howler.

| Sound | When | Length |
|---|---|---|
| tick | hover on spark buttons | < 80ms |
| click | press | < 120ms |
| whoosh | hero ignition | ~ 900ms |
| paper | a stage panel opens | < 250ms |
| chime | decision path completes | < 300ms |
| success | contact form sent | < 300ms |
| jingle | GO mode | ~ 1.2s |

Volume 0.2 to 0.35.

## Marco's own words instead of claims

No "receipts" anywhere on the page (decided 2026-10-01). Trust comes from Marco himself: his
portrait in the hero, the stage photos, his story, and his real lines from the interviews in the
paper section "In my own words". Quotes are verbatim from `../context/standout-statements.md`,
never invented. `[CONFIRM]` in the copy renders as a small yellow tag (`RichText`) until Marco
replaces it.

## Restraint

No hype words (secret, hack, explode, 10x, guaranteed, crush). No exclamation marks in headlines.
Outcomes before reach. GO mode stays hidden: press G three times, or click the pixel rocket in the footer.

## Components

| Component | File | Notes |
|---|---|---|
| Button | `src/components/Button.tsx` | `spark`, `glass`, `ghost`. Magnetic, sweep, spark burst, sound |
| StickyNote | `src/components/StickyNote.tsx` | `tone`: warm, warm2, cool, cool2, cool3, proof |
| RichText | `src/components/bits.tsx` | Renders `[CONFIRM]` tags |
| PixelBar | `src/components/PixelBar.tsx` | Silkscreen label plus stepped fill |
| Reveal | `src/components/Reveal.tsx` | Mask wipe reveal with stagger |
| SoundToggle | `src/components/SoundToggle.tsx` | Speaker plus pixel equalizer |
| GoMode | `src/components/GoMode.tsx` | Root `data-go` attribute, CSS variables only |

Review everything on `/lab`. Hero variants on the home page: `/?hero=a`, `/?hero=b`, `/?hero=c` (switcher bottom right in development).

## Content

All visible copy lives in `src/content/en.ts`. A German version goes into `src/content/de.ts` with the same shape.
