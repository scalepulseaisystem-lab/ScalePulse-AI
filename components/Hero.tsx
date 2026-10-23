"use client";

import { motion } from "framer-motion";
import { ArrowRight, ChevronDown, Sparkles } from "lucide-react";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import MagneticButton from "./MagneticButton";

// WebGL only runs in the browser
const HeroScene = dynamic(() => import("./HeroScene"), { ssr: false });

const ease = [0.22, 1, 0.36, 1] as const;

function Words({ text, delay = 0, className = "" }: { text: string; delay?: number; className?: string }) {
  return (
    <>
      {text.split(" ").map((w, i) => (
        <span key={i} className="inline-block overflow-hidden pb-[0.12em] align-bottom">
          <motion.span
            className={`inline-block ${className}`}
            initial={{ y: "110%", rotateX: -50 }}
            animate={{ y: 0, rotateX: 0 }}
            transition={{ duration: 0.9, delay: delay + i * 0.08, ease }}
          >
            {w}&nbsp;
          </motion.span>
        </span>
      ))}
    </>
  );
}

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(true);

  // pause the render loop once the hero scrolls out of view
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
      threshold: 0,
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section
      id="top"
      ref={sectionRef}
      className="relative flex min-h-screen items-center overflow-hidden pb-24 pt-32"
    >
      {/* ambient light */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute -left-40 top-10 h-[520px] w-[520px] rounded-full bg-electric/20 blur-[140px]" />
        <div className="absolute -right-32 top-1/3 h-[560px] w-[560px] rounded-full bg-violet-neon/20 blur-[150px]" />
        <div className="absolute bottom-0 left-1/3 h-[380px] w-[380px] rounded-full bg-magenta-neon/10 blur-[130px]" />
      </div>

      {/* WebGL canvas */}
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.6, delay: 0.2 }}
        aria-hidden
      >
        <HeroScene active={inView} />
      </motion.div>

      {/* readability veil: darkens the left where copy sits */}
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#0a0a0c]/85 via-[#0a0a0c]/35 to-transparent lg:from-[#0a0a0c]/75"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#0a0a0c] to-transparent"
        aria-hidden
      />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-5 sm:px-8">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease }}
            className="glass inline-flex items-center gap-2 rounded-full px-4 py-2"
          >
            <Sparkles className="h-3.5 w-3.5 text-cyan-neon" />
            <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-white/80 sm:text-xs">
              Next-Gen AI Automation &amp; High-Performance Architecture
            </span>
          </motion.div>

          <h1
            className="mt-8 font-display text-[2.9rem] font-bold leading-[0.98] tracking-tight text-white sm:text-6xl md:text-7xl lg:text-[5.4rem]"
            style={{ perspective: 800 }}
          >
            <Words text="Engineering Intelligence." delay={0.25} />
            <br />
            <Words text="Scaling Realities." delay={0.65} className="text-gradient" />
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1, ease }}
            className="mt-8 max-w-2xl text-lg leading-relaxed text-white/65 sm:text-xl"
          >
            We architect high-converting digital experiences and autonomous AI systems that eliminate
            operational overhead and accelerate exponential growth.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.3, ease }}
            className="mt-10 flex flex-col gap-4 sm:flex-row"
          >
            <MagneticButton
              href="#contact"
              className="bg-brand-gradient group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-2xl px-8 py-4 text-base font-medium text-white shadow-[0_0_50px_-8px_rgba(139,92,246,0.85)]"
            >
              <span className="relative z-10">Book Strategy Session</span>
              <ArrowRight className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              <span className="absolute inset-0 -translate-x-full bg-white/20 transition-transform duration-500 group-hover:translate-x-0" />
            </MagneticButton>

            <MagneticButton
              href="#services"
              strength={0.25}
              className="glass group inline-flex items-center justify-center gap-2 rounded-2xl px-8 py-4 text-base font-medium text-white transition-colors hover:border-white/25 hover:bg-white/[0.08]"
            >
              Explore Capabilities
              <ChevronDown className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5" />
            </MagneticButton>
          </motion.div>
        </div>
      </div>

      <motion.a
        href="#expertise"
        aria-label="Scroll to expertise"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 text-white/40 transition hover:text-white/80 sm:flex"
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.3em]">Scroll</span>
        <span className="relative h-10 w-px overflow-hidden bg-white/15">
          <motion.span
            className="absolute inset-x-0 top-0 h-4 bg-gradient-to-b from-transparent via-cyan-neon to-transparent"
            animate={{ y: [-16, 40] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          />
        </span>
      </motion.a>
    </section>
  );
}
