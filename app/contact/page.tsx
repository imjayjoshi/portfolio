"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Send,
  Mail,
  Linkedin,
  Github,
  MessageCircle,
  ArrowUpRight,
  Phone,
} from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { PageTransition } from "@/components/layout/PageTransition";
import { usePortfolioStore } from "@/store/portfolioStore";
import { useToast } from "@/hooks/use-toast";
import { useReveal } from "@/hooks/useReveal";
import { z } from "zod";
import gsap from "gsap";

const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Name is required")
    .max(100, "Name must be less than 100 characters"),
  email: z
    .string()
    .trim()
    .email("Invalid email address")
    .max(255, "Email must be less than 255 characters"),
  phone: z
    .string()
    .trim()
    .optional()
    .refine(
      (val) => !val || /^[\d\s\+\-\(\)]{7,20}$/.test(val),
      "Invalid phone number"
    ),
  message: z
    .string()
    .trim()
    .min(1, "Message is required")
    .max(1000, "Message must be less than 1000 characters"),
  honeypot: z.string().max(0),
});

export default function ContactPage() {
  const { data } = usePortfolioStore();
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);
  const { ref: headerRef, isRevealed: headerRevealed } = useReveal();
  const { ref: contentRef, isRevealed: contentRevealed } = useReveal();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    honeypot: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (contentRevealed && formRef.current) {
      const inputs = formRef.current.querySelectorAll(".form-field");
      gsap.fromTo(
        inputs,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: "power3.out" }
      );
    }
  }, [contentRevealed]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});

    try {
      contactSchema.parse(formData);

      // Send email via Web3Forms
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          access_key:
            data.contactFormAccessKey || "225ba732-ab8b-4556-b146-cec8b349078d",
          name: formData.name,
          email: formData.email,
          phone: formData.phone || "Not provided",
          message: formData.message,
          subject: `New Contact Form Submission from ${formData.name}`,
          from_name: "Portfolio Contact Form",
        }),
      });

      const result = await response.json();

      if (result.success) {
        toast({
          title: "Message sent!",
          description: "Thanks for reaching out. I'll get back to you soon.",
        });

        setFormData({
          name: "",
          email: "",
          phone: "",
          message: "",
          honeypot: "",
        });
      } else {
        throw new Error(result.message || "Failed to send message");
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            fieldErrors[err.path[0] as string] = err.message;
          }
        });
        setErrors(fieldErrors);
      } else {
        toast({
          title: "Error",
          description: "Something went wrong. Please try again.",
          variant: "destructive",
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const socialLinks = [
    {
      icon: Mail,
      label: "Email",
      href: `mailto:${data.email}`,
      value: data.email,
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      href: data.linkedin,
      value: "Connect on LinkedIn",
    },
    { icon: Github, label: "GitHub", href: data.github, value: "View GitHub" },
  ];

  return (
    <Layout>
      <PageTransition>
        <section className="section-padding min-h-screen relative overflow-hidden">
          {/* Background glow */}
          <div
            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full opacity-20 blur-[120px] pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse, hsl(195 100% 50% / 0.15) 0%, transparent 60%)",
            }}
          />

          <div className="container-main relative z-10">
            {/* Header */}
            <div
              ref={headerRef}
              className={`text-center md:text-left reveal ${
                headerRevealed ? "revealed" : ""
              }`}
            >
              <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
                <MessageCircle size={28} className="text-accent" />
                <h1 className="font-display text-4xl md:text-6xl font-bold">
                  Let's <span className="gradient-text">Connect</span>
                </h1>
              </div>
              <p className="text-muted-foreground mb-16 max-w-2xl mx-auto md:mx-0 text-lg">
                Have a project in mind or want to collaborate? I'd love to hear
                from you.
              </p>
            </div>

            <div ref={contentRef} className="grid lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <motion.form
                ref={formRef}
                onSubmit={handleSubmit}
                className={`space-y-6 reveal ${
                  contentRevealed ? "revealed" : ""
                }`}
              >
                {/* Honeypot */}
                <input
                  type="text"
                  name="honeypot"
                  value={formData.honeypot}
                  onChange={handleChange}
                  className="hidden"
                  tabIndex={-1}
                  autoComplete="off"
                />

                <div className="form-field">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium mb-2 text-foreground/80"
                  >
                    Name
                  </label>
                  <motion.input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full px-5 py-4 glass-card rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all ${
                      errors.name ? "border-destructive" : ""
                    }`}
                    placeholder="Your name"
                    whileFocus={{ scale: 1.01 }}
                  />
                  {errors.name && (
                    <p className="text-destructive text-sm mt-2">
                      {errors.name}
                    </p>
                  )}
                </div>

                <div className="form-field">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium mb-2 text-foreground/80"
                  >
                    Email
                  </label>
                  <motion.input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-5 py-4 glass-card rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all ${
                      errors.email ? "border-destructive" : ""
                    }`}
                    placeholder="your@email.com"
                    whileFocus={{ scale: 1.01 }}
                  />
                  {errors.email && (
                    <p className="text-destructive text-sm mt-2">
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* Phone field */}
                <div className="form-field">
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium mb-2 text-foreground/80"
                  >
                    Phone{" "}
                    <span className="text-muted-foreground">(optional)</span>
                  </label>
                  <motion.input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`w-full px-5 py-4 glass-card rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all ${
                      errors.phone ? "border-destructive" : ""
                    }`}
                    placeholder="+91 1234567890"
                    whileFocus={{ scale: 1.01 }}
                  />
                  {errors.phone && (
                    <p className="text-destructive text-sm mt-2">
                      {errors.phone}
                    </p>
                  )}
                </div>

                <div className="form-field">
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium mb-2 text-foreground/80"
                  >
                    Message
                  </label>
                  <motion.textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    className={`w-full px-5 py-4 glass-card rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all resize-none ${
                      errors.message ? "border-destructive" : ""
                    }`}
                    placeholder="Tell me about your project..."
                    whileFocus={{ scale: 1.01 }}
                  />
                  {errors.message && (
                    <p className="text-destructive text-sm mt-2">
                      {errors.message}
                    </p>
                  )}
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-accent w-full disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-background/30 border-t-background rounded-full animate-spin" />
                      Sending...
                    </span>
                  ) : (
                    <>
                      <Send size={16} className="mr-2" />
                      Send Message
                    </>
                  )}
                </button>
              </motion.form>

              {/* Contact Info */}
              <div
                className={`space-y-6 reveal ${
                  contentRevealed ? "revealed" : ""
                }`}
                style={{ transitionDelay: "200ms" }}
              >
                <div className="glass-card rounded-2xl p-6">
                  <h3 className="font-display font-semibold text-lg mb-6">
                    Get in touch
                  </h3>
                  <div className="space-y-4">
                    {socialLinks.map((link, index) => (
                      <motion.a
                        key={link.label}
                        href={link.href}
                        target={
                          link.href.startsWith("http") ? "_blank" : undefined
                        }
                        rel={
                          link.href.startsWith("http")
                            ? "noopener noreferrer"
                            : undefined
                        }
                        className="flex items-center justify-between p-4 rounded-xl bg-secondary/30 hover:bg-accent/10 border border-border/50 hover:border-accent/30 transition-all group relative overflow-hidden"
                        initial={{ opacity: 0, x: -20 }}
                        animate={contentRevealed ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: 0.3 + index * 0.1 }}
                        whileHover={{ scale: 1.02 }}
                      >
                        {/* Wave fill on hover */}
                        <span className="absolute inset-0 bg-accent/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />

                        <div className="flex items-center gap-4 relative">
                          <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                            <link.icon size={20} className="text-accent" />
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">
                              {link.label}
                            </p>
                            <p className="text-foreground font-medium">
                              {link.value}
                            </p>
                          </div>
                        </div>
                        <ArrowUpRight
                          size={18}
                          className="text-muted-foreground group-hover:text-accent group-hover:scale-x-125 transition-all duration-300 relative flex-shrink-0"
                        />
                      </motion.a>
                    ))}
                  </div>
                </div>

                <motion.div
                  className="glass-card rounded-2xl p-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={contentRevealed ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.5 }}
                >
                  <h3 className="font-display font-semibold text-lg mb-3">
                    Let's build something amazing
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    I'm always open to discussing new projects, creative ideas,
                    or opportunities to be part of your vision. Whether it's a
                    full-stack application, AI integration, or anything in
                    between — let's make it happen!
                  </p>
                </motion.div>
              </div>
            </div>
          </div>
        </section>
      </PageTransition>
    </Layout>
  );
}
