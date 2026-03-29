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
import { ScrollBackground } from "@/components/transitions/ScrollBackground";
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

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    honeypot: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

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

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key:
            data.contactFormAccessKey || "225ba732-ab8b-4556-b146-cec8b349078d",
          ...formData,
          subject: `New Contact Form Submission from ${formData.name}`,
        }),
      });

      const result = await response.json();

      if (result.success) {
        toast({
          title: "Message sent!",
          description: "I'll get back to you soon.",
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
          if (err.path[0]) fieldErrors[err.path[0] as string] = err.message;
        });
        setErrors(fieldErrors);
      } else {
        toast({
          title: "Error",
          description: "Something went wrong.",
          variant: "destructive",
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const titleWords = "Let's Connect".split(" ");

  return (
    <Layout showBackground={false}>
      <PageTransition>
        <section className="section-padding min-h-screen relative overflow-hidden bg-[#050505]">
          {/* Subtle Ambient Glows */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />

          <div className="container-main relative z-10 px-4 sm:px-6">
            <div className="max-w-5xl mx-auto">
              {/* Header with staggered letters */}
              <div className="mb-12 md:mb-20">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 text-accent mb-4 font-medium tracking-[0.2em] uppercase text-xs sm:text-sm"
                >
                  <MessageCircle size={16} />
                  <span>HIRE ME</span>
                </motion.div>

                <h1 className="text-5xl sm:text-6xl md:text-8xl font-bold tracking-tighter mb-6 overflow-hidden flex flex-wrap gap-x-4">
                  {titleWords.map((word, i) => (
                    <motion.span
                      key={i}
                      initial={{ y: "100%" }}
                      animate={{ y: 0 }}
                      transition={{
                        duration: 0.8,
                        delay: i * 0.1,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      className="inline-block"
                    >
                      {word === "Connect" ? (
                        <span className="gradient-text">{word}</span>
                      ) : (
                        word
                      )}
                    </motion.span>
                  ))}
                </h1>

                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="text-muted-foreground text-base sm:text-lg md:text-xl max-w-2xl leading-relaxed"
                >
                  Have a vision you want to bring to life? Let's collaborate and
                  build something extraordinary together.
                </motion.p>
              </div>

              <div className="grid lg:grid-cols-5 gap-12 md:gap-20">
                {/* Form Side */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 }}
                  className="lg:col-span-3"
                >
                  <form
                    onSubmit={handleSubmit}
                    className="space-y-6 sm:space-y-8"
                  >
                    <div className="grid sm:grid-cols-2 gap-6 sm:gap-8">
                      <div className="relative group">
                        <label className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-2 block font-bold">
                          Your Name
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          className="w-full bg-transparent border-b border-border/50 py-3 focus:border-accent outline-none transition-colors text-lg"
                          placeholder="John Doe"
                        />
                        {errors.name && (
                          <span className="text-destructive text-[10px] mt-1 block">
                            {errors.name}
                          </span>
                        )}
                      </div>

                      <div className="relative group">
                        <label className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-2 block font-bold">
                          Email Address
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full bg-transparent border-b border-border/50 py-3 focus:border-accent outline-none transition-colors text-lg"
                          placeholder="hello@example.com"
                        />
                        {errors.email && (
                          <span className="text-destructive text-[10px] mt-1 block">
                            {errors.email}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="relative group">
                      <label className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-2 block font-bold">
                        Message
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={4}
                        className="w-full bg-transparent border-b border-border/50 py-3 focus:border-accent outline-none transition-colors text-lg resize-none"
                        placeholder="Tell me about your project or just say hi..."
                      />
                      {errors.message && (
                        <span className="text-destructive text-[10px] mt-1 block">
                          {errors.message}
                        </span>
                      )}
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      disabled={isSubmitting}
                      className="group relative inline-flex items-center gap-3 bg-accent text-background px-8 sm:px-10 py-4 sm:py-5 rounded-full font-bold text-sm sm:text-base transition-all hover:shadow-[0_0_30px_rgba(var(--accent-rgb),0.3)] disabled:opacity-50"
                    >
                      <span>
                        {isSubmitting ? "Sending..." : "Submit Inquiry"}
                      </span>
                      <ArrowUpRight
                        size={18}
                        className="group-hover:rotate-45 transition-transform"
                      />
                    </motion.button>
                  </form>
                </motion.div>

                {/* Info Side */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 }}
                  className="lg:col-span-2 space-y-12 sm:space-y-16"
                >
                  <div className="space-y-6">
                    <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold text-accent">
                      Contact Details
                    </h4>
                    <div className="space-y-4">
                      <a
                        href={`mailto:${data.email}`}
                        className="block text-xl sm:text-2xl hover:text-accent transition-colors font-display break-all"
                      >
                        {data.email}
                      </a>
                      <a
                        href={`tel:${data.phone}`}
                        className="block text-xl sm:text-2xl hover:text-accent transition-colors font-display"
                      >
                        {data.phone}
                      </a>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold text-accent">
                      Socials
                    </h4>
                    <div className="flex flex-wrap gap-x-8 gap-y-4">
                      {[
                        { label: "LinkedIn", href: data.linkedin },
                        { label: "Github", href: data.github },
                        { label: "Instagram", href: data.instagram },
                      ].map((item) => (
                        <a
                          key={item.label}
                          href={item.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-base sm:text-lg hover:text-accent transition-colors underline-offset-8 hover:underline"
                        >
                          {item.label}
                        </a>
                      ))}
                    </div>
                  </div>

                  <div className="p-6 sm:p-8 rounded-3xl bg-white/[0.02] border border-white/5 backdrop-blur-sm">
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed italic">
                      "I'm always open to discussing new projects, creative
                      ideas or opportunities to be part of your visions."
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>
      </PageTransition>
    </Layout>
  );
}
