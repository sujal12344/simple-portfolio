"use client";
import { motion } from "framer-motion";
import { TechStackItem } from "@/data/data_types";

interface TechStackProps extends TechStackItem {
  delay?: number;
}

export const TechStack = ({ name, items, delay = 0.9 }: TechStackProps) => {
  const handleTechClick = (tech: string) => {
    window.open(`https://www.google.com/search?q=${tech}`, "_blank");
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay, duration: 0.5 }}
      className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 mt-2"
    >
      <p className="text-base sm:text-lg text-muted-foreground underline font-medium underline-offset-8">
        {name}
      </p>
      <div className="flex flex-wrap gap-1.5">
        {items.map((tech, i) => (
          <motion.span
            key={tech}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: delay + 0.1 + i * 0.1, duration: 0.3 }}
            className="px-2 py-1 rounded-md bg-secondary text-sm font-medium hover:bg-primary/10 transition-colors duration-200 cursor-pointer"
            onClick={() => handleTechClick(tech)}
          >
            {tech}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
};
