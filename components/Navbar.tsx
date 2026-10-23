"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { useEffect, useState } from "react";
import MagneticButton from "./MagneticButton";

const links = [
  { label: "Expertise", href: "#expertise" },
  { label: "Services", href: "#services" },
  { label: "Solutions", href: "#solutions" },
  { label: "Onboarding", href: "#onboarding" },
  { label: "Contact", href: "#contact" },
];

/** Logo mark: a small sphere with a lit core and two expanding pulse rings. */
function PulseDot() {
  return (
    <span className="relative inline-flex h-4 w-4 items-center justify-center" aria-hidden>
      <span className="absolute inset-0 animate-ping2 rounded-full bg-electric/60" />
      <span
        className="absolute inset-0 animate-ping2 rounded-full bg-violet-neon/50"
        style={{ animationDelay: "1.1s" }}
      />
      <span
        className="relative h-3.5 w-3.5 rounded-full"
        style={{
          background:
            "radial-gradient(circle at 32% 28%, #ffffff 0%, #7dd3fc 18%, #2f7bff 52%, #6d28d9 100%)",
          boxShadow: "0 0 14px 2px rgba(47,123,255,0.8), 0 0 28px 6px rgba(139,92,246,0.45)",
        }}
      />
    </span>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // highlight the link whose section is currently in view
  useEffect(() => {
    const ids = links.map((l) => l.href.slice(1));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(`#${e.target.id}`);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4">
      <motion.nav
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className={`flex w-full max-w-6xl items-center justify-between rounded-2xl px-4 py-3 transition-all duration-500 sm:px-6 ${
          scrolled
            ? "border border-white/10 bg-[#0a0a0c]/70 shadow-[0_8px_40px_-12px_rgba(47,123,255,0.35)] backdrop-blur-md"
            : "border border-transparent bg-transparent"
        }`}
        aria-label="Primary"
      >
        <a href="#top" className="flex items-center gap-3">
          <PulseDot />
          <span className="font-display text-lg font-semibold tracking-tight text-white">
            ScalePulse <span className="text-gradient">AI</span>
          </span>
        </a>

        <ul className="hidden items-center gap-1 lg:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className={`group relative rounded-lg px-3.5 py-2 text-sm transition-colors ${
                  active === l.href ? "text-white" : "text-white/60 hover:text-white"
                }`}
              >
                {l.label}
                <span
                  className={`absolute inset-x-3.5 -bottom-0.5 h-px origin-left bg-gradient-to-r from-electric via-violet-neon to-magenta-neon transition-transform duration-300 ${
                    active === l.href ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                  }`}
                />
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <MagneticButton
            href="#contact"
            strength={0.3}
            className="bg-brand-gradient group relative hidden items-center gap-1.5 overflow-hidden rounded-xl px-5 py-2.5 text-sm font-medium text-white shadow-[0_0_30px_-4px_rgba(139,92,246,0.7)] sm:inline-flex"
          >
            <span className="relative z-10">Initialize Project</span>
            <ArrowUpRight className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            <span className="absolute inset-0 -translate-x-full bg-white/20 transition-transform duration-500 group-hover:translate-x-0" />
          </MagneticButton>

          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="glass inline-flex h-10 w-10 items-center justify-center rounded-xl text-white lg:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.98 }}
            transition={{ duration: 0.25 }}
            className="glass-strong absolute left-4 right-4 top-[76px] rounded-2xl p-3 lg:hidden"
          >
            <ul className="flex flex-col">
              {links.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-xl px-4 py-3 text-white/80 transition hover:bg-white/5 hover:text-white"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
              <li className="p-1 pt-2">
                <a
                  href="#contact"
                  onClick={() => setOpen(false)}
                  className="bg-brand-gradient block rounded-xl px-4 py-3 text-center font-medium text-white"
                >
                  Initialize Project
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
