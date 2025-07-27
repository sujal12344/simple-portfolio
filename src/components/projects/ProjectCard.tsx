import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
// import { MoveRight } from "lucide-react";
import { ProjectType } from "@/data/data_types";
import { ProjectLinks } from "./ProjectLinks";
import { TechStack } from "./TechStack";
import {
  cardVariants,
  getImageSrc,
  openInNewTab,
} from "@/lib/projects-utils";

interface ProjectCardProps {
  project: ProjectType;
  index: number;
  isHovered: boolean;
  onHover: (id: number | null) => void;
  controls: any;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  index,
  isHovered,
  onHover,
  controls,
}) => {
  return (
    <motion.div
      custom={index}
      initial="hidden"
      animate={controls}
      variants={cardVariants}
      whileHover={{
        y: -5,
        boxShadow: "0 10px 30px -15px rgba(var(--primary-rgb), 0.15)",
      }}
      onHoverStart={() => onHover(project.id)}
      onHoverEnd={() => onHover(null)}
      className="bg-card border border-primary/10 rounded-lg overflow-hidden shadow-md transition-all duration-300 cursor-pointer"
      onClick={() => openInNewTab(project.websiteUrl)}
    >
      {/* Project image */}
      <div className="relative h-48 overflow-hidden">
        <Image
          src={getImageSrc(project.ImageUrl)}
          alt={project.title}
          fill
          className={`object-cover transition-all duration-500 ${
            isHovered ? "scale-105" : "scale-100"
          }`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

        {/* Category tags */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-2">
          <TechStack technologies={project.categories} variant="badge" />
        </div>

        {/* Project links */}
        <div className="absolute top-3 right-3">
          <ProjectLinks
            github={project.github}
            websiteUrl={project.websiteUrl}
            variant="overlay"
          />
        </div>
      </div>

      {/* Project content */}
      <div className="p-5">
        <h3 className="text-xl font-bold mb-2 line-clamp-1">{project.title}</h3>
        <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
          {project.description}
        </p>

        {/* Tech stack */}
        <div className="mb-4">
          <TechStack technologies={project.technologies} variant="tag" />
        </div>

        {/* View details button */}
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="w-full mt-2 py-2 text-center text-sm font-medium rounded-md border border-primary/20 bg-primary/5 text-primary group group-hover:bg-primary/10 transition-colors flex items-center justify-center gap-1"
          onClick={(e) => {
            e.stopPropagation();
            openInNewTab(project.github);
          }}
        >
          <span>View Details</span>
          {/* <MoveRight className="h-3 w-3 group-hover:animate-bounce" /> */}
        </motion.button>
      </div>
    </motion.div>
  );
};
