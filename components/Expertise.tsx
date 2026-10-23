"use client";

import { BrainCircuit, Gauge, Layers3, ShieldCheck } from "lucide-react";
import Reveal from "./Reveal";

const pillars = [
  {
    icon: Layers3,
    title: "Full-Stack Engineering",
    body: "Typed, component-driven builds on modern React and Next.js architecture.",
  },
  {
    icon: BrainCircuit,
    title: "Applied AI Systems",
    body: "LLM pipelines, retrieval and agents wired into the tools your team already uses.",
  },
  {
    icon: Gauge,
    title: "Performance by Default",
    body: "Core Web Vitals, accessibility and conversion design treated as first-class requirements.",
  },
  {
    icon: ShieldCheck,
    title: "Production-Grade Delivery",
    body: "Observability, security review and clean handover so systems keep running without us.",
  },
];

const stack = [
  "Next.js",
  "React",
  "TypeScript",
  "Three.js",
  "Node.js",
  "Python",
  "OpenAI",
  "Anthropic",
  "LangChain",
  "n8n",
  "Make",
  "Zapier",
  "Postgres",
  "Supabase",
  "Stripe",
  "HubSpot",
  "Vercel",
  "Docker",
];

export default function Expertise() {
  const loop = [...stack, ...stack];
  return (
    <section id="expertise" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal className="max-w-2xl">
          <p className="eyebrow">// Expertise</p>
          <h2 className="section-title mt-4">
            Where engineering rigor meets <span className="text-gradient">applied intelligence.</span>
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.08}>
              <div className="glass group relative h-full overflow-hidden rounded-2xl p-6 transition duration-500 hover:-translate-y-1 hover:border-electric/40 hover:bg-white/[0.06]">
                <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-violet-neon/20 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />
                <p.icon className="h-6 w-6 text-cyan-neon transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6" />
                <h3 className="mt-5 font-display text-lg font-semibold text-white">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/55">{p.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* tech marquee */}
      <div
        className="relative mt-20 overflow-hidden border-y border-white/5 py-5"
        style={{
          maskImage: "linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent)",
          WebkitMaskImage: "linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent)",
        }}
        aria-hidden
      >
        <div className="flex w-max animate-marquee gap-12 hover:[animation-play-state:paused]">
          {loop.map((s, i) => (
            <span
              key={`${s}-${i}`}
              className="flex items-center gap-12 font-mono text-sm uppercase tracking-[0.2em] text-white/35"
            >
              {s}
              <span className="h-1 w-1 rounded-full bg-gradient-to-r from-electric to-magenta-neon" />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
