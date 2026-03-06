# Pillio Technology Solutions — Portal

Official marketing and contact portal for **Pillio Technology Solutions**.  
Built with Next.js 14, TypeScript, Tailwind CSS, and Framer Motion.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Animations | Framer Motion |
| Forms | React Hook Form + Zod |
| Icons | Lucide React |
| Contact API | Google Sheets Webhook |
| Fonts | Plus Jakarta Sans, Space Grotesk |

---

## Project Structure

```
app/
  page.tsx              # Main single-page site (Hero, About, Services, Products, Contact)
  layout.tsx            # Root layout with fonts and metadata
  globals.css           # Design tokens, Tailwind component classes, animations
  components/
    PillioLogo.tsx      # Reusable logo component (icon + brand text)
  api/
    contact/
      route.ts          # Contact form API — forwards submissions to Google Sheets
public/
  pilliologo.jpeg       # Brand logo image
```

---

## Getting Started (Local Development)

### Prerequisites
- Node.js 18+
- npm

### 1. Install dependencies
```bash
npm install
```

### 2. Set up environment variables
Create a `.env.local` file in the project root:
```env
GOOGLE_SHEET_WEBHOOK_URL=your_google_apps_script_webhook_url
```
> See `GOOGLE_SHEET_SETUP.md` for instructions on setting up the Google Sheet webhook.

### 3. Start the dev server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Deployment to Custom Domain (www.pilliotech.com)

This project is hosted on **Vercel** with the custom domain managed via **Hostinger DNS**.

### Step 1 — Push code to GitHub
```bash
git add .
git commit -m "your message"
git push origin main
```
Repository: [github.com/rajeshyou-cloud/pillio](https://github.com/rajeshyou-cloud/pillio)

### Step 2 — Deploy on Vercel
1. Go to [vercel.com](https://vercel.com) and sign in with GitHub
2. Click **Add New Project** → import the `pillio` repo
3. Framework will auto-detect as **Next.js** — leave all settings as default
4. Add the environment variable:
   - `GOOGLE_SHEET_WEBHOOK_URL` = your webhook URL
5. Click **Deploy**

### Step 3 — Add custom domain in Vercel
1. In your Vercel project → **Settings** → **Domains**
2. Add `www.pilliotech.com`
3. Add `pilliotech.com` (apex domain)
4. Note the DNS values Vercel provides

### Step 4 — Update DNS in Hostinger
1. Log in to [hpanel.hostinger.com](https://hpanel.hostinger.com)
2. Go to **Domains** → `pilliotech.com` → **Manage** → **DNS / Nameservers**
3. Add/update these DNS records:

| Type | Name | Value |
|---|---|---|
| `A` | `@` | `76.76.21.21` |
| `CNAME` | `www` | `cname.vercel-dns.com` |

4. Remove any pre-existing `A` or `CNAME` records for `@` and `www` pointing to Hostinger servers
5. Save changes

### Step 5 — Verify
- DNS propagation takes 5 minutes to 48 hours (usually under 30 min)
- Vercel's **Domains** page will show a green **Valid** badge when live
- SSL (HTTPS) is provisioned automatically by Vercel — no extra setup needed

### Continuous Deployment
Every push to `main` triggers an automatic rebuild and redeploy on Vercel. No manual steps required after initial setup.

---

## Environment Variables

| Variable | Required | Description |
|---|---|---|
| `GOOGLE_SHEET_WEBHOOK_URL` | Yes | Google Apps Script web app URL for contact form submissions |

---

## Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```
