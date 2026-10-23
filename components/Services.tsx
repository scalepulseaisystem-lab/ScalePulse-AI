"use client";

import { Bot, Check, Code2, Workflow } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Reveal from "./Reveal";
import TiltCard from "./TiltCard";

type Service = {
  index: string;
  icon: LucideIcon;
  title: string;
  blurb: string;
  items: string[];
  accent: string; // tailwind gradient stops
  glow: string;
};

const services: Service[] = [
  {
    index: "01",
    icon: Code2,
    title: "Web Design & High-Performance Development",
    blurb: "Interfaces engineered to load instantly, feel premium and convert visitors into pipeline.",
    items: ["High-Converting Landing Pages", "Custom Business Websites", "Full-Stack Web Applications"],
    accent: "from-cyan-neon to-electric",
    glow: "rgba(34,211,238,0.35)",
  },
  {
    index: "02",
    icon: Workflow,
    title: "AI & Workflow Automation",
    blurb: "Connect your stack, remove manual hand-offs and let intelligent workflows run the busywork.",
    items: ["Lead Nurturing & CRM Pipelines", "Multi-App Data Sync", "Custom GPT & Document Intelligence"],
    accent: "from-electric to-violet-neon",
    glow: "rgba(139,92,246,0.4)",
  },
  {
    index: "03",
    icon: Bot,
    title: "Autonomous AI Agents",
    blurb: "Always-on digital teammates that handle conversations and operations with real context.",
    items: ["24/7 AI Customer Support & Sales Agents", "Internal Operational AI Employees"],
    accent: "from-violet-neon to-magenta-neon",
    glow: "rgba(217,70,239,0.4)",
  },
];

export default function Services() {
  return (
    <section id="services" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal className="max-w-3xl">
          <p className="eyebrow">// Core Services</p>
          <h2 className="section-title mt-4">
            Three disciplines. <span className="text-gradient">One compounding system.</span>
          </h2>
          <p className="mt-6 max-w-2xl text-lg text-white/55">
            Every engagement is built to work on its own and to amplify the others, so your website,
            automations and AI agents operate as a single growth engine.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-6 lg:grid-cols-3">
          {services.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.12} className="h-full">
              <TiltCard className="glass h-full rounded-3xl">
                <div className="relative flex h-full flex-col p-7 sm:p-8" style={{ transform: "translateZ(30px)" }}>
                  <div className="flex items-start justify-between">
                    <div
                      className={`relative inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${s.accent}`}
                      style={{ boxShadow: `0 10px 40px -8px ${s.glow}`, transform: "translateZ(40px)" }}
                    >
                      <s.icon className="h-7 w-7 text-white" />
                    </div>
                    <span className="font-mono text-sm text-white/25">{s.index}</span>
                  </div>

                  <h3 className="mt-8 font-display text-2xl font-semibold leading-snug text-white">
                    {s.title}
                  </h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-white/55">{s.blurb}</p>

                  <ul className="mt-8 space-y-3.5 border-t border-white/10 pt-7">
                    {s.items.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-[15px] text-white/80">
                        <span
                          className={`mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${s.accent}`}
                        >
                          <Check className="h-3 w-3 text-white" strokeWidth={3} />
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
