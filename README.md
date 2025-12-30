# Jay Joshi | Full Stack Developer Portfolio

A modern, high-performance portfolio website built with **Next.js 16**, **React 19**, **Three.js**, and **Framer Motion**. Features stunning 3D animations, glassmorphism design, and a fully responsive layout.

![Portfolio Preview](public/og-image.png)

---

## ✨ Features

### 🎨 Design & UI

- **Glassmorphism** design with smooth gradients and blur effects
- **Dark theme** with vibrant accent colors
- **3D animated backgrounds** using Three.js and React Three Fiber
- **Smooth page transitions** with Framer Motion
- **Responsive design** optimized for all devices
- **Custom typography** with Google Fonts

### 📄 Pages

| Page               | Description                                                                                  |
| ------------------ | -------------------------------------------------------------------------------------------- |
| **Home**           | Hero section with animated typing, about preview, skills, projects showcase, and contact CTA |
| **About**          | Detailed bio with highlights, core skills, and what drives me                                |
| **Projects**       | Interactive flip cards with 3D floating deck scene                                           |
| **Skills**         | Categorized skills with orbital 3D animation                                                 |
| **Experience**     | Timeline-based work history with scroll animations                                           |
| **Certifications** | Stacked glassmorphism card carousel                                                          |
| **Contact**        | Validated contact form with Web3Forms integration                                            |

### 🔧 Technical Highlights

- **Next.js 16** with App Router and Server Components
- **React 19** with latest features
- **TypeScript** for type safety
- **Zustand** for state management with persistence
- **Three.js / React Three Fiber** for 3D scenes
- **Framer Motion** for animations
- **Tailwind CSS** for styling
- **Radix UI** for accessible components
- **shadcn/ui** component library
- **Zod** for form validation
- **Web3Forms** for contact form

### 🚀 SEO Optimized

- Dynamic meta tags for each page
- Open Graph and Twitter Card support
- Sitemap.xml and robots.txt
- Semantic HTML structure
- Canonical URLs

---

## 🛠️ Tech Stack

| Category          | Technologies                      |
| ----------------- | --------------------------------- |
| **Framework**     | Next.js 16, React 19              |
| **Language**      | TypeScript                        |
| **Styling**       | Tailwind CSS, CSS Variables       |
| **3D Graphics**   | Three.js, React Three Fiber, Drei |
| **Animations**    | Framer Motion, GSAP               |
| **State**         | Zustand                           |
| **Forms**         | React Hook Form, Zod, Web3Forms   |
| **UI**            | Radix UI, shadcn/ui, Lucide Icons |
| **Smooth Scroll** | Lenis                             |

---

## 📁 Project Structure

```
├── app/                    # Next.js App Router pages
│   ├── about/             # About page
│   ├── certifications/    # Certifications page
│   ├── contact/           # Contact form page
│   ├── experience/        # Work experience page
│   ├── projects/          # Projects showcase
│   ├── skills/            # Skills & technologies
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   ├── providers.tsx      # Context providers
│   ├── sitemap.ts         # Dynamic sitemap
│   └── robots.ts          # Robots.txt config
├── components/
│   ├── home/              # Homepage sections
│   ├── layout/            # Layout components (Navbar, Footer)
│   ├── three/             # Three.js 3D scenes
│   ├── transitions/       # Page transitions & effects
│   └── ui/                # Reusable UI components
├── hooks/                 # Custom React hooks
├── lib/                   # Utility functions & SEO
├── store/                 # Zustand state store
├── public/                # Static assets
│   ├── certifications/    # Certificate images
│   ├── favicon.svg        # Site favicon
│   ├── og-image.png       # Open Graph image
│   └── resume.pdf         # Downloadable resume
└── tailwind.config.ts     # Tailwind configuration
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** >= 18.x
- **npm** >= 9.x

### Installation

```bash
# Clone the repository
git clone https://github.com/imjayjoshi/portfolio.git
cd portfolio

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
# Create optimized build
npm run build

# Start production server
npm start
```

---

## ⚙️ Configuration

### Personal Data

Edit `store/portfolioStore.ts` to update:

- Name, title, and roles
- Contact information
- Social media links
- Projects and experiences
- Skills and certifications
- SEO metadata

### Contact Form

The contact form uses [Web3Forms](https://web3forms.com/). Update the `contactFormAccessKey` in the portfolio store with your access key.

### Styling

Customize colors and design tokens in:

- `app/globals.css` - CSS variables
- `tailwind.config.ts` - Tailwind theme

---

## 📝 Scripts

| Command         | Description              |
| --------------- | ------------------------ |
| `npm run dev`   | Start development server |
| `npm run build` | Build for production     |
| `npm start`     | Start production server  |
| `npm run lint`  | Run ESLint               |

---

## 👤 Author

**Jay Joshi**

- 📧 Email: [jayjoshi2784@gmail.com](mailto:jayjoshi2784@gmail.com)
- 💼 LinkedIn: [jay-joshi2784](https://linkedin.com/in/jay-joshi2784)
- 🐙 GitHub: [imjayjoshi](https://github.com/imjayjoshi)
- 📸 Instagram: [jay._.joshi._](https://instagram.com/jay._.joshi._)

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

<p align="center">
  Made with ❤️ by Jay Joshi
</p>
