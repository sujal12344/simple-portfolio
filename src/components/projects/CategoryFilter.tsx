import React from "react";
import { motion } from "framer-motion";
import { Filter } from "lucide-react";
import { PROJECTS_CONSTANTS } from "../../lib/projects-utils";

interface CategoryFilterProps {
  categories: string[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categories,
  activeCategory,
  onCategoryChange,
}) => {
  const allCategories = [PROJECTS_CONSTANTS.CATEGORIES.ALL, ...categories];

  return (
    <div className="flex items-center space-x-2">
      <Filter className="h-4 w-4 text-primary" />
      <span className="text-sm font-medium">Filter by:</span>
      <div className="flex flex-wrap gap-2">
        {allCategories.map((category) => (
          <motion.button
            key={category}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onCategoryChange(category)}
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
  );
};
