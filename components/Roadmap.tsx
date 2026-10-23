"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Check, Compass, Hammer, PackageCheck, PenTool, SearchCheck } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useEffect, useState } from "react";
import Reveal from "./Reveal";

type Step = {
  icon: LucideIcon;
  title: string;
  summary: string;
  deliverables: string[];
};

const steps: Step[] = [
  {
    icon: Compass,
    title: "Discovery & Audit",
    summary:
      "We map your goals, customers, tools and bottlenecks. Existing sites, funnels and workflows are audited so every decision starts from evidence.",
    deliverables: ["Stakeholder & goals workshop", "Tech and workflow audit", "Opportunity & risk assessment"],
  },
  {
    icon: PenTool,
    title: "Architecture & Blueprint",
    summary:
      "Findings become a precise technical blueprint: system diagrams, UX direction, data flows and an automation map you approve before we build.",
    deliverables: ["System & integration architecture", "UX and visual direction", "Scoped delivery blueprint"],
  },
  {
    icon: Hammer,
    title: "Sprint Development",
    summary:
      "We build in focused sprints with working increments you can see and react to, keeping feedback loops short and surprises rare.",
    deliverables: ["Iterative builds & demos", "AI and automation integration", "Shared progress visibility"],
  },
  {
    icon: SearchCheck,
    title: "QA, Testing & Optimization",
    summary:
      "Everything is stress-tested across devices, edge cases and failure modes, then tuned for speed, accessibility and conversion.",
    deliverables: ["Cross-device & workflow testing", "Performance and accessibility tuning", "Security & reliability checks"],
  },
  {
    icon: PackageCheck,
    title: "Deployment & Handover",
    summary:
      "We launch with monitoring in place, document how it all works and train your team so you are never dependent on guesswork.",
    deliverables: ["Production launch & monitoring", "Documentation and training", "Post-launch support plan"],
  },
];

export default function Roadmap() {
  const [active, setActive] = useState(0);
  const [auto, setAuto] = useState(true);

  // gentle autoplay until the visitor takes control
  useEffect(() => {
    if (!auto) return;
    const id = setInterval(() => setActive((a) => (a + 1) % steps.length), 5200);
    return () => clearInterval(id);
  }, [auto]);

  const choose = (i: number) => {
    setAuto(false);
    setActive(i);
  };

  const current = steps[active];
  const progress = (active / (steps.length - 1)) * 100;

  return (
    <section id="onboarding" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal className="max-w-3xl">
          <p className="eyebrow">// Client Onboarding Roadmap</p>
          <h2 className="section-title mt-4">
            From first call to <span className="text-gradient">live system</span> in five precise moves.
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-10 lg:grid-cols-[minmax(0,420px)_1fr] lg:gap-16">
          {/* step rail */}
          <Reveal>
            <ol className="relative space-y-3">
              {/* track */}
              <span className="absolute bottom-6 left-[27px] top-6 w-px bg-white/10" aria-hidden />
              <motion.span
                className="absolute bottom-6 left-[27px] top-6 w-px bg-gradient-to-b from-cyan-neon via-electric to-magenta-neon shadow-[0_0_12px_rgba(47,123,255,0.9)]"
                style={{ transformOrigin: "top" }}
                initial={{ scaleY: 0 }}
                animate={{ scaleY: progress / 100 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                aria-hidden
              />
              {steps.map((s, i) => {
                const state = i < active ? "done" : i === active ? "active" : "todo";
                return (
                  <li key={s.title}>
                    <button
                      type="button"
                      onClick={() => choose(i)}
                      onMouseEnter={() => auto === false && setActive(i)}
                      aria-current={state === "active" ? "step" : undefined}
                      className={`group relative flex w-full items-center gap-4 rounded-2xl border p-3 pr-4 text-left transition-all duration-300 ${
                        state === "active"
                          ? "border-electric/40 bg-white/[0.06] shadow-[0_0_40px_-12px_rgba(47,123,255,0.8)]"
                          : "border-transparent hover:border-white/10 hover:bg-white/[0.03]"
                      }`}
                    >
                      <span
                        className={`relative z-10 inline-flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-full border font-mono text-sm transition-all duration-300 ${
                          state === "todo"
                            ? "border-white/15 bg-[#0a0a0c] text-white/40"
                            : "bg-brand-gradient border-transparent text-white shadow-[0_0_24px_rgba(139,92,246,0.7)]"
                        }`}
                      >
                        {state === "done" ? <Check className="h-4 w-4" strokeWidth={3} /> : `0${i + 1}`}
                      </span>
                      <span
                        className={`font-display text-lg font-medium transition-colors ${
                          state === "todo" ? "text-white/45 group-hover:text-white/75" : "text-white"
                        }`}
                      >
                        {s.title}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ol>
          </Reveal>

          {/* detail panel */}
          <Reveal delay={0.1}>
            <div className="glass-strong relative min-h-[360px] overflow-hidden rounded-3xl p-8 sm:p-10">
              <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-violet-neon/25 blur-[100px]" />
              <div className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-electric/20 blur-[100px]" />

              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, y: 18, filter: "blur(6px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -12, filter: "blur(6px)" }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="relative"
                >
                  <div className="flex items-center gap-4">
                    <span className="bg-brand-gradient inline-flex h-14 w-14 items-center justify-center rounded-2xl shadow-[0_10px_40px_-8px_rgba(139,92,246,0.8)]">
                      <current.icon className="h-7 w-7 text-white" />
                    </span>
                    <span className="font-mono text-xs uppercase tracking-[0.22em] text-cyan-neon">
                      Step {active + 1} / {steps.length}
                    </span>
                  </div>

                  <h3 className="mt-6 font-display text-3xl font-semibold text-white sm:text-4xl">
                    {current.title}
                  </h3>
                  <p className="mt-4 max-w-xl text-lg leading-relaxed text-white/60">{current.summary}</p>

                  <ul className="mt-8 grid gap-3 sm:grid-cols-1">
                    {current.deliverables.map((d, i) => (
                      <motion.li
                        key={d}
                        initial={{ opacity: 0, x: -12 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.15 + i * 0.08 }}
                        className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-white/85"
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-cyan-neon to-magenta-neon shadow-[0_0_10px_rgba(34,211,238,0.9)]" />
                        {d}
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              </AnimatePresence>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
