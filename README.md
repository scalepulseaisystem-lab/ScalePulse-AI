# ScalePulse AI Systems — Landing Page

Next.js (App Router) · Tailwind CSS 3 · Framer Motion · React Three Fiber · Lucide · EmailJS

## Run it

```bash
npm install next@15 react@19 react-dom@19 three @react-three/fiber@9 framer-motion lucide-react @emailjs/browser
npm install -D typescript @types/node @types/react @types/react-dom @types/three tailwindcss@3 postcss autoprefixer

cp .env.local.example .env.local   # then fill in the three EmailJS values
npm run dev
```

## EmailJS setup

1. In the EmailJS dashboard, add an **Email Service** (e.g. Gmail) and copy its **Service ID**.
2. Create an **Email Template** and copy its **Template ID**.
3. Copy your **Public Key** from *Account → General*.
4. Put all three in `.env.local`:

```
NEXT_PUBLIC_EMAILJS_SERVICE_ID=...
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=...
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=...
```

### Template configuration

Notifications are routed to **scalepulse.aisystem@gmail.com** by the template's
**To Email** field (set it in the EmailJS template settings; the destination is not set in code).

Set **Reply To** to `{{reply_to}}`, then use these variables in the subject/body.
They match the keys sent by `components/ContactForm.tsx`:

| Variable            | Source                    |
| ------------------- | ------------------------- |
| `{{from_name}}`     | Full Name                 |
| `{{from_email}}`    | Email Address             |
| `{{company_name}}`  | Company Name              |
| `{{selected_service}}` | Selected Service       |
| `{{project_notes}}` | Project Details           |
| `{{reply_to}}`      | Email Address (reply-to)  |

Suggested subject: `New Blueprint Request — {{from_name}} ({{company_name}})`

## Form behaviour

- **Loading:** button disabled, spinner + "Transmitting Blueprint Request..."
- **Success:** form is replaced by the "Blueprint Request Dispatched!" card with a "Submit Another Inquiry" reset.
- **Error:** inline banner "Transmission failed. Please email us directly at scalepulse.aisystem@gmail.com". Also shown if the env vars are missing (details logged to the console).
- **Spam:** hidden honeypot field; bot submissions are silently dropped.
- The package cards' **Request Blueprint** buttons pre-select the matching service in the dropdown.

## Before launch

- Replace the placeholder social URLs in `lib/constants.ts`.
- Review `app/privacy/page.tsx` (starter copy, not legal advice).
- Set the real production domain in `metadataBase` in `app/layout.tsx`.

## Structure

```
app/            layout, page, globals.css, privacy page
components/     Navbar, Hero, HeroScene (WebGL), Expertise, Services, Packages,
                Roadmap, ContactForm, Footer, MagneticButton, TiltCard, Reveal, CursorGlow
lib/constants.ts   contact email, service options, social links
```
