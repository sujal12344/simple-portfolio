"use client";
import { motion, useAnimation, useInView } from "framer-motion";
import React, { useState, useRef, useEffect } from "react";
import { PersonalData, ProjectData, Headers } from "@/data/data";
import {
  extractCategories,
  filterProjects,
  getFeaturedProjects,
  clearFilters,
} from "@/lib/projects-utils";
import { CategoryFilter } from "@/components/projects/CategoryFilter";
import { SearchInput } from "@/components/projects/SearchInput";
import { FeaturedProjectCard } from "@/components/projects/FeaturedProjectCard";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { EmptyState } from "@/components/projects/EmptyState";
import { CallToAction } from "@/components/projects/CallToAction";
import { SectionHeader } from "@/components/skills/SectionHeader";

const ProjectsSection = () => {
  const [activeCategory, setActiveCategory] = useState("Other");
  const [searchQuery, setSearchQuery] = useState("");
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.1 });
  const controls = useAnimation();

  // Data processing
  const projectHeader = Headers.find((h) => h.name === "projects")!;
  const categories = extractCategories(ProjectData);
  const filteredProjects = filterProjects(
    ProjectData,
    activeCategory,
    searchQuery
  );
  const featuredProjects = getFeaturedProjects(ProjectData);
  const {
    links: { github },
  } = PersonalData;

  // Animation control
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

  // Event handlers
  const handleClearFilters = () =>
    clearFilters(setActiveCategory, setSearchQuery);

  return (
    <div
      className="relative py-12 overflow-hidden bg-background"
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
        <SectionHeader header={projectHeader} />

        {/* Featured projects */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {featuredProjects.map((project, index) => (
              <FeaturedProjectCard
                key={project.id}
                project={project}
                index={index}
                onHover={setHoveredProject}
              />
            ))}
          </div>
        </motion.div>

        {/* Filter and search controls */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <CategoryFilter
            categories={categories}
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
          />
          <SearchInput
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />
        </div>

        {/* Project grid */}
        {filteredProjects.length > 0 ? (
          <div
            ref={containerRef}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
          >
            {filteredProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                isHovered={hoveredProject === project.id}
                onHover={setHoveredProject}
                controls={controls}
              />
            ))}
          </div>
        ) : (
          <EmptyState onClearFilters={handleClearFilters} />
        )}

        <CallToAction githubUrl={github} />
      </div>
    </div>
  );
};

export default ProjectsSection;
