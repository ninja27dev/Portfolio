# 🚀 Devesh Das — Developer Portfolio

> **Universal, Modern, Responsive Portfolio Website** for Game Development & Computer Science Engineering. Built with semantic HTML5, modern fluid CSS Grid & Flexbox, React 18 interactive widgets, and Supabase PostgreSQL backend integration.

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![React 18](https://img.shields.io/badge/React_18-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev)
[![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)](https://supabase.com)

---

## 📁 Project Structure

```text
portfolio/
├── 📄 index.html                  # Main website entry point (Universal responsive layout)
├── 📄 README.md                   # Repository overview & setup guide
├── 📄 .gitignore                  # Git exclusions for clean commits
│
├── 📂 assets/                     # Sorted static frontend assets
│   ├── 📂 css/
│   │   └── styles.css             # Design system, glassmorphism & responsive media queries
│   ├── 📂 js/
│   │   ├── script.js              # Theme switcher, navigation drawer, modals, & form handler
│   │   ├── react-app.js           # Interactive React 18 components & simulation widgets
│   │   ├── react.production.min.js      # Local production React 18 runtime
│   │   └── react-dom.production.min.js  # Local production ReactDOM runtime
│   └── 📂 images/
│       └── dev.png                # Developer portrait & branding avatar
│
└── 📂 backend/                    # Supabase backend & database configuration
    ├── supabase-client.js         # Client-side database connector & analytics logger
    ├── schema.sql                 # PostgreSQL tables & Row-Level Security (RLS) setup
    └── README.md                  # Supabase database configuration instructions
```

---

## ✨ Features

- **📱 100% Universal Layout**: Seamlessly adapts to smartphones (iPhone, Android, Foldables from 320px+), tablets, laptops, and ultra-wide desktop monitors.
- **🍔 Mobile Navigation Drawer**: Smooth animated glassmorphism hamburger drawer with touch-optimized targets (44px+).
- **🌓 Dynamic Theme Switcher**: Instant Dark Mode and Light Mode switching with persistent state saved in `localStorage`.
- **⚛️ Interactive React 18 Lab**: In-browser simulation widgets, telemetry gauges, and game mechanic prototypes.
- **📬 Live Contact Form**: Submits messages directly into Supabase PostgreSQL database (`contact_messages`) with feedback toast alerts.
- **📊 Real-time Visitor Analytics**: Background visitor telemetry (`visitor_analytics`) tracking screen resolutions and visit paths.
- **⚡ Zero External Build Step**: Pure native web standards — upload to any static host with zero build commands (`npm run build` not required).

---

## 🌐 Deploy to GitHub Pages (2 Minutes)

1. Push this repository to your GitHub account:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Universal responsive portfolio"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPOSITORY_NAME.git
   git push -u origin main
   ```
2. In your GitHub repository:
   * Go to **Settings** → **Pages** (on the left menu).
   * Under **Build and deployment** → **Source**, select **Deploy from a branch**.
   * Under **Branch**, select `main` and `/ (root)`.
   * Click **Save**.
3. Your portfolio will be live at:
   `https://YOUR_USERNAME.github.io/YOUR_REPOSITORY_NAME/`

---

## 🗄️ Supabase Database Setup

To view incoming contact messages:
1. Log into your [Supabase Dashboard](https://supabase.com).
2. Go to **Table Editor** → **`contact_messages`** to see incoming sender names, emails, timestamps, and messages.
3. For custom database setup, view the instructions in [`backend/README.md`](backend/README.md).

---

## 📄 License
MIT License © 2026 Devesh Das
