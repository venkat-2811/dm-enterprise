# DM Enterprises Website

A modern, responsive website for DM Enterprises - workspace furniture and interior solutions provider.

## Features

- **Contact Form**: Users can submit inquiries via the contact form
- **Chatbot**: Interactive chatbot for lead generation
- **Email Integration**: Form submissions and chatbot conversations are sent to your email via Resend API
- **Modern UI**: Built with React, TypeScript, TailwindCSS, and Framer Motion

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

### Build

```bash
npm run build
```

## Deployment

### Netlify Deployment

This project is configured for Netlify deployment with serverless functions for email sending.

#### Step 1: Set up Environment Variables

In Netlify dashboard, go to **Site Settings > Environment Variables** and add:

```
RESEND_API_KEY=your_resend_api_key_here
```

**Important**: Use your actual Resend API key. Never commit API keys to Git.

#### Step 2: Deploy to Netlify

**Option A: Via Git (Recommended)**
1. Push your code to GitHub/GitLab/Bitbucket
2. In Netlify, click "Add new site" > "Import from Git"
3. Select your repository
4. Build command: `npm run build`
5. Publish directory: `dist`
6. Click "Deploy site"

**Option B: Via Netlify CLI**
```bash
npm install -g netlify-cli
netlify login
netlify init
netlify deploy --prod
```

#### Step 3: Configure Custom Domain (GoDaddy)

1. In Netlify, go to **Domain Settings > Add custom domain**
2. Enter your domain (e.g., `dmenterprises.in`)
3. Netlify will provide DNS records to add
4. Log in to GoDaddy and add the following DNS records:
   - **A Record**: `@` → Netlify-provided IP address
   - **CNAME**: `www` → `your-site-name.netlify.app`
5. Wait for DNS propagation (usually 24-48 hours)

### Email Integration

The contact form and chatbot use Resend API to send emails to `venkatakarthiksai.s@gmail.com`.

**How it works:**
- Contact form submissions trigger `/api/send-email` endpoint
- Chatbot conversations are automatically sent when completed
- Emails are sent with formatted HTML templates
- All submissions include user details and timestamp

**To change the recipient email:**
Update `TO_EMAIL` in:
- `src/components/ContactSection.tsx` (line 25)
- `src/components/Chatbot.tsx` (line 5)

## Tech Stack

- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **TailwindCSS** - Styling
- **Framer Motion** - Animations
- **Resend** - Email service
- **Netlify** - Hosting & serverless functions
