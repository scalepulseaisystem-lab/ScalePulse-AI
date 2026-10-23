import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import { CONTACT_EMAIL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Privacy Policy | ScalePulse AI Systems",
};

const sections = [
  {
    title: "Information we collect",
    body: "When you submit the project intake form we collect your full name, email address, company name, the service you are interested in, and the project details you choose to share. We do not collect payment information through this site.",
  },
  {
    title: "How we use it",
    body: "We use this information only to review your request, respond to you, and prepare a relevant proposal. We do not sell your personal information.",
  },
  {
    title: "Service providers",
    body: "Form submissions are delivered to our team by email through EmailJS, which processes the data on our behalf. Their handling of data is governed by their own privacy terms.",
  },
  {
    title: "Retention",
    body: "We keep inquiry emails for as long as needed to respond and to maintain a record of our business communications, then delete them on a regular basis.",
  },
  {
    title: "Your choices",
    body: `You can ask us to access, correct or delete the information you sent by emailing ${CONTACT_EMAIL}.`,
  },
];

export default function PrivacyPage() {
  return (
    <main className="mx-auto max-w-3xl px-5 py-24 sm:px-8 sm:py-32">
      <a
        href="/"
        className="group inline-flex items-center gap-2 text-sm text-white/60 transition hover:text-white"
      >
        <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
        Back to ScalePulse AI
      </a>

      <p className="eyebrow mt-10">// Legal</p>
      <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight text-white sm:text-5xl">
        Privacy <span className="text-gradient">Policy</span>
      </h1>
      <p className="mt-4 text-sm text-white/40">Last updated: October 2026</p>

      <div className="mt-12 space-y-10">
        {sections.map((s) => (
          <section key={s.title}>
            <h2 className="font-display text-xl font-semibold text-white">{s.title}</h2>
            <p className="mt-3 leading-relaxed text-white/60">{s.body}</p>
          </section>
        ))}
      </div>
    </main>
  );
}
