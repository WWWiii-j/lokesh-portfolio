# Lokesh Venkat Sai (Loki) — Portfolio Website

A personal student portfolio built with **React**, **TypeScript**, **Vite**, **Tailwind CSS**, and **Framer Motion**.

## 🎨 Design

Adapted from a Mainframe-style editorial / immersive concept — full-screen hero, mouse-scrubbed animated background, bold typography, spaced navigation, pill CTAs, typewriter effect, and premium Framer Motion transitions — applied to **Loki's own real content** (no copied branding or fabricated information).

## 🛠️ Tech Stack

- **React 19**
- **TypeScript**
- **Vite** (build tool)
- **Tailwind CSS** (styling)
- **Framer Motion** (UI motion & scroll animations)
- **EmailJS** (contact form — pending configuration)

## ✨ Features

- Immersive full-screen hero with typewriter subtitle
- Mouse-controlled animated background (pointer + scroll reactive, Framer Motion + canvas)
- Dark / light theme toggle (respects `prefers-color-scheme`, persisted to `localStorage`)
- Minimal fixed navbar + animated full-screen mobile menu
- Editorially-paced sections with staggered reveal animations
- Interactive project cards that expand into an animated detail modal
- Projects populated with **real GitHub repositories** from `WWWiii-j`
- Fully responsive, respects `prefers-reduced-motion`
- Verbatim preservation of all existing personal content (name, bio, skills, education, contact, socials)

## 🚀 Getting Started

```bash
npm install
npm run dev      # start dev server
npm run build    # production build
npm run preview  # preview production build
```

## 📁 Project Structure

```text
TESTAGY/
├── index.html                 # Vite entry (loads EmailJS SDK, fonts)
├── vite.config.ts
├── tailwind.config.js         # Custom Loki theme (colors, fonts, motion)
├── public/
│   └── profile.JPG            # Hero profile photo
└── src/
    ├── main.tsx               # Root render
    ├── App.tsx                # Composes all sections
    ├── index.css              # Tailwind directives + base styles
    ├── emailjs.d.ts           # EmailJS global type declaration
    ├── data/
    │   ├── profile.ts         # All personal content (source of truth)
    │   └── projects.ts        # Real GitHub project data
    ├── hooks/
    │   ├── useTheme.ts        # Dark/light theme
    │   └── useTypewriter.tsx  # Typewriter effect
    └── components/
        ├── Navbar.tsx / MobileMenu
        ├── Hero.tsx
        ├── BackgroundScrub.tsx
        ├── About.tsx / Skills.tsx / Hackathon.tsx
        ├── Projects.tsx (with detail modal)
        ├── Education.tsx / Contact.tsx / Footer.tsx
        └── SectionTitle.tsx
```

## 📧 Contact Form (EmailJS)

The contact form is wired for **EmailJS** but is **disabled until configured**. To enable:

1. Create an account at [emailjs.com](https://www.emailjs.com) (free tier).
2. Connect your email, create a template with variables `{{from_name}}`, `{{from_email}}`, `{{subject}}`, `{{message}}`.
3. In `src/components/Contact.tsx`, replace:
   ```ts
   const serviceId = 'YOUR_SERVICE_ID'
   const templateId = 'YOUR_TEMPLATE_ID'
   const publicKey = 'YOUR_PUBLIC_KEY'
   ```

Only the **public key** is used in the frontend — no private credentials are exposed.

## ⚠️ Content Integrity

All personal information (name, bio, skills, education, hackathon, contact, social links) is drawn **verbatim** from the original portfolio. No invented achievements, metrics, projects, or links. Projects shown are the real public repositories of `github.com/WWWiii-j`.

## 📄 License

MIT.
