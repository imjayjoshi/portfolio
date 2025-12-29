"use client";

import { useState, useEffect, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { usePageTransition } from "@/components/transitions";
import { usePortfolioStore } from "@/store/portfolioStore";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/experience", label: "Experience" },
  { href: "/projects", label: "Projects" },
  { href: "/skills", label: "Skills" },
  { href: "/certifications", label: "Certifications" },
  { href: "/contact", label: "Contact" },
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
  const linkRef = useRef<HTMLAnchorElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const bgRef = useRef<HTMLSpanElement>(null);
  const { ref, springX, springY, handleMouseMove, handleMouseLeave } =
    useMagneticHover();
  const { navigateWithTransition, isTransitioning } = usePageTransition();

  const handleHoverEnter = () => {
    if (bgRef.current && textRef.current) {
      gsap.to(bgRef.current, {
        scaleX: 1,
        scaleY: 1,
        opacity: 1,
        duration: 0.4,
        ease: "power3.out",
      });
      gsap.to(textRef.current, {
        y: -2,
        duration: 0.3,
        ease: "power2.out",
      });
    }
  };

  const handleHoverLeave = () => {
    handleMouseLeave();
    if (bgRef.current && textRef.current) {
      gsap.to(bgRef.current, {
        scaleX: 0.8,
        scaleY: 0.8,
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
      });
      gsap.to(textRef.current, {
        y: 0,
        duration: 0.2,
        ease: "power2.out",
      });
    }
  };

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    if (isTransitioning || href === pathname) return;

    onClick?.();

    // Determine transition type: particle for home, glass for others
    const transitionType =
      href === "/" || pathname === "/" ? "particle" : "glass";
    navigateWithTransition(href, transitionType);
  };

  return (
    <motion.div
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleHoverLeave}
      onMouseEnter={handleHoverEnter}
    >
      <Link
        ref={(el) => {
          (ref as React.MutableRefObject<HTMLAnchorElement | null>).current =
            el;
          (
            linkRef as React.MutableRefObject<HTMLAnchorElement | null>
          ).current = el;
        }}
        href={href}
        onClick={handleClick}
        className="nav-link-modern group relative px-5 py-2.5 block"
        aria-current={isActive ? "page" : undefined}
      >
        {/* Morphing background blob */}
        <span
          ref={bgRef}
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{
            background:
              "linear-gradient(135deg, hsl(var(--accent) / 0.15) 0%, hsl(var(--accent) / 0.08) 100%)",
            transform: "scale(0.8)",
            opacity: 0,
          }}
        />

        {/* Bottom line that grows on hover */}
        <motion.span
          className="absolute bottom-1 left-1/2 h-[2px] rounded-full"
          style={{
            background:
              "linear-gradient(90deg, transparent, hsl(var(--accent)), transparent)",
          }}
          initial={{ width: isActive ? "50%" : "0%", x: "-50%" }}
          whileHover={{ width: "70%" }}
          animate={{ width: isActive ? "50%" : "0%", x: "-50%" }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
        />

        {/* Text */}
        <span
          ref={textRef}
          className={`relative z-10 text-sm font-medium inline-block transition-colors duration-300 ${
            isActive
              ? "text-accent"
              : "text-muted-foreground group-hover:text-foreground"
          }`}
        >
          {label}
        </span>

        {/* Active indicator dot */}
        <AnimatePresence>
          {isActive && (
            <motion.span
              className="absolute -bottom-0.5 left-1/2 w-1 h-1 rounded-full bg-accent"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              style={{
                x: "-50%",
                boxShadow:
                  "0 0 10px hsl(var(--accent)), 0 0 20px hsl(var(--accent) / 0.5)",
              }}
            />
          )}
        </AnimatePresence>
      </Link>
    </motion.div>
  );
};

export const Navbar = () => {
  const { data } = usePortfolioStore();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const logoRef = useRef<HTMLAnchorElement>(null);
  const pathname = usePathname();
  const { navigateWithTransition, isTransitioning } = usePageTransition();

  // Generate initials from name (e.g., "Jay Joshi" -> "JJ")
  const initials = data.name
    .split(" ")
    .map((n) => n[0])
    .join("");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "glass-navbar py-2 shadow-lg"
            : "bg-background/50 backdrop-blur-sm py-4"
        }`}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.2 }}
      >
        <nav className="container-main flex items-center justify-between px-6">
          {/* Logo */}
          <Link
            ref={logoRef}
            href="/"
            onClick={handleLogoClick}
            className="font-display font-bold text-2xl tracking-tight relative overflow-hidden"
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

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
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

          {/* Mobile Menu Button */}
          <motion.button
            className="md:hidden p-2 text-foreground hover:text-accent transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-lg relative overflow-hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileMenuOpen}
            whileTap={{ scale: 0.95 }}
          >
            <AnimatePresence mode="wait">
              {isMobileMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X size={24} />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu size={24} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </nav>
      </motion.header>

      {/* Mobile Menu - Full Screen Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="md:hidden fixed inset-0 z-[9999] bg-background/95 backdrop-blur-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Close button */}
            <button
              className="absolute top-6 right-6 p-3 text-foreground hover:text-accent transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-lg bg-background/50 backdrop-blur-sm border border-border/30 z-50"
              onClick={() => setIsMobileMenuOpen(false)}
              aria-label="Close menu"
              type="button"
            >
              <X size={28} />
            </button>

            {/* Menu links */}
            <div className="flex flex-col items-center justify-center h-full gap-8 py-20">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{
                    delay: index * 0.08,
                    duration: 0.4,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`text-4xl sm:text-5xl font-bold tracking-tight transition-colors duration-300 ${
                      pathname === link.href
                        ? "text-accent"
                        : "text-foreground hover:text-accent"
                    }`}
                    style={{ fontFamily: "'Raleway', sans-serif" }}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
