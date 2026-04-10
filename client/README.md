# Portfolio Client — MERN Stack Developer

React frontend for the portfolio, built with Vite + Framer Motion.

---

## 📁 Project Structure

```
src/
├── components/
│   ├── Navbar.jsx / Navbar.module.css
│   ├── Hero.jsx   / Hero.module.css
│   ├── Skills.jsx / Skills.module.css
│   ├── Projects.jsx / Projects.module.css
│   ├── Contact.jsx  / Contact.module.css
│   └── Footer.jsx   / Footer.module.css
├── data.js          ← Edit YOUR info here
├── App.jsx
├── main.jsx
└── index.css        ← CSS variables / global styles
```

---

## 🚀 Getting Started

### 1. Install dependencies
```bash
npm install
```

### 2. Run dev server
```bash
npm run dev
# → http://localhost:3000
```

### 3. Build for production
```bash
npm run build
```

---

## ✏️ Customizing Your Portfolio

All personal content lives in **`src/data.js`** — just edit that one file:

```js
export const personalInfo = {
  name: 'Ritu',          // First name shown in hero
  fullName: 'Ritu Panchal',
  role: 'MERN Stack Dev.',
  tagline: 'Available for work · Delhi, IN',
  bio: '...',
  email: 'you@email.com',
  github: 'https://github.com/yourusername',
  linkedin: 'https://linkedin.com/in/yourusername',
  resume: '/resume.pdf',   // Place resume.pdf in /public folder
}

// Add/remove projects here
export const projects = [
  {
    id: 1,
    title: 'Your Project',
    description: 'What it does...',
    tags: ['React', 'Node', 'MongoDB'],
    liveUrl: 'https://...',
    githubUrl: 'https://...',
  },
]
```

---

## 🎨 Changing Colors

All colors are CSS variables in `src/index.css`:

```css
:root {
  --accent: #7fd4a0;        /* Green accent — change to any color */
  --bg-primary: #0a0a0f;    /* Page background */
  --bg-card: #13131c;       /* Card background */
  --text-primary: #e8e8f0;  /* Main text */
  --text-muted: #9999b0;    /* Secondary text */
}
```

---

## 📡 Contact Form Backend

The contact form POSTs to `/api/contact`.
This is proxied to `http://localhost:5000` in dev (see `vite.config.js`).

Make sure your Express server is running on port 5000.
For production, set the full API URL in an `.env` file:

```
VITE_API_URL=https://your-backend.onrender.com
```

---

## 🚢 Deploy to Vercel

```bash
npm install -g vercel
vercel
```

Set environment variable `VITE_API_URL` in Vercel dashboard → Project Settings → Environment Variables.