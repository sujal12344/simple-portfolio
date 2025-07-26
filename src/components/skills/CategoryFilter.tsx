import React from "react";
import { motion } from "framer-motion";
import { FILTER_OPTIONS } from "@/lib/skills-utils";

interface CategoryFilterProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  activeCategory,
  onCategoryChange,
}) => {
  return (
    <div className="flex justify-center mb-6 sm:mb-20 flex-wrap gap-2 sm:gap-4">
      {FILTER_OPTIONS.map(({ key, label }) => (
        <motion.button
          key={key}
          className={`px-2.5 sm:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all ${
            activeCategory === key
              ? "bg-primary text-white shadow-lg"
              : "bg-secondary/50 text-muted-foreground hover:bg-secondary"
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onCategoryChange(key)}
        >
          {label}
        </motion.button>
      ))}
    </div>
  );
};
