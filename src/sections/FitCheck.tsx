"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/Button";
import { MaskLines, Reveal } from "@/components/Reveal";
import { RichText } from "@/components/bits";
import { en } from "@/content/en";
import { goToContact } from "@/lib/motion";
import { play } from "@/lib/sound";

const ease = [0.22, 1, 0.36, 1] as const;

/**
 * Is this for you? A decision tree on the dot grid, one question at a time.
 * The chosen path lights up, the connector draws itself to the next node.
 * Client side only, nothing is stored. A "no" never reads like a failure.
 */
export function FitCheck() {
  const f = en.fit;
  const [answers, setAnswers] = useState<{ q: number; a: number; fit: boolean }[]>([]);
  const step = answers.length;
  const done = step === f.questions.length;
  const fit = done && answers.every((x) => x.fit);

  const choose = (a: number, isFit: boolean) => {
    const next = [...answers, { q: step, a, fit: isFit }];
    setAnswers(next);
    if (next.length === f.questions.length) play("chime");
    else play("tick");
  };

  return (
    <section id="fit" className="dot-grid relative bg-ink-900 py-28 md:py-36">
      <Reveal className="mx-auto max-w-[1100px] px-5 sm:px-8">
        <p className="eyebrow mb-5" data-reveal="rise">{f.eyebrow}</p>
        <MaskLines lines={f.h2} className="h2 max-w-[20ch] text-paper" />
        <p className="mt-6 font-mono text-[13px] text-muted" data-reveal="rise">{f.sub}</p>
      </Reveal>

      <div className="mx-auto mt-14 max-w-[1100px] px-5 sm:px-8">
        {/* path so far */}
        <ol className="relative">
          {answers.map((x, i) => (
            <li key={i} className="relative pb-8 pl-10">
              <span className="absolute left-[9px] top-2 h-full w-[2px] bg-royal-glow shadow-[0_0_10px_rgba(75,72,255,.8)]" aria-hidden />
              <span className="absolute left-0 top-1 h-5 w-5 rounded-full border-2 border-royal-glow bg-ink-900" aria-hidden />
              <p className="text-[15px] text-muted">{f.questions[x.q].q}</p>
              <p className="mt-1 inline-flex rounded-full bg-royal-glow/20 px-3 py-1 font-mono text-[13px] text-paper">{f.questions[x.q].answers[x.a].label}</p>
            </li>
          ))}
        </ol>

        <div className="relative pl-10" aria-live="polite">
          <motion.span
            key={`line-${step}`}
            className="absolute left-[9px] top-[-2rem] w-[2px] origin-top bg-royal-glow"
            initial={{ scaleY: 0, height: step ? "2rem" : 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 0.5, ease }}
            aria-hidden
          />
          <span className={`absolute left-0 top-1 h-5 w-5 rounded-full border-2 ${done ? "border-spark bg-spark" : "border-paper/40 bg-ink-900"}`} aria-hidden />
          <AnimatePresence mode="wait">
            {!done ? (
              <motion.div
                key={`q-${step}`}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.45, ease }}
              >
                <p className="font-mono text-[12px] tracking-[0.2em] text-royal-soft">
                  {step + 1}/{f.questions.length}
                </p>
                <h3 className="h3 mt-2 text-paper">{f.questions[step].q}</h3>
                <div className="mt-6 flex flex-wrap gap-3">
                  {f.questions[step].answers.map((a, i) => (
                    <button
                      key={a.label}
                      type="button"
                      onClick={() => choose(i, a.fit)}
                      className="glass min-h-14 rounded-[16px] px-6 text-[17px] font-medium text-paper transition-all duration-200 hover:-translate-y-0.5 hover:border-royal-glow/70 hover:bg-royal-glow/15"
                    >
                      {a.label}
                    </button>
                  ))}
                </div>
                {step > 0 && (
                  <button type="button" onClick={() => setAnswers(answers.slice(0, -1))} className="mt-6 font-mono text-[12px] text-muted underline-offset-4 hover:text-paper hover:underline">
                    ← {f.back}
                  </button>
                )}
              </motion.div>
            ) : (
              <motion.div
                key="result"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, ease }}
                className={`glass max-w-[44rem] rounded-[24px] p-7 md:p-9 ${fit ? "border-spark/40" : ""}`}
              >
                <h3 className="h3 text-paper">{fit ? f.fitTitle : f.notFitTitle}</h3>
                <p className="mt-4 text-paper/80">{fit ? f.fitBody : f.notFitBody}</p>
                <div className="mt-7 flex flex-wrap items-center gap-3">
                  {fit ? (
                    <Button variant="spark" onClick={goToContact}>
                      {f.fitCta} <span aria-hidden>→</span>
                    </Button>
                  ) : (
                    <Button variant="glass" href={f.notFitHref}>
                      <RichText text={f.notFitCta} />
                    </Button>
                  )}
                  <Button variant="ghost" onClick={() => setAnswers([])}>
                    {f.restart}
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
