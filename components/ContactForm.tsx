"use client";

import emailjs from "@emailjs/browser";
import { AnimatePresence, motion } from "framer-motion";
import { AlertTriangle, ArrowRight, CheckCircle2, Loader2, Mail, RotateCcw } from "lucide-react";
import { useEffect, useState } from "react";
import { CONTACT_EMAIL, SERVICE_EVENT, SERVICE_OPTIONS } from "@/lib/constants";
import Reveal from "./Reveal";

type Status = "idle" | "loading" | "success" | "error";

type FormState = {
  fullName: string;
  email: string;
  companyName: string;
  selectedService: string;
  projectNotes: string;
};

const initialForm: FormState = {
  fullName: "",
  email: "",
  companyName: "",
  selectedService: "",
  projectNotes: "",
};

export default function ContactForm() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [status, setStatus] = useState<Status>("idle");
  // honeypot: real visitors never see or fill this field
  const [trap, setTrap] = useState("");

  // let the package cards pre-select a service
  useEffect(() => {
    const onSelect = (e: Event) => {
      const value = (e as CustomEvent<string>).detail;
      setForm((f) => ({ ...f, selectedService: value }));
      setStatus((s) => (s === "error" ? "idle" : s));
    };
    window.addEventListener(SERVICE_EVENT, onSelect);
    return () => window.removeEventListener(SERVICE_EVENT, onSelect);
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    if (status === "error") setStatus("idle");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === "loading") return;

    // bots fill the hidden field; pretend success and send nothing
    if (trap) {
      setStatus("success");
      return;
    }

    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

    setStatus("loading");

    try {
      if (!serviceId || !templateId || !publicKey) {
        throw new Error(
          "EmailJS is not configured. Set NEXT_PUBLIC_EMAILJS_SERVICE_ID, NEXT_PUBLIC_EMAILJS_TEMPLATE_ID and NEXT_PUBLIC_EMAILJS_PUBLIC_KEY.",
        );
      }

      // keys must match the variables used in the EmailJS template
      const templateParams = {
        from_name: form.fullName.trim(),
        from_email: form.email.trim(),
        company_name: form.companyName.trim(),
        selected_service: form.selectedService,
        project_notes: form.projectNotes.trim(),
        reply_to: form.email.trim(),
      };

      await emailjs.send(serviceId, templateId, templateParams, { publicKey });
      setStatus("success");
    } catch (err) {
      console.error("[ScalePulse] EmailJS transmission failed:", err);
      setStatus("error");
    }
  };

  const reset = () => {
    setForm(initialForm);
    setTrap("");
    setStatus("idle");
  };

  const loading = status === "loading";

  return (
    <section id="contact" className="relative py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 mx-auto h-[500px] max-w-3xl rounded-full bg-electric/15 blur-[160px]" />
      <div className="mx-auto grid max-w-6xl gap-14 px-5 sm:px-8 lg:grid-cols-[1fr_1.15fr] lg:gap-20">
        {/* pitch */}
        <Reveal className="lg:pt-6">
          <p className="eyebrow">// Initialize Project</p>
          <h2 className="section-title mt-4">
            Let&apos;s architect your <span className="text-gradient">next system.</span>
          </h2>
          <p className="mt-6 max-w-lg text-lg leading-relaxed text-white/55">
            Tell us where you are and where you want to scale. Our engineers review every submission
            personally and respond with clear next steps.
          </p>

          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="glass group mt-10 inline-flex items-center gap-4 rounded-2xl px-5 py-4 transition hover:border-electric/50"
          >
            <span className="bg-brand-gradient inline-flex h-11 w-11 items-center justify-center rounded-xl">
              <Mail className="h-5 w-5 text-white" />
            </span>
            <span>
              <span className="block font-mono text-[11px] uppercase tracking-[0.2em] text-white/40">
                Direct line
              </span>
              <span className="text-white transition group-hover:text-cyan-neon">{CONTACT_EMAIL}</span>
            </span>
          </a>
        </Reveal>

        {/* form / confirmation */}
        <Reveal delay={0.1}>
          <div className="glass-strong relative overflow-hidden rounded-3xl p-6 shadow-[0_30px_100px_-30px_rgba(79,70,229,0.55)] sm:p-9">
            <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-magenta-neon/20 blur-[90px]" />

            <AnimatePresence mode="wait" initial={false}>
              {status === "success" ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.94, y: 12 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="relative flex min-h-[460px] flex-col items-center justify-center text-center"
                  role="status"
                  aria-live="polite"
                >
                  <motion.div
                    initial={{ scale: 0, rotate: -40 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 220, damping: 14, delay: 0.15 }}
                    className="relative"
                  >
                    <span className="absolute inset-0 animate-ping2 rounded-full bg-cyan-neon/40" />
                    <span className="bg-brand-gradient relative inline-flex h-20 w-20 items-center justify-center rounded-full shadow-[0_0_60px_rgba(139,92,246,0.8)]">
                      <CheckCircle2 className="h-10 w-10 text-white" />
                    </span>
                  </motion.div>

                  <h3 className="mt-8 font-display text-3xl font-semibold text-white sm:text-4xl">
                    Blueprint Request Dispatched!
                  </h3>
                  <p className="mt-4 max-w-md text-[17px] leading-relaxed text-white/60">
                    Our engineering team will review your specifications and reach out to you at{" "}
                    {CONTACT_EMAIL} within 24 hours.
                  </p>

                  <button
                    type="button"
                    onClick={reset}
                    className="group mt-9 inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/[0.04] px-6 py-3 text-sm font-medium text-white transition hover:border-electric/60 hover:bg-electric/10"
                  >
                    <RotateCcw className="h-4 w-4 transition-transform duration-500 group-hover:-rotate-180" />
                    Submit Another Inquiry
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="relative space-y-5"
                  noValidate={false}
                  aria-busy={loading}
                >
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="fullName" className="mb-2 block text-sm text-white/70">
                        Full Name
                      </label>
                      <input
                        id="fullName"
                        name="fullName"
                        type="text"
                        required
                        autoComplete="name"
                        placeholder="Ada Lovelace"
                        value={form.fullName}
                        onChange={handleChange}
                        disabled={loading}
                        className="field"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="mb-2 block text-sm text-white/70">
                        Email Address
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        autoComplete="email"
                        placeholder="ada@company.com"
                        value={form.email}
                        onChange={handleChange}
                        disabled={loading}
                        className="field"
                      />
                    </div>
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="companyName" className="mb-2 block text-sm text-white/70">
                        Company Name
                      </label>
                      <input
                        id="companyName"
                        name="companyName"
                        type="text"
                        autoComplete="organization"
                        placeholder="Analytical Engines Ltd."
                        value={form.companyName}
                        onChange={handleChange}
                        disabled={loading}
                        className="field"
                      />
                    </div>
                    <div>
                      <label htmlFor="selectedService" className="mb-2 block text-sm text-white/70">
                        Selected Service
                      </label>
                      <select
                        id="selectedService"
                        name="selectedService"
                        required
                        value={form.selectedService}
                        onChange={handleChange}
                        disabled={loading}
                        className="field select-field appearance-none pr-10"
                      >
                        <option value="" disabled className="bg-[#0f0f14] text-white/50">
                          Select a service…
                        </option>
                        {SERVICE_OPTIONS.map((opt) => (
                          <option key={opt} value={opt} className="bg-[#0f0f14] text-white">
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="projectNotes" className="mb-2 block text-sm text-white/70">
                      Project Details
                    </label>
                    <textarea
                      id="projectNotes"
                      name="projectNotes"
                      required
                      rows={5}
                      placeholder="Describe your goals, current tools, and what success looks like…"
                      value={form.projectNotes}
                      onChange={handleChange}
                      disabled={loading}
                      className="field resize-none"
                    />
                  </div>

                  {/* honeypot */}
                  <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden>
                    <label htmlFor="website">Website</label>
                    <input
                      id="website"
                      name="website"
                      type="text"
                      tabIndex={-1}
                      autoComplete="off"
                      value={trap}
                      onChange={(e) => setTrap(e.target.value)}
                    />
                  </div>

                  <AnimatePresence>
                    {status === "error" && (
                      <motion.div
                        initial={{ opacity: 0, height: 0, y: -6 }}
                        animate={{ opacity: 1, height: "auto", y: 0 }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden"
                        role="alert"
                      >
                        <div className="flex items-start gap-3 rounded-xl border border-red-400/30 bg-red-500/10 px-4 py-3.5 text-sm text-red-200">
                          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-red-300" />
                          <p>
                            Transmission failed. Please email us directly at{" "}
                            <a
                              href={`mailto:${CONTACT_EMAIL}`}
                              className="font-medium underline underline-offset-2 hover:text-white"
                            >
                              {CONTACT_EMAIL}
                            </a>
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <button
                    type="submit"
                    disabled={loading}
                    className="bg-brand-gradient group relative flex w-full items-center justify-center gap-2.5 overflow-hidden rounded-xl px-6 py-4 text-base font-medium text-white shadow-[0_0_44px_-8px_rgba(139,92,246,0.85)] transition-all duration-300 enabled:hover:shadow-[0_0_60px_-4px_rgba(217,70,239,0.9)] disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="h-5 w-5 animate-spin" />
                        <span>Transmitting Blueprint Request...</span>
                      </>
                    ) : (
                      <>
                        <span className="relative z-10">Submit Blueprint Request</span>
                        <ArrowRight className="relative z-10 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                        <span className="absolute inset-0 -translate-x-full bg-white/20 transition-transform duration-500 group-hover:translate-x-0" />
                      </>
                    )}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
