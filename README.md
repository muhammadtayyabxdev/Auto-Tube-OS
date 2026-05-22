# AutoTube OS

> AI-powered YouTube automation SaaS platform — built with Next.js 16, TypeScript, and a premium dark-mode UI.

![AutoTube OS](https://img.shields.io/badge/Next.js-16-black?logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript&logoColor=white)
![Lucide React](https://img.shields.io/badge/Lucide-React-orange?logo=react&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green)

---

## 🚀 What is AutoTube OS?

**AutoTube OS** is a full-stack SaaS platform designed for YouTube content creators who want to automate their entire content production pipeline — from topic research to script generation, shorts repurposing, content scheduling, and performance analytics.

---

## ✨ Key Features

| Feature | Description |
|---|---|
| 🔥 **Topic Finder** | AI-curated trending topic discovery with competitor gap analysis |
| ✍️ **Script Generator** | Multi-section AI script editor with tone, length, and format controls |
| ⚡ **Shorts Repurposer** | Auto-cut long-form videos into viral Shorts clips |
| 📅 **Content Calendar** | Visual drag-and-drop weekly/monthly publication planner |
| 📊 **Analytics Dashboard** | Real-time channel metrics, CPM trends, and growth insights |
| 🤝 **Affiliate Dashboard** | Earnings tracking, referral stats, payout history, and link manager |
| ✉️ **Creator Emails** | 5 ready-to-use branded email templates with live HTML preview |
| ⚙️ **Settings** | Profile, billing, integrations, API keys, and notifications |

---

## 📄 Pages (27 Total)

### Public Pages
`/` · `/about` · `/features` · `/pricing` · `/blog` · `/usecases` · `/comparison` · `/affiliate` · `/mobile` · `/chat-widget`

### Resources & Company
`/help` · `/changelog` · `/press` · `/careers` · `/contact` · `/legal` · `/cookie` · `/status`

### App & Auth
`/auth` · `/password-reset` · `/email-verify` · `/onboarding` · `/thankyou`

### Dashboard
`/dashboard` · `/script-generator` · `/emails` · `/affiliate-dashboard` · `/settings`

---

## 🛠 Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org) (App Router, Turbopack)
- **Language**: [TypeScript 5](https://typescriptlang.org)
- **Styling**: Vanilla CSS Modules with glassmorphic dark-mode design
- **Typography**: [Poppins](https://fonts.google.com/specimen/Poppins) with custom 7–14px precision scale
- **Icons**: [Lucide React](https://lucide.dev) — 1,500+ tree-shakable SVG icons
- **Linting**: ESLint with TypeScript support
- **Routing**: Next.js App Router with file-based routing

---

## 🎨 Design System

- **Dark mode** glassmorphic UI with deep navy palette
- **Color accents**: Red (`#ff3d3d`), Green (`#22c55e`), Amber (`#f59e0b`), Blue (`#3b82f6`)
- **Typography scale**: 7px → 9px → 10px → 11px → 12px → 13px → 14px
- **Responsive**: Mobile-first with breakpoints at 480px, 768px, and 1024px

---

## 🔧 Getting Started

```bash
# Clone the repository
git clone https://github.com/muhammadtayyabxdev/Auto-Tube-OS.git
cd Auto-Tube-OS

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Demo Credentials
The authentication system is a **high-fidelity interactive prototype** — any email and password combination will simulate a successful login and redirect to the dashboard.

---

## 📦 Scripts

```bash
npm run dev      # Start development server (port 3000)
npm run build    # Build for production
npm run lint     # Run ESLint checks
npm run start    # Start production server
```

---

## 📁 Project Structure

```
Auto-Tube-OS/
├── src/
│   ├── app/                  # Next.js App Router pages
│   │   ├── dashboard/        # Main app dashboard
│   │   ├── script-generator/ # AI script editor
│   │   ├── auth/             # Sign in / Sign up
│   │   └── ...               # 24 more pages
│   ├── components/
│   │   ├── Navbar.tsx        # Public header with mobile hamburger
│   │   ├── Sidebar.tsx       # App sidebar with mobile slide-in
│   │   └── Footer.tsx        # Multi-column SaaS footer
│   └── styles/               # 32 CSS module stylesheets
├── _html_backup/             # Original HTML design prototypes
├── public/                   # Static assets
└── package.json
```

---

## 🌐 Live Demo

> Coming soon — deployment in progress.

---

## 👨‍💻 Author

**Muhammad Tayyab**
- GitHub: [@muhammadtayyabxdev](https://github.com/muhammadtayyabxdev)

---

## 📄 License

This project is licensed under the **MIT License**.
