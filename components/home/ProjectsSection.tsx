"use client";

import { motion } from "framer-motion";
import { useReveal } from "@/hooks/useReveal";
import { usePortfolioStore } from "@/store/portfolioStore";
import { ExternalLink, Github, ArrowRight } from "lucide-react";
import Link from "next/link";

export const ProjectsSection = () => {
  const { ref, isRevealed } = useReveal();
  const { data } = usePortfolioStore();

  // Show only first 3 projects on homepage
  const featuredProjects = data.projects.slice(0, 3);

  return (
    <section ref={ref} className="section-padding" id="projects">
      <div className="container-main">
        {/* Section header */}
        <div
          className={`text-center mb-16 reveal ${isRevealed ? "revealed" : ""}`}
        >
          <span className="inline-block text-sm font-medium text-muted-foreground uppercase tracking-widest mb-4">
            Projects
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            This <span className="gradient-text">proves</span> everything
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Real projects that showcase my skills in action
          </p>
        </div>

        {/* Projects grid */}
        <div className="grid gap-8 md:gap-10">
          {featuredProjects.map((project, index) => (
            <motion.article
              key={project.id}
              className={`project-card p-6 md:p-8 reveal ${
                isRevealed ? "revealed" : ""
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
              initial={{ opacity: 0, y: 40 }}
              animate={isRevealed ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: index * 0.15 }}
            >
              <div className="flex flex-col md:flex-row md:items-start gap-6">
                {/* Content */}
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-xl md:text-2xl font-bold mb-3">
                    {project.title}
                  </h3>

                  <p className="text-muted-foreground leading-relaxed mb-4">
                    {project.description.length > 200
                      ? project.description.slice(0, 200) + "..."
                      : project.description}
                  </p>

                  {/* Tech stack */}
                  <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-4">
                    {project.technologies.slice(0, 6).map((tech) => (
                      <span
                        key={tech}
                        className="text-xs px-2 py-1 rounded-md bg-muted/50 text-muted-foreground"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="flex justify-center md:justify-start gap-3">
                    {project.liveUrl && project.liveUrl !== "#" && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-sm font-medium text-blue-500 hover:text-blue-600 transition-colors"
                      >
                        <ExternalLink className="w-4 h-4" />
                        Live Demo
                      </a>
                    )}
                    {project.githubUrl && project.githubUrl !== "#" && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                      >
                        <Github className="w-4 h-4" />
                        GitHub
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* View all projects */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          animate={isRevealed ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-lg font-medium text-blue-500 hover:text-blue-600 transition-colors"
          >
            View All Projects
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};
