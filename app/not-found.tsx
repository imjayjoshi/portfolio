"use client";

import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Layout } from "@/components/layout/Layout";
import { PageTransition } from "@/components/layout/PageTransition";

export default function NotFound() {
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
              <h1 className="font-display text-8xl font-bold gradient-text mb-4">
                404
              </h1>
              <h2 className="font-display text-2xl font-semibold mb-4">
                Page Not Found
              </h2>
              <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                The page you're looking for doesn't exist or has been moved.
              </p>
              <Link
                href="/"
                className="btn-accent inline-flex items-center gap-2"
              >
                <ArrowLeft size={16} />
                Back to Home
              </Link>
            </motion.div>
          </div>
        </section>
      </PageTransition>
    </Layout>
  );
}
