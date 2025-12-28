import { create } from "zustand";
import { persist } from "zustand/middleware";

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
  image?: string;
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
  experiences: Experience[];
  projects: Project[];
  certifications: Certification[];
  education: Education[];
  skillCategories: SkillCategory[];
}

interface PortfolioState {
  data: PortfolioData;
  certificationBgEnabled: boolean;
  setData: (data: Partial<PortfolioData>) => void;
  setCertificationBg: (enabled: boolean) => void;
  resetToDefault: () => void;
}

const defaultData: PortfolioData = {
  name: "Jay Joshi",
  title: "Full Stack Developer",
  roles: ["Full Stack Developer", "MERN Stack Developer", "AI Enthusiast"],
  summary:
    "I build scalable, user-focused web applications using MERN and modern AI tools.",
  email: "jayjoshi2784@gmail.com",
  phone: "8238061585",
  location: "Ahmedabad, India",
  linkedin: "https://linkedin.com/in/jay-joshi2784",
  github: "https://github.com/imjayjoshi",
  instagram: "https://instagram.com/jay._.joshi._",
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
      id: "2",
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
      date: "2024",
      credentialUrl: "#",
    },
    {
      id: "2",
      title: "Introduction to Software Engineering",
      issuer: "IBM",
      date: "2024",
      credentialUrl: "#",
    },
    {
      id: "3",
      title: "AWS Fundamentals",
      issuer: "Amazon Web Services",
      date: "2024",
      credentialUrl: "#",
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
      degree: "HSC (12th)",
      institution: "Muktajivan High School",
      period: "2021",
      grade: "61.33%",
    },
  ],
};

export const usePortfolioStore = create<PortfolioState>()(
  persist(
    (set) => ({
      data: defaultData,
      certificationBgEnabled: true,
      setData: (newData) =>
        set((state) => ({
          data: { ...state.data, ...newData },
        })),
      setCertificationBg: (enabled) => set({ certificationBgEnabled: enabled }),
      resetToDefault: () => set({ data: defaultData }),
    }),
    {
      name: "portfolio-storage",
    }
  )
);
