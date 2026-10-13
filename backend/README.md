# 🚀 Supabase Backend & Database Setup Guide

This folder contains the complete backend database configuration for **Devesh Das Portfolio**.
It connects directly from client-side JavaScript via `@supabase/supabase-js`, saving **contact messages** and **visitor analytics** in real-time on Supabase's free PostgreSQL tier.

---

## 📋 Step 1: Create Your Free Supabase Project (2 Minutes)

1. Go to **[https://supabase.com](https://supabase.com)** and sign in with GitHub or Google (100% Free).
2. Click **"New Project"**.
3. Fill in:
   - **Name:** `portfolio-backend`
   - **Database Password:** (Pick a strong password and save it)
   - **Region:** Pick a region close to you (e.g. `South Asia (Mumbai)` or `Singapore`)
4. Click **"Create new project"** and wait ~1 minute for provisioning.

---

## 🗄️ Step 2: Run the Database Schema

1. In your Supabase project dashboard, click on the **SQL Editor** tab (icon with `>_` on the left sidebar).
2. Click **"New query"**.
3. Open [`schema.sql`](./schema.sql), copy its entire content, and paste it into the query editor.
4. Click **"Run"** (or press `Ctrl + Enter`).
5. You will see `Success. No rows returned`.
   - Your two tables (`contact_messages` and `visitor_analytics`) are now created with security policies (Row Level Security) active.

---

## 🔑 Step 3: Copy Your API Keys

1. In your Supabase dashboard, click the **Settings (gear icon)** at the bottom left, then click **API** (or **Project Settings** -> **API**).
2. You will see:
   - **Project URL:** e.g., `https://xyzabcdefghijklm.supabase.co`
   - **Project API keys -> `anon` `public`:** e.g., `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`
3. Open [`backend/supabase-client.js`](./supabase-client.js) in your code editor.
4. Replace the placeholders with your actual keys:

```javascript
const SUPABASE_CONFIG = {
  url: 'https://YOUR_PROJECT_REF.supabase.co',
  anonKey: 'YOUR_ANON_PUBLIC_KEY'
};
```

---

## 📬 Step 4: Test & View Data

1. Open `index.html` in your browser.
2. Fill out the **"Send a Direct Message"** contact form and submit.
3. Go to your Supabase Dashboard -> **Table Editor** -> **`contact_messages`**:
   - You will see the newly inserted row with the sender's name, email, message, and timestamp!
4. Check **`visitor_analytics`**:
   - You will see live visits, page routes, and browser metadata.
