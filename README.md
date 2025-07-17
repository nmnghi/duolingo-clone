# GoLang – Duolingo Clone

**GoLang** is a full-featured Duolingo-inspired language learning platform built with the modern web stack.  
It offers a gamified experience with XP, hearts, quests, streak tracking, reminders, and more — all in one!

<img width="1440" height="754" alt="Image" src="https://github.com/user-attachments/assets/83e6f79a-a4ce-41b4-a251-2c6fa372355a" />
<img width="1440" height="754" alt="Image" src="https://github.com/user-attachments/assets/3180fea0-0268-4b3a-8754-49bf44813201" />

---

## 🛠 Tech Stack

- ⚛️ **Framework**: Next.js 14 (App Router, Server Actions)
- 🔐 **Authentication**: Clerk
- 🗣 **AI Voices**: MiniMax Audio
- 🎨 **UI Components**: Shadcn UI
- 🎭 **Assets**: KenneyNL
- 🧱 **ORM**: Drizzle ORM
- 🗄 **Database**: Postgres (Neon)
- 📊 **Admin Panel**: React Admin
- 💳 **Payment**: Stripe

---

## ✨ Features

- 🎮 Gamified learning experience with hearts and XP
- ⚠️ Popup modals for low-heart warnings and exit confirmation
- 🔁 Practice old lessons to regain hearts
- 🏆 XP-based leaderboard
- 🗺 Quest milestones to guide learning path
- 🛍 Shop system to exchange XP for hearts
- 🚀 Pro tier with unlimited hearts
- 🏠 Landing page and marketing content
- 🔥 Daily streak system to encourage consistent practice
- 📧 Email reminders when users are inactive
- ⏭ Skip challenges to fast-track unit completion
- 📋 Admin dashboard for managing users and content
- 📱 Mobile-responsive layout for all screen sizes

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/nmnghi/GoLang.git
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL=/learn
NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL=/learn
NEXT_PUBLIC_APP_URL="http://localhost:3000"
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_stripe_public_key
CLERK_SECRET_KEY=your_clerk_secret
DB_URL=your_neon_postgres_url
STRIPE_API_KEY=your_stripe_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_key
```

### 4. Seed the database

Once your environment variables are set and the database is connected, run the following command to populate it with initial data:

```bash
npm run db:seed
```

### 5. ▶️ Run the development server

```bash
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📁 Project Structure

```
duolingo-clone/
├── app/              # App Router pages and layouts
├── components/       # Reusable UI components
├── lib/              # Business logic and utils
├── db/               # Drizzle ORM setup
├── public/           # Static assets
├── actions/          # Server actions
├── admin/            # Admin dashboard config
└── ...
```

---

## 📄 License

This project is licensed under the MIT License.

---

## 📚 Learn More

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

You can start editing the app by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family from Vercel.

### Useful Resources

- 📘 [Next.js Documentation](https://nextjs.org/docs)
- 🎓 [Learn Next.js](https://nextjs.org/learn)
- 💻 [Next.js GitHub Repository](https://github.com/vercel/next.js)

---

## ☁️ Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
