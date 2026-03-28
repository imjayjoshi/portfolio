"use client";

import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Layout } from "@/components/layout/Layout";
import { PageTransition } from "@/components/layout/PageTransition";
import { ModernButton } from "@/components/ui/ModernButton";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  return (
    <Layout>
      <PageTransition>
        <section className="min-h-screen flex items-center justify-center">
          <div className="text-center px-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="font-display text-9xl font-bold gradient-text mb-4">
                404
              </h1>
              <h2 className="font-display text-2xl font-semibold mb-4">
                Page Not Found
              </h2>
              <p className="text-muted-foreground mb-10 max-w-md mx-auto">
                The page you're looking for doesn't exist or has been moved.
              </p>
              <ModernButton
                onClick={() => router.push("/")}
                className="inline-flex items-center gap-2"
              >
                Back to Home
              </ModernButton>
            </motion.div>
          </div>
        </section>
      </PageTransition>
    </Layout>
  );
}
