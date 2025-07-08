"use client";
import { motion, useAnimation, useInView } from "framer-motion";
import React, { useState, useRef, useEffect } from "react";
import { PersonalData, ProjectData, Headers } from "../../../data/data";
import {
  ArrowRight,
  Code,
  ExternalLink,
  Filter,
  Github,
  Search,
  X,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { ProjectType } from "../../../data/data_types";

// TypeScript assertion to ensure proper type for ProjectData
const typedProjectData = ProjectData;

// Extract unique categories from project data
const allCategories = Array.from(
  new Set(
    typedProjectData.flatMap((project) => project.categories || ["Other"])
  )
);

const ProjectsSection = () => {
  const projectHeader = Headers.find((header) => header.name === "projects")!;

  const [activeCategory, setActiveCategory] = useState("Other");
  const [searchQuery, setSearchQuery] = useState("");
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.1 });
  const controls = useAnimation();

  // Filter projects based on category and search query
  const filteredProjects = typedProjectData.filter((project) => {
    const matchesCategory =
      activeCategory === "All" ||
      (activeCategory === "Other" && project.isFeatured === false) ||
      (project.categories && project.categories.includes(activeCategory));

    const matchesSearch =
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  useEffect(() => {
    if (isInView) {
      controls.start((i) => ({
        opacity: 1,
        y: 0,
        transition: {
          delay: i * 0.1,
          duration: 0.5,
          ease: "easeOut",
        },
      }));
    }
  }, [isInView, controls, filteredProjects.length]);

  const featuredProjects = typedProjectData.filter(
    (project) => project.isFeatured
  );

  const {
    links: { github },
  } = PersonalData;

  return (
    <div
      className="relative py-10 overflow-hidden bg-background"
      id={projectHeader.name}
    >
      {/* Background elements */}
      <div className="absolute top-20 left-0 opacity-5 text-2xl min-[500px]:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-mono">
        {projectHeader.background}
      </div>
      <div className="absolute bottom-20 right-0 opacity-5 text-2xl min-[500px]:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-mono">
        {projectHeader.backgroundClosing}
      </div>
      {/* <div className="absolute inset-0 bg-grid-small-white/[0.025] -z-10" /> */}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-12 flex flex-col items-center"
        >
          <div className="flex items-center gap-2 mb-3">
            <div className="h-px w-5 bg-primary" />
            <motion.span
              whileHover={{
                scale: 1.05,
                backgroundColor: "rgba(38, 54, 179, 0.15)",
              }}
              className="text-primary font-mono text-sm px-3 py-1 rounded-full bg-primary/10 border border-primary/20"
            >
              {projectHeader.number}.{" "}
              <span className="text-foreground">{projectHeader.title}</span>
            </motion.span>
            <div className="h-px w-5 bg-primary" />
          </div>

          <motion.h1
            initial={{ y: 20 }}
            whileInView={{ y: 0 }}
            transition={{ duration: 0.7, type: "spring" }}
            viewport={{ once: true }}
            className="text-xl sm:text-2xl md:text-3xl font-bold text-center mb-2 sm:mb-4 tracking-tight"
          >
            {projectHeader.subtitle}
          </motion.h1>

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-muted-foreground text-center max-w-2xl mx-auto text-lg"
          >
            {projectHeader.description}
          </motion.p>
        </motion.div>

        {/* Featured projects (spotlight) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {featuredProjects.map(
              (
                project: ProjectType,
                index: number
              ) => (
                <motion.div
                  key={project.id}
                  className="group relative h-[300px] overflow-hidden rounded-lg border border-primary/10 bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg cursor-pointer"
                  whileHover={{ scale: 1.02 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  onHoverStart={() => setHoveredProject(project.id)}
                  onHoverEnd={() => setHoveredProject(null)}
                  onClick={() => {
                    window.open(project.websiteUrl, "_blank");
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/60 to-black/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />

                  <Image
                    src={project.ImageUrl || "/placeholder-project.jpg"}
                    alt={project.title}
                    fill
                    className="object-cover transition-all duration-500 group-hover:scale-105"
                    quality={90}
                  />

                  <div className="absolute inset-0 flex flex-col justify-end p-5 z-20">
                    <div className="transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                      <div className="text-xs font-mono text-primary/80 mb-1">
                        Featured Project
                      </div>
                      <h3 className="text-xl font-bold text-white mb-2">
                        {project.title}
                      </h3>
                      <p className="text-sm text-white/80 line-clamp-2 mb-3">
                        {project.description}
                      </p>
                      <div className="flex space-x-2">
                        {project.github && (
                          <Link
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors duration-200"
                          >
                            <Github className="h-4 w-4" />
                          </Link>
                        )}
                        {project.websiteUrl && (
                          <Link
                            href={project.websiteUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors duration-200"
                          >
                            <ExternalLink className="h-4 w-4" />
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )
            )}
          </div>
        </motion.div>

        {/* Filter and search controls */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div className="flex items-center space-x-2">
            <Filter className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium">Filter by:</span>
            <div className="flex flex-wrap gap-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveCategory("All")}
                className={`px-3 py-1 text-xs rounded-full transition-colors ${
                  activeCategory === "All"
                    ? "bg-primary text-white"
                    : "bg-secondary/50 text-muted-foreground hover:bg-secondary"
                }`}
              >
                All
              </motion.button>

              {allCategories.map((category: string) => (
                <motion.button
                  key={category}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveCategory(category)}
                  className={`px-3 py-1 text-xs rounded-full transition-colors ${
                    activeCategory === category
                      ? "bg-primary text-white"
                      : "bg-secondary/50 text-muted-foreground hover:bg-secondary"
                  }`}
                >
                  {category}
                </motion.button>
              ))}
            </div>
          </div>

          <div className="relative w-full sm:w-64">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-muted-foreground" />
            </div>
            <input
              type="text"
              className="bg-secondary/30 border border-primary/10 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full pl-10 pr-10 py-2"
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setSearchQuery("")}
                aria-label="Clear search"
              >
                <X className="h-4 w-4 text-muted-foreground hover:text-foreground" />
              </button>
            )}
          </div>
        </div>

        {/* Project grid */}
        {filteredProjects.length > 0 ? (
          <div
            ref={containerRef}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
          >
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                custom={index}
                initial={{ opacity: 0, y: 20 }}
                animate={controls}
                whileHover={{
                  y: -5,
                  boxShadow: "0 10px 30px -15px rgba(var(--primary-rgb), 0.15)",
                }}
                onHoverStart={() => setHoveredProject(project.id)}
                onHoverEnd={() => setHoveredProject(null)}
                className="bg-card border border-primary/10 rounded-lg overflow-hidden shadow-md transition-all duration-300 cursor-pointer"
                onClick={() => {
                  window.open(project.websiteUrl, "_blank");
                }}
                onMouseEnter={() => setHoveredProject(project.id)}
                onMouseLeave={() => setHoveredProject(null)}
              >
                {/* Project card image */}
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={project.ImageUrl || "/placeholder-project.jpg"}
                    alt={project.title}
                    fill
                    className={`object-cover transition-all duration-500 ${
                      hoveredProject === project.id ? "scale-105" : "scale-100"
                    }`}
                  />
                  <div
                    className={`absolute inset-0 bg-gradient-to-t from-black/60 to-transparent`}
                  />

                  {/* Category tags */}
                  <div className="absolute top-3 left-3 flex flex-wrap gap-2">
                    {project.categories?.map((category: string) => (
                      <span
                        key={category}
                        className="text-xs font-medium px-2 py-1 bg-black/50 text-white rounded-full backdrop-blur-sm"
                      >
                        {category}
                      </span>
                    ))}
                  </div>

                  {/* Project links */}
                  <div className="absolute top-3 right-3 flex space-x-2">
                    {project.github && (
                      <Link
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors backdrop-blur-sm"
                      >
                        <Github className="h-4 w-4" />
                      </Link>
                    )}
                    {project.websiteUrl && (
                      <Link
                        href={project.websiteUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors backdrop-blur-sm"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </Link>
                    )}
                  </div>
                </div>

                {/* Project content */}
                <div className="p-5">
                  <h3 className="text-xl font-bold mb-2 line-clamp-1">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                    {project.description}
                  </p>

                  {/* Tech stack */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {project.technologies?.map((tech: string, i: number) => (
                      <span
                        key={i}
                        className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* View details button */}
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="w-full mt-2 py-2 text-center text-sm font-medium rounded-md border border-primary/20 bg-primary/5 text-primary hover:bg-primary/10 transition-colors flex items-center justify-center gap-1"
                  >
                    <span>View Details</span>
                    <ArrowRight className="h-3 w-3" />
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 border border-dashed border-primary/20 rounded-lg bg-secondary/20">
            <div className="flex flex-col items-center justify-center space-y-3">
              <div className="p-3 bg-primary/10 rounded-full">
                <Search className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-medium">No projects found</h3>
              <p className="text-muted-foreground text-sm max-w-md">
                No projects match your current filters. Try adjusting your
                search or category selection.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setActiveCategory("All");
                  setSearchQuery("");
                }}
                className="mt-3 px-4 py-2 text-sm bg-primary text-white rounded-md"
              >
                Clear Filters
              </motion.button>
            </div>
          </div>
        )}

        {/* Call to action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-16"
        >
          <p className="text-muted-foreground mb-4">
            Interested in collaborating or want to see more?
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <motion.a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 bg-primary/10 hover:bg-primary/20 text-primary px-5 py-2.5 rounded-full transition-all duration-300 cursor-pointer font-medium"
            >
              <Github className="h-4 w-4" />
              <span>See More on GitHub</span>
            </motion.a>

            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-full transition-all duration-300 cursor-pointer font-medium"
            >
              <span>Contact Me</span>
              <ArrowRight className="h-4 w-4" />
            </motion.a>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProjectsSection;
