export const CONTACT_EMAIL = "scalepulse.aisystem@gmail.com";

/** TODO: replace with the real company profile URLs before launch. */
export const SOCIALS = [
  { label: "LinkedIn", href: "https://www.linkedin.com/" },
  { label: "X / Twitter", href: "https://x.com/" },
  { label: "GitHub", href: "https://github.com/" },
] as const;

/** Fired by the package cards so the contact form can pre-select a service. */
export const SERVICE_EVENT = "scalepulse:select-service";

export const SERVICE_OPTIONS = [
  "Web Design & High-Performance Development",
  "AI & Workflow Automation",
  "Autonomous AI Agents",
  "Starter Launchpad",
  "Growth & Automation Scale Package",
  "Enterprise Transformation",
  "Monthly AI / Technical Retainer",
  "Not sure yet — help me decide",
] as const;
