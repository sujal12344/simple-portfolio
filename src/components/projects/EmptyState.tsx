import React from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";

interface EmptyStateProps {
  onClearFilters: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ onClearFilters }) => {
  return (
    <div className="text-center py-12 border border-dashed border-primary/20 rounded-lg bg-secondary/20">
      <div className="flex flex-col items-center justify-center space-y-3">
        <div className="p-3 bg-primary/10 rounded-full">
          <Search className="h-6 w-6 text-primary" />
        </div>
        <h3 className="text-lg font-medium">No projects found</h3>
        <p className="text-muted-foreground text-sm max-w-md">
          No projects match your current filters. Try adjusting your search or
          category selection.
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onClearFilters}
          className="mt-3 px-4 py-2 text-sm bg-primary text-white rounded-md"
        >
          Clear Filters
        </motion.button>
      </div>
    </div>
  );
};
