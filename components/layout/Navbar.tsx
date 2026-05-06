"use client";

import { useState, useEffect, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { Menu, X, Github, Linkedin, Instagram } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { usePageTransition } from "@/components/transitions";
import { usePortfolioStore } from "@/store/portfolioStore";
import { ModernButton } from "@/components/ui/ModernButton";
import { Magnetic } from "@/components/ui/Magnetic";

const navLinks = [
  // { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/experience", label: "Experience" },
  { href: "/projects", label: "Projects" },
  { href: "/skills", label: "Skills" },
  { href: "/certifications", label: "Certifications" },
  { href: "/contact", label: "Let's Connect" },
];

// Magnetic hover effect hook
const useMagneticHover = () => {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 150, damping: 15 });
  const springY = useSpring(y, { stiffness: 150, damping: 15 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const distanceX = (e.clientX - centerX) * 0.3;
    const distanceY = (e.clientY - centerY) * 0.3;
    x.set(distanceX);
    y.set(distanceY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return { ref, springX, springY, handleMouseMove, handleMouseLeave };
};

const NavLink = ({
  href,
  label,
  onClick,
}: {
  href: string;
  label: string;
  onClick?: () => void;
}) => {
  const pathname = usePathname();
  const isActive = pathname === href;
  const { navigateWithTransition, isTransitioning } = usePageTransition();
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (isTransitioning || href === pathname) return;
    onClick?.();
    const transitionType =
      href === "/" || pathname === "/" ? "particle" : "glass";
    navigateWithTransition(href, transitionType);
  };

  return (
    <Link
      href={href}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative px-4 py-2 block overflow-hidden"
      aria-current={isActive ? "page" : undefined}
    >
      {/* Original text - slides up on hover */}
      <span className="relative z-10 block overflow-hidden h-[24px]">
        <motion.span
          className={`inline-block text-base font-bold whitespace-nowrap ${
            isActive ? "text-accent" : "text-muted-foreground group-hover:text-accent font-medium transition-colors duration-500"
          }`}
          animate={{
            y: isHovered ? -30 : 0,
            opacity: isHovered ? 0 : 1,
          }}
          transition={{
            duration: 1.0,
            ease: [0.22, 1, 0.36, 1], // Custom slow bezier
          }}
        >
          {label}
        </motion.span>
      </span>

      {/* Clone text - slides in from below on hover */}
      <span className="absolute inset-0 z-10 flex items-center px-4 overflow-hidden pointer-events-none">
        <motion.span
          className="inline-block text-base font-bold text-accent whitespace-nowrap"
          initial={{ y: 30, opacity: 0 }}
          animate={{
            y: isHovered ? 0 : 30,
            opacity: isHovered ? 1 : 0,
          }}
          transition={{
            duration: 1.0,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          {label}
        </motion.span>
      </span>

      {/* Glow effect on hover */}
      <motion.span
        className="absolute inset-0 rounded-lg pointer-events-none"
        animate={{
          boxShadow: isHovered
            ? "0 0 20px hsl(var(--accent) / 0.15), inset 0 0 20px hsl(var(--accent) / 0.05)"
            : "0 0 0px transparent",
        }}
        transition={{ duration: 0.6 }}
      />
    </Link>
  );
};

export const Navbar = () => {
  const { data } = usePortfolioStore();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const logoRef = useRef<HTMLAnchorElement>(null);
  const pathname = usePathname();
  const { navigateWithTransition, isTransitioning } = usePageTransition();

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Generate initials from name (e.g., "Jay Joshi" -> "JJ")
  // Fallback to "JJ" if data is not available yet (ssr)
  const initials = isMounted
    ? data.name
        .split(" ")
        .map((n) => n[0])
        .join("")
    : "JJ";

  // Logo hover animation
  const handleLogoHover = () => {
    if (logoRef.current) {
      gsap.to(logoRef.current, {
        scale: 1.05,
        duration: 0.3,
        ease: "power2.out",
      });
    }
  };

  const handleLogoLeave = () => {
    if (logoRef.current) {
      gsap.to(logoRef.current, {
        scale: 1,
        duration: 0.3,
        ease: "power2.out",
      });
    }
  };

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (isTransitioning || pathname === "/") return;
    navigateWithTransition("/", "particle");
  };

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
          isScrolled ? "py-3" : "py-6"
        }`}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.2 }}
      >
        {/* Glass Background Layer - Only visible when scrolled */}
        <AnimatePresence>
          {isScrolled && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-[-1] glass-navbar shadow-[0_8px_32px_rgba(0,0,0,0.4)] border-b border-white/10 [backdrop-filter:blur(24px)_saturate(200%)_brightness(1.1)]"
            />
          )}
        </AnimatePresence>

        <nav className="container-main flex items-center px-6">
          {/* Left: Logo */}
          <div className="flex-1 flex justify-start">
            <Link
              ref={logoRef}
              href="/"
              onClick={handleLogoClick}
              className="font-display font-bold text-3xl tracking-tight relative z-10"
              aria-label={`${data.name} logo`}
              onMouseEnter={handleLogoHover}
              onMouseLeave={handleLogoLeave}
            >
              <motion.span
                className="relative inline-block"
                whileHover={{ rotate: [0, -5, 5, 0] }}
                transition={{ duration: 0.5 }}
              >
                <span
                  className="gradient-text"
                  style={{ fontFamily: "'Raleway', sans-serif" }}
                >
                  {initials}
                </span>
              </motion.span>
            </Link>
          </div>

          {/* Center: Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link, index) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
              >
                <NavLink href={link.href} label={link.label} />
              </motion.div>
            ))}
          </div>

          {/* Right: Action Button & Mobile Toggle */}
          <div className="flex-1 flex justify-end items-center gap-4">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1, duration: 0.5 }}
              className="hidden md:block"
            >
              <ModernButton
                onClick={() => navigateWithTransition("/contact", "glass")}
                className="px-5 py-2"
                bold
              >
                Hire Me
              </ModernButton>
            </motion.div>

            {/* Mobile Menu Button - Awwwards Style */}
            <motion.button
              className="md:hidden relative z-[10001] flex flex-col items-center justify-center w-12 h-12 rounded-full bg-white/5 border border-white/10 backdrop-blur-md"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            >
              <div className="w-6 h-4 relative">
                <motion.span
                  className="absolute left-0 w-full h-0.5 bg-foreground"
                  animate={{
                    top: isMobileMenuOpen ? "50%" : "0%",
                    rotate: isMobileMenuOpen ? 45 : 0,
                    translateY: isMobileMenuOpen ? -1 : 0,
                  }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                />
                <motion.span
                  className="absolute left-0 top-1/2 w-full h-0.5 bg-foreground -translate-y-1/2"
                  animate={{
                    opacity: isMobileMenuOpen ? 0 : 1,
                    scaleX: isMobileMenuOpen ? 0 : 1,
                  }}
                  transition={{ duration: 0.3 }}
                />
                <motion.span
                  className="absolute left-0 w-full h-0.5 bg-foreground"
                  animate={{
                    bottom: isMobileMenuOpen ? "50%" : "0%",
                    rotate: isMobileMenuOpen ? -45 : 0,
                    translateY: isMobileMenuOpen ? 1 : 0,
                  }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                />
              </div>
            </motion.button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Menu - Awwwards Style Full Screen Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="md:hidden fixed inset-0 z-[9999] bg-background flex flex-col pt-32 px-10"
            initial={{ clipPath: "circle(0% at top right)" }}
            animate={{ clipPath: "circle(150% at top right)" }}
            exit={{ clipPath: "circle(0% at top right)" }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          >
            {/* Grainy background effect */}
            <div
              className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
              }}
            />

            {/* Premium Close Button inside menu */}
            <motion.button
              className="absolute top-8 right-10 flex items-center gap-2 group z-[10002]"
              onClick={() => setIsMobileMenuOpen(false)}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <span className="text-xs uppercase tracking-[0.4em] font-medium text-muted-foreground group-hover:text-accent transition-colors">
                Close
              </span>
              <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-110 group-hover:bg-accent group-active:scale-95 transition-all">
                <X size={20} className="group-hover:text-white" />
              </div>
            </motion.button>

            <div className="flex flex-col gap-4 relative z-10">
              <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-4">
                Navigation
              </p>
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.href}
                  className="relative group"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
                >
                  <span className="absolute -left-8 top-1/2 -translate-y-1/2 text-[10px] font-mono opacity-30 group-hover:opacity-100 transition-opacity">
                    0{index + 1}
                  </span>
                  <Link
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`text-5xl sm:text-6xl font-bold tracking-tight py-2 block ${
                      pathname === link.href
                        ? "gradient-text"
                        : "text-foreground hover:text-accent transition-colors"
                    }`}
                    style={{ fontFamily: "'Raleway', sans-serif" }}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </div>

            <div className="mt-auto pb-10 flex flex-col gap-6 relative z-10">
              <div className="h-[1px] w-full bg-white/10" />
              <div className="flex justify-between items-end">
                <div className="space-y-1">
                  <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                    Get in touch
                  </p>
                  <a
                    href={`mailto:${data.email}`}
                    className="text-sm hover:text-accent transition-colors block"
                  >
                    {data.email}
                  </a>
                </div>
                <div className="flex gap-4">
                  {[
                    { icon: Github, href: data.github, label: "GitHub" },
                    { icon: Linkedin, href: data.linkedin, label: "LinkedIn" },
                    {
                      icon: Instagram,
                      href: data.instagram,
                      label: "Instagram",
                    },
                  ].map((social, i) => {
                    const Icon = social.icon;
                    return (
                      <motion.a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-accent hover:text-white transition-all"
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.8 + i * 0.1 }}
                        whileHover={{ y: -4 }}
                      >
                        <Icon size={18} />
                      </motion.a>
                    );
                  })}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
