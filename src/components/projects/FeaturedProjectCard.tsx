import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { ProjectType } from "@/data/data_types";
import { ProjectLinks } from "./ProjectLinks";
import {
  featuredCardVariants,
  getImageSrc,
  openInNewTab,
  PROJECTS_CONSTANTS,
} from "@/lib/projects-utils";

interface FeaturedProjectCardProps {
  project: ProjectType;
  index: number;
  onHover: (id: number | null) => void;
}

export const FeaturedProjectCard: React.FC<FeaturedProjectCardProps> = ({
  project,
  index,
  onHover,
}) => {
  return (
    <motion.div
      className="group relative h-[300px] overflow-hidden rounded-lg border border-primary/10 bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg cursor-pointer"
      whileHover={{ scale: PROJECTS_CONSTANTS.ANIMATIONS.FEATURED_SCALE }}
      custom={index}
      initial="hidden"
      animate="visible"
      variants={featuredCardVariants}
      onHoverStart={() => onHover(project.id)}
      onHoverEnd={() => onHover(null)}
      onClick={() => openInNewTab(project.websiteUrl)}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/60 to-black/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />

      <Image
        src={getImageSrc(project.ImageUrl)}
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
          <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
          <p className="text-sm text-white/80 line-clamp-2 mb-3">
            {project.description}
          </p>
          <ProjectLinks
            github={project.github}
            websiteUrl={project.websiteUrl}
            variant="card"
          />
        </div>
      </div>
    </motion.div>
  );
};
