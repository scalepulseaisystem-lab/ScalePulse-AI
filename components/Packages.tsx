"use client";

import { ArrowRight, Check, Crown, Rocket, Repeat, Building2 } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { SERVICE_EVENT } from "@/lib/constants";
import Reveal from "./Reveal";
import TiltCard from "./TiltCard";

type Pkg = {
  name: string;
  tag: string;
  icon: LucideIcon;
  features: string[];
  highlight?: boolean;
  /** value pre-selected in the contact form dropdown */
  serviceValue: string;
};

const packages: Pkg[] = [
  {
    name: "Starter Launchpad",
    tag: "For founders launching with confidence",
    icon: Rocket,
    serviceValue: "Starter Launchpad",
    features: [
      "High-converting landing page",
      "Responsive, brand-aligned design",
      "Lead capture with instant notifications",
      "Analytics & SEO foundations",
      "Guided handover",
    ],
  },
  {
    name: "Growth & Automation Scale Package",
    tag: "Most selected",
    icon: Crown,
    highlight: true,
    serviceValue: "Growth & Automation Scale Package",
    features: [
      "Custom multi-page business website",
      "CRM & lead-nurturing pipeline",
      "Multi-app data synchronization",
      "AI qualification & chat assistant",
      "Conversion & performance optimization",
    ],
  },
  {
    name: "Enterprise Transformation",
    tag: "For organizations re-platforming operations",
    icon: Building2,
    serviceValue: "Enterprise Transformation",
    features: [
      "Full-stack web application",
      "Autonomous AI agents across teams",
      "Custom GPT & document intelligence",
      "Security-reviewed architecture",
      "Dedicated engineering squad",
    ],
  },
  {
    name: "Monthly AI / Technical Retainers",
    tag: "Continuous improvement, on call",
    icon: Repeat,
    serviceValue: "Monthly AI / Technical Retainer",
    features: [
      "Ongoing feature & workflow iteration",
      "Monitoring and reliability care",
      "New automations and experiments",
      "Priority technical support",
      "Regular performance reviews",
    ],
  },
];

function select(value: string) {
  window.dispatchEvent(new CustomEvent(SERVICE_EVENT, { detail: value }));
}

export default function Packages() {
  return (
    <section id="solutions" className="relative py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-x-0 top-1/3 -z-10 mx-auto h-[500px] max-w-4xl rounded-full bg-violet-neon/10 blur-[160px]" />
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="eyebrow">// Packaged Solutions</p>
          <h2 className="section-title mt-4">
            Engagement models built to <span className="text-gradient">scale with you.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-white/55">
            Start focused or go all-in. Every solution is scoped to your goals through a blueprint
            conversation, so you only invest in what moves the needle.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-6 md:grid-cols-2 xl:grid-cols-4 xl:items-stretch">
          {packages.map((p, i) => (
            <Reveal key={p.name} delay={i * 0.1} className="h-full">
              <TiltCard
                max={p.highlight ? 6 : 8}
                className={`rounded-3xl ${
                  p.highlight ? "glow-border bg-[#0d0d14]/90" : "glass"
                }`}
              >
                <div
                  className={`relative flex h-full flex-col rounded-3xl p-7 ${
                    p.highlight ? "bg-gradient-to-b from-violet-neon/[0.12] to-transparent xl:py-10" : ""
                  }`}
                >
                  {p.highlight && (
                    <span className="bg-brand-gradient absolute -top-3 left-1/2 -translate-x-1/2 rounded-full px-4 py-1 font-mono text-[10px] font-medium uppercase tracking-[0.2em] text-white shadow-[0_0_24px_rgba(139,92,246,0.7)]">
                      Most Selected
                    </span>
                  )}

                  <div
                    className={`inline-flex h-12 w-12 items-center justify-center rounded-xl ${
                      p.highlight ? "bg-brand-gradient shadow-[0_8px_30px_-6px_rgba(139,92,246,0.8)]" : "bg-white/[0.07]"
                    }`}
                  >
                    <p.icon className={`h-6 w-6 ${p.highlight ? "text-white" : "text-cyan-neon"}`} />
                  </div>

                  <h3 className="mt-6 font-display text-xl font-semibold leading-snug text-white">{p.name}</h3>
                  <p className="mt-1.5 text-sm text-white/45">{p.tag}</p>

                  <ul className="mt-7 flex-1 space-y-3.5">
                    {p.features.map((f) => (
                      <li key={f} className="flex items-start gap-3 text-sm text-white/75">
                        <Check
                          className={`mt-0.5 h-4 w-4 shrink-0 ${p.highlight ? "text-magenta-neon" : "text-electric"}`}
                          strokeWidth={3}
                        />
                        {f}
                      </li>
                    ))}
                  </ul>

                  <a
                    href="#contact"
                    onClick={() => select(p.serviceValue)}
                    className={`group/btn mt-9 inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3.5 text-sm font-medium transition-all duration-300 ${
                      p.highlight
                        ? "bg-brand-gradient text-white shadow-[0_0_36px_-6px_rgba(139,92,246,0.9)] hover:shadow-[0_0_50px_-4px_rgba(217,70,239,0.9)]"
                        : "border border-white/15 bg-white/[0.03] text-white hover:border-electric/60 hover:bg-electric/10"
                    }`}
                  >
                    Request Blueprint
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                  </a>
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
