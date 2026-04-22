# CyberAudit — Deployment Guide

## Run Locally (test before deploying)

```bash
cd cyberaudit
npm install
cp .env.local.example .env.local
# Edit .env.local — add your Anthropic API key from console.anthropic.com
npm run dev
# Open http://localhost:3000
```

## Deploy to Vercel (free, takes 5 minutes)

1. Push this folder to a GitHub repo (github.com → New repo → upload files)
2. Go to vercel.com → Sign up free → "Add New Project"
3. Import your GitHub repo
4. In Vercel project settings → Environment Variables → add:
   - Key: `ANTHROPIC_API_KEY`
   - Value: your key from console.anthropic.com
5. Click Deploy → done. You get a free URL like `cyberaudit.vercel.app`

## Custom Domain (optional, ~$15/year)

- Buy `cyberaudit.ca` or `cybercheck.ca` on Namecheap (~$15 CAD/year)
- In Vercel → Domains → add your domain → follow DNS instructions
- Or use a subdomain: `audit.deeptechnologies.ca` (free, uses your existing domain)

## Anthropic API Cost

Each report generation costs approximately $0.002–$0.006 USD (less than 1 cent).
At $0 revenue (free tool), 1,000 reports/month = ~$4–6 USD in API costs.
Well within Anthropic's free tier for new accounts ($5 free credit).

## Monetization Options (add later)

Option A — Stripe per-report ($19 CAD):
- Create a Stripe Payment Link at dashboard.stripe.com
- On success, redirect to /audit?paid=true
- Gate the form behind the ?paid=true param

Option B — Gumroad lifetime access ($47):
- Sell "CyberAudit Pro Access" on Gumroad
- Deliver a password or token that unlocks the audit page
- Simple and zero-code

Option C — AppSumo lifetime deal:
- Apply at sell.appsumo.com once you have 10+ users
- Typical deal: $49 lifetime, AppSumo keeps 30%
- Average AppSumo deal generates $4,000–$15,000 revenue
