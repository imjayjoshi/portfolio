import { create } from "zustand";

export interface Experience {
  id: string;
  title: string;
  company: string;
  location: string;
  period: string;
  description: string;
  highlights: string[];
  technologies: string[];
}

export interface Project {
  id: string;
  title: string;
  shortDescription: string;
  description: string;
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  date: string;
  image?: string;
  credentialUrl?: string;
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  period: string;
  grade: string;
}

export interface SkillCategory {
  name: string;
  icon: string;
  skills: string[];
}

export interface HighlightItem {
  icon: string;
  title: string;
  desc: string;
}

export interface AboutPageContent {
  headline: string;
  headlineHighlight: string;
  // subheadline: string;
  paragraphs: string[];
  highlights: HighlightItem[];
  coreSkills: string[];
  whatDrivesMe: string[];
}

export interface CoreCompetency {
  label: string;
  value: string;
}

export interface FreelanceService {
  id: string;
  title: string;
  description: string;
  icon: string;
  deliverables: string[];
}

export interface WorkPackage {
  id: string;
  name: string;
  price: string;
  timeline: string;
  description: string;
  features: string[];
  idealFor: string;
  highlighted?: boolean;
}

export interface CaseStudy {
  id: string;
  projectId: string;
  challenge: string;
  solution: string;
  results: string[];
  role: string;
  timeline: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
}

export interface ProcessStep {
  step: number;
  title: string;
  description: string;
}

export interface FreelanceStat {
  label: string;
  value: number;
  suffix?: string;
}

export interface SeoConfig {
  siteUrl: string;
  twitterHandle: string;
  defaultOgImage?: string;
  pages: {
    home: { title: string; description: string };
    about: { title: string; description: string };
    projects: { title: string; description: string };
    skills: { title: string; description: string };
    experience: { title: string; description: string };
    certifications: { title: string; description: string };
    contact: { title: string; description: string };
    services: { title: string; description: string };
    hire: { title: string; description: string };
    work: { title: string; description: string };
  };
}

export interface PortfolioData {
  name: string;
  title: string;
  roles: string[];
  summary: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  github: string;
  instagram: string;
  x: string;
  contactFormAccessKey: string;
  experiences: Experience[];
  projects: Project[];
  certifications: Certification[];
  education: Education[];
  skillCategories: SkillCategory[];
  aboutPage: AboutPageContent;
  coreCompetencies: CoreCompetency[];
  freelanceServices: FreelanceService[];
  workPackages: WorkPackage[];
  caseStudies: CaseStudy[];
  testimonials: Testimonial[];
  processSteps: ProcessStep[];
  freelanceStats: FreelanceStat[];
  availability: string;
  seo: SeoConfig;
}

interface PortfolioState {
  data: PortfolioData;
  certificationBgEnabled: boolean;
  setData: (data: Partial<PortfolioData>) => void;
  setCertificationBg: (enabled: boolean) => void;
  resetToDefault: () => void;
} 

const defaultData: PortfolioData = {
  // ... existing data ...
  name: "Jay Joshi",
  title: "Full Stack Developer",
  roles: ["Full Stack Developer", "MERN", "AI"],
  summary:
    "I’m a full stack developer focused on building scalable, user-centric web applications using the MERN stack and modern AI-driven tools.",
  email: "fixwithjay4@gmail.com",
  phone: "8238061585",
  location: "Ahmedabad, India",
  linkedin: "https://www.linkedin.com/in/jay-joshi2708/",
  github: "https://www.github.com/imjayjoshi",
  instagram: "https://www.instagram.com/jay._.joshi._",
  x:"https://x.com/fixwithjay",
  contactFormAccessKey: "225ba732-ab8b-4556-b146-cec8b349078d",
  skillCategories: [
    {
      name: "Programming Languages",
      icon: "Code",
      skills: [
        "JavaScript",
        "TypeScript",
        "HTML",
        "CSS",
        "Java",
        "ASP.NET",
        "C#",
        "Python", 
      ],
    },
    {
      name: "Libraries & Frameworks",
      icon: "Layout",
      skills: [
        "React.js",
        "Node.js",
        "Express.js",
        "Django",
        "Tailwind CSS",
        "Radix UI",
      ],
    },
    {
      name: "Databases",
      icon: "Database",
      skills: ["MongoDB", "MySQL", "PostgreSQL", "MongoDB Atlas"],
    },
    {
      name: "Tools & Platforms",
      icon: "Settings",
      skills: [
        "VS Code",
        "Cursor",
        "Postman",
        "GitHub",
        "Git",
        "Google Antigravity",
        "Vercel",
        "Railway",
      ],
    },
    {
      name: "AI & ML",
      icon: "Brain",
      skills: [
        "Streamlit",
        "Scikit-learn",
        "NLP",
        "TF-IDF",
        "Pandas",
        "Jupyter",
        "PyPDF2",
      ],
    },
    {
      name: "Soft Skills",
      icon: "Users",
      skills: [
        "Critical Thinking",
        "Problem Solving",
        "Team Collaboration",
        "Leadership",
        "Communication",
      ],
    },
  ],
  experiences: [
    {
      id: "1",
      title: "MERN Stack Developer Intern",
      company: "Budventure Technologies",
      location: "On-Site, Ahmedabad",
      period: "January 2026 – Present",
      description:
        "Currently working as a MERN Stack Developer Intern, building scalable web applications with modern technologies and real-time features.",
      highlights: [
        "Developing full-stack applications using Next.js, Node.js, and PostgreSQL with focus on performance and scalability",
        "Implemented real-time features using WebSockets for live updates and seamless user interaction",
        "Worked on API development, database design, and optimized backend services for better efficiency",
        "Collaborated on production-level projects following industry best practices and clean architecture",
      ],
      technologies: [
        "Next.js",
        "React",
        "Node.js",
        "Express",
        "PostgreSQL",
        "WebSockets",
        "JavaScript",
      ],
    },
    {
      id: "2",
      title: "AI Internship",
      company: "All India Council for Technical Education (AICTE)",
      location: "Remote, New Delhi",
      period: "February 2025 – March 2025",
      description:
        "Selected for the TechSaksham AI Internship, a national initiative by Microsoft & SAP in partnership with AICTE.",
      highlights: [
        "Built an AI-powered Resume & Candidate Ranking System using Streamlit, NLP, and machine learning to rank resumes based on job description relevance",
        "Gained mentorship from industry experts and participated in collaborative learning sessions",
      ],
      technologies: [
        "Python",
        "Streamlit",
        "NLP",
        "Machine Learning",
        "Pandas",
      ],
    },
    {
      id: "3",
      title: "Teaching Staff",
      company: "BECIL Training Centre",
      location: "On-Site, Ahmedabad",
      period: "August 2021 – December 2023",
      description:
        "Delivered CCC, Tally, and basic web development courses, covering both theory and practical work.",
      highlights: [
        "Managed student admissions, class schedules, and coordinated multiple batches effectively",
        "Prepared and maintained financial records using Tally Prime and MS Office tools, and assisted in financial reporting",
        "Developed and implemented lesson plans and educational materials tailored to diverse learning needs",
        "Built strong communication and leadership skills while creating a positive, engaging classroom environment",
      ],
      technologies: ["Web Development", "Tally Prime", "MS Office", "CCC"],
    },
  ],
  projects: [
    {
      id: "1",
      title: "SpeakWise – AI-Powered Language Pronunciation Platform",
      shortDescription:
        "Full-stack AI pronunciation coach with real-time speech analysis, multi-language support, and accuracy scoring. Built with MERN stack, JWT auth, and 80% test coverage.",
      description:
        "Developed a full-stack AI pronunciation coach with real-time speech analysis, multi-language support, and detailed accuracy/fluency scoring. Built secure REST APIs using Express.js, JWT authentication, bcrypt hashing, Helmet.js, rate limiting, and input validation for production-grade security. Designed a responsive UI using React.js, TypeScript, TailwindCSS, Radix UI, and created analytics dashboards with Recharts. Implemented a complete testing ecosystem using Vitest, Jest, React Testing Library, Supertest, and Playwright, achieving 80% backend and 70% frontend test coverage. Deployed using Vercel (frontend) and Railway (backend) with MongoDB Atlas.",
      technologies: [
        "MERN",
        "TypeScript",
        "Tailwind CSS",
        "Radix UI",
        "Recharts",
        "Jest",
        "Vercel",
        "Railway",
        "MongoDB Atlas",
      ],
      liveUrl: "https://speakwiseai.vercel.app/",
      githubUrl: "https://github.com/imjayjoshi/SpeakWise",
    },
    {
      id: "2",
      title: "Zom-Feed",
      shortDescription:
        "Social feed platform for food enthusiasts with JWT authentication, image uploads via ImageKit, and a responsive React UI.",
      description:
        "Developed a full-stack social feed web application for food enthusiasts using MongoDB, Express.js, React, and Node.js. Built secure JWT-based authentication and RESTful APIs to manage posts, likes, and comments efficiently. Integrated ImageKit for image storage and implemented a responsive, modern UI with React and Tailwind CSS. Optimized backend performance and ensured smooth data synchronization across client and server.",
      technologies: [
        "MongoDB",
        "Express.js",
        "React",
        "Node.js",
        "JWT",
        "ImageKit",
        "Tailwind CSS",
      ],
      githubUrl: "https://github.com/imjayjoshi/ZomFeed",
    },
    {
      id: "3",
      title: "AI Resume & Candidate Ranking System",
      shortDescription:
        "AI-powered resume ranking system using TF-IDF and cosine similarity to score candidates based on job relevance.",
      description:
        "Developed an AI-powered resume ranking system using Streamlit that scores resumes based on job description relevance using TF-IDF and cosine similarity. Enabled recruiters to efficiently evaluate multiple candidates with interactive visualizations.",
      technologies: [
        "Python",
        "Jupyter",
        "Scikit-learn",
        "Streamlit",
        "PyPDF2",
        "Pandas",
      ],
      liveUrl: "https://resumeranking-ai.onrender.com/",
      githubUrl: "https://github.com/imjayjoshi/Resume-ranking",
    },
    {
      id: "4",
      title: "Class Management System – VCS",
      shortDescription:
        "Full-stack system for managing attendance, grades, and user roles with role-based auth for admins, staff, and students.",
      description:
        "Built a full-stack system for managing private class operations like attendance, grades, and user roles. Included full auth system: login/signup for admins, staff, and students with role dashboards. Worked in a small team, staying on task with clear priorities and solid version control.",
      technologies: ["HTML", "CSS", "JavaScript", "Python", "Django", "MySQL"],
      githubUrl: "https://github.com/imjayjoshi/Class-Management-System",
    },
  ],
  certifications: [
    {
      id: "1",
      title: "Generative AI: Fundamentals",
      issuer: "IBM",
      date: "2025",
      image: "/certifications/ibm-genai.png",
      credentialUrl: "https://coursera.org/verify/specialization/EVYJ1FOGQVL6",
    },
    {
      id: "2",
      title: "Introduction to Software Engineering",
      issuer: "IBM",
      date: "2025",
      image: "/certifications/ibm-software.png",
      credentialUrl: "https://coursera.org/verify/5AI7IHCF69H7",
    },
    {
      id: "3",
      title: "AWS Fundamentals",
      issuer: "Amazon Web Services",
      date: "2025",
      image: "/certifications/aws-fundamentals.png",
      credentialUrl: "https://coursera.org/verify/specialization/FAHTE3RW6J21",
    },
  ],
  education: [
    {
      id: "1",
      degree: "Masters of Computer Applications",
      institution: "LJ University",
      period: "2024 – 2026",
      grade: "8.25 SPI (Current)",
    },
    {
      id: "2",
      degree: "Bachelor of Computer Applications",
      institution: "Gujarat University",
      period: "2021 – 2024",
      grade: "6.93 CGPA",
    },
    {
      id: "3",
      degree: "HSC",
      institution: "Muktajivan High School",
      period: "2021",
      grade: "61.33%",
    },
  ],
  // About page content
  aboutPage: {
    headline: "Turning Ideas Into",
    headlineHighlight: "Scalable Products",
    paragraphs: [
      "Currently, I’m gaining **hands-on industry experience** as an **intern**, where I contribute to real-world projects, write **production-level code**, and collaborate in a professional development environment. Alongside this, I also work directly with clients, delivering complete **end-to-end solutions** from development to deployment, including hosting setup on platforms like **Hostinger**.",
      "My journey is built on a strong **academic foundation**, strengthened by practical experience and real projects. I specialize in **performance-driven applications**, **AI integrations**, and designing **clean, scalable systems** that are built to last.",
      "I’m passionate about modern technologies, **product thinking**, and creating solutions that make a real impact. I continuously push myself to grow by exploring new tools, improving my **architecture skills**, and taking on challenges that elevate my development expertise.",
    ],
    highlights: [
      {
        icon: "Code2",
        title: "Clean Code",
        desc: "Writing maintainable, scalable solutions",
      },
      {
        icon: "Lightbulb",
        title: "Innovation",
        desc: "Exploring cutting-edge technologies",
      },
      {
        icon: "Target",
        title: "Goal-Oriented",
        desc: "Focused on delivering results",
      },
      {
        icon: "Rocket",
        title: "Fast Learner",
        desc: "Quick to adapt and grow",
      },
    ],
    coreSkills: [
      "React",
      "TypeScript",
      "Node.js",
      "Python",
      "Next.js",
      "TailwindCSS",
      "MongoDB",
      "Git",
      "Docker",
      "REST APIs",
    ],
    whatDrivesMe: [
      "Building impactful solutions",
      "Learning new technologies",
      "Problem solving & innovation",
    ],
  },
  coreCompetencies: [
    { label: "Frontend", value: "React, Next.js, TypeScript" },
    { label: "Backend", value: "Node.js, Express, Django" },
    { label: "Database", value: "MongoDB, MySQL, PostgreSQL" },
    { label: "Tools", value: "Git, Docker, VS Code" },
  ],
  availability: "Open for freelance projects & full-time roles — 2 slots this quarter",
  freelanceStats: [
    { label: "Projects delivered", value: 12, suffix: "+" },
    { label: "Client satisfaction", value: 100, suffix: "%" },
    { label: "Years building", value: 3, suffix: "+" },
    { label: "Tech stack depth", value: 25, suffix: "+" },
  ],
  freelanceServices: [
    {
      id: "fullstack",
      title: "Full-Stack Web Apps",
      description:
        "End-to-end MERN/Next.js products — from UI and APIs to deployment on Vercel, Railway, or Hostinger.",
      icon: "Layers",
      deliverables: [
        "Responsive UI with React/Next.js",
        "REST or real-time APIs",
        "Database design & auth",
        "Production deployment",
      ],
    },
    {
      id: "ai",
      title: "AI Integration",
      description:
        "Add intelligent features: NLP, resume ranking, chat assistants, and Streamlit dashboards tied to your product.",
      icon: "Sparkles",
      deliverables: [
        "Model integration & APIs",
        "Streamlit or in-app AI UX",
        "Data pipelines",
        "Documentation & handoff",
      ],
    },
    {
      id: "mvp",
      title: "MVP & Startup Builds",
      description:
        "Fast, focused MVPs for founders who need a credible product to validate with users or investors.",
      icon: "Rocket",
      deliverables: [
        "Scope & roadmap",
        "Core feature set",
        "Analytics-ready setup",
        "Iterative releases",
      ],
    },
    {
      id: "maintenance",
      title: "Maintenance & Scale",
      description:
        "Improve performance, fix bugs, add features, and harden security on existing codebases.",
      icon: "Wrench",
      deliverables: [
        "Code audit",
        "Performance tuning",
        "Test coverage",
        "Ongoing support plans",
      ],
    },
  ],
  workPackages: [
    {
      id: "starter",
      name: "Starter",
      price: "From ₹25,000",
      timeline: "2–3 weeks",
      description: "Landing page or small feature slice for individuals and early-stage ideas.",
      features: [
        "Up to 3 pages or 1 core feature",
        "Mobile-responsive design",
        "Contact form integration",
        "1 round of revisions",
      ],
      idealFor: "Personal brands, portfolios, simple MVPs",
    },
    {
      id: "growth",
      name: "Growth",
      price: "From ₹75,000",
      timeline: "4–8 weeks",
      description: "Full product build with auth, dashboard, and deployment.",
      features: [
        "Full-stack application",
        "Authentication & roles",
        "Admin or user dashboard",
        "Deployment & basic SEO",
        "2 rounds of revisions",
      ],
      idealFor: "Startups, SMBs, client portals",
      highlighted: true,
    },
    {
      id: "enterprise",
      name: "Custom",
      price: "Custom quote",
      timeline: "Flexible",
      description: "Complex systems, AI features, integrations, and long-term partnership.",
      features: [
        "Custom architecture",
        "AI / third-party integrations",
        "Dedicated communication",
        "SLA & maintenance options",
      ],
      idealFor: "Agencies, enterprises, long-term products",
    },
  ],
  caseStudies: [
    {
      id: "cs-1",
      projectId: "1",
      challenge:
        "Users needed real-time pronunciation feedback across languages with secure accounts and production-grade reliability.",
      solution:
        "Built a MERN + TypeScript platform with JWT auth, WebSocket-ready APIs, speech analysis flows, and 80% backend test coverage.",
      results: [
        "Live product on Vercel + Railway",
        "Multi-language pronunciation scoring",
        "Analytics dashboards for progress tracking",
      ],
      role: "Full-Stack Developer",
      timeline: "8 weeks",
    },
    {
      id: "cs-2",
      projectId: "2",
      challenge:
        "Food community needed a social feed with media uploads and secure user sessions.",
      solution:
        "Delivered MERN app with JWT auth, ImageKit media pipeline, and Tailwind UI optimized for engagement.",
      results: [
        "Posts, likes, and comments flow",
        "Image upload pipeline",
        "Responsive feed experience",
      ],
      role: "Full-Stack Developer",
      timeline: "5 weeks",
    },
    {
      id: "cs-3",
      projectId: "3",
      challenge:
        "Recruiters spent hours manually screening resumes against job descriptions.",
      solution:
        "AI ranking app using TF-IDF + cosine similarity with Streamlit UI for batch uploads.",
      results: [
        "Faster shortlisting",
        "Interactive relevance scores",
        "Deployed demo for stakeholders",
      ],
      role: "AI Developer",
      timeline: "3 weeks",
    },
  ],
  testimonials: [
    {
      id: "1",
      quote:
        "Jay delivered our MVP on time with clean code and clear communication throughout. Highly recommend for MERN projects.",
      author: "Startup founder",
      role: "Product client",
    },
    {
      id: "2",
      quote:
        "Strong full-stack skills — from UI polish to API design. Easy to work with remotely.",
      author: "Agency lead",
      role: "Development partner",
    },
  ],
  processSteps: [
    {
      step: 1,
      title: "Discovery",
      description:
        "We align on goals, users, timeline, and success metrics in a short call or brief.",
    },
    {
      step: 2,
      title: "Proposal",
      description:
        "You receive a clear scope, milestones, and fixed or phased pricing — no surprises.",
    },
    {
      step: 3,
      title: "Build",
      description:
        "Iterative development with weekly updates, demos, and access to staging environments.",
    },
    {
      step: 4,
      title: "Launch",
      description:
        "Deployment, handoff docs, and optional maintenance so your product stays healthy.",
    },
  ],
  seo: {
    siteUrl: "https://jay-joshi.vercel.app",
    twitterHandle: "@fixwithjay",
    defaultOgImage: "/og-image.png",
    pages: {
      home: {
        title: "Jay Joshi | Portfolio",
        description:
          "Full Stack Developer specializing in MERN stack and AI technologies. Building scalable, high-performance web applications.",
      },
      about: {
        title: "MERN Stack Developer India | Jay Joshi",
        description:
          "Learn about Jay Joshi, a MERN Stack Developer based in India. Expertise in React, Node.js, and building high-performance digital products.",
      },
      projects: {
        title: "React Node.js Projects Portfolio | Jay Joshi",
        description:
          "Explore Jay Joshi's portfolio of MERN stack projects, including AI-powered applications, social platforms, and management systems.",
      },
      skills: {
        title: "Technical Skills | Jay Joshi",
        description:
          "Expertise in React, Node.js, MongoDB, TypeScript, and AI technologies. Detailed breakdown of Jay Joshi's technical stack.",
      },
      experience: {
        title: "Professional Experience | Jay Joshi",
        description:
          "Jay Joshi's journey as a MERN Stack Developer, including internships at Budventure Technologies and AICTE.",
      },
      certifications: {
        title: "Professional Certifications | Jay Joshi",
        description:
          "Certifications in Generative AI, Software Engineering, and AWS Fundamentals earned by Jay Joshi.",
      },
      contact: {
        title: "Hire Full Stack Developer India | Jay Joshi",
        description:
          "Get in touch with Jay Joshi for full-stack web development opportunities, collaborations, or project inquiries.",
      },
      services: {
        title: "Freelance Web Development Services | Jay Joshi",
        description:
          "Hire Jay Joshi for full-stack development, AI integration, MVPs, and maintenance. MERN, Next.js, and production deployments.",
      },
      hire: {
        title: "Hire Jay Joshi | Freelancer & Full-Stack Developer",
        description:
          "Packages, availability, and process for clients and recruiters hiring Jay Joshi for web development work.",
      },
      work: {
        title: "Case Studies & Portfolio Work | Jay Joshi",
        description:
          "Detailed case studies of MERN and AI projects — challenges, solutions, and measurable outcomes.",
      },
    },
  },
};

export const usePortfolioStore = create<PortfolioState>()((set) => ({
  data: defaultData,
  certificationBgEnabled: true,
  setData: (newData) =>
    set((state) => ({
      data: { ...state.data, ...newData },
    })),
  setCertificationBg: (enabled) => set({ certificationBgEnabled: enabled }),
  resetToDefault: () => set({ data: defaultData }),
}));
