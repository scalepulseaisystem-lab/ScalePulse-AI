import { ArrowUpRight, Mail } from "lucide-react";
import { CONTACT_EMAIL, SOCIALS } from "@/lib/constants";

const nav = [
  { label: "Expertise", href: "/#expertise" },
  { label: "Services", href: "/#services" },
  { label: "Solutions", href: "/#solutions" },
  { label: "Onboarding", href: "/#onboarding" },
  { label: "Contact", href: "/#contact" },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-white/10">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet-neon/60 to-transparent" />
      <div className="mx-auto grid max-w-6xl gap-12 px-5 py-16 sm:px-8 md:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
        <div>
          <a href="/" className="flex items-center gap-3">
            <span
              className="h-3.5 w-3.5 rounded-full"
              style={{
                background:
                  "radial-gradient(circle at 32% 28%, #ffffff 0%, #7dd3fc 18%, #2f7bff 52%, #6d28d9 100%)",
                boxShadow: "0 0 14px 2px rgba(47,123,255,0.8), 0 0 28px 6px rgba(139,92,246,0.45)",
              }}
              aria-hidden
            />
            <span className="font-display text-lg font-semibold text-white">
              ScalePulse <span className="text-gradient">AI Systems</span>
            </span>
          </a>
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/50">
            Engineering Intelligence. Scaling Realities. High-performance web and autonomous AI systems
            for ambitious businesses.
          </p>
        </div>

        <div>
          <h4 className="font-mono text-xs uppercase tracking-[0.2em] text-white/40">Navigate</h4>
          <ul className="mt-5 space-y-3">
            {nav.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="text-sm text-white/65 transition hover:text-white">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-mono text-xs uppercase tracking-[0.2em] text-white/40">Legal &amp; Social</h4>
          <ul className="mt-5 space-y-3">
            <li>
              <a href="/privacy" className="text-sm text-white/65 transition hover:text-white">
                Privacy Policy
              </a>
            </li>
            {SOCIALS.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-1 text-sm text-white/65 transition hover:text-white"
                >
                  {s.label}
                  <ArrowUpRight className="h-3.5 w-3.5 opacity-0 transition group-hover:opacity-100" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-mono text-xs uppercase tracking-[0.2em] text-white/40">Contact</h4>
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="group mt-5 inline-flex items-start gap-3 text-sm text-white/75 transition hover:text-cyan-neon"
          >
            <Mail className="mt-0.5 h-4 w-4 shrink-0" />
            <span className="break-all">{CONTACT_EMAIL}</span>
          </a>
        </div>
      </div>

      <div className="border-t border-white/5">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-5 py-6 text-xs text-white/35 sm:flex-row sm:px-8">
          <p>© {new Date().getFullYear()} ScalePulse AI Systems. All rights reserved.</p>
          <p className="font-mono uppercase tracking-[0.2em]">Built to scale. Tuned to pulse.</p>
        </div>
      </div>
    </footer>
  );
}
