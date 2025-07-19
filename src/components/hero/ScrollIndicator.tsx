"use client";

import { motion } from "framer-motion";

interface ScrollIndicatorProps {
  text?: string;
}

export const ScrollIndicator = ({
  text = "Scroll down to explore",
}: ScrollIndicatorProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 1.2 }}
      className="flex flex-col items-center justify-center my-4 sm:mt-2 sm:mb-8 sticky bottom-4 sm:bottom-8 z-10"
    >
      <div className="text-xs sm:text-sm font-medium text-muted-foreground mb-1.5 sm:mb-2 bg-background/80 backdrop-blur-sm px-2.5 sm:px-3 py-1 rounded-full shadow-sm">
        {text}
      </div>
      <div className="relative w-6 h-10 sm:w-8 sm:h-12 border-2 border-primary rounded-full flex justify-center p-1 bg-background/80 backdrop-blur-sm shadow-sm">
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            repeatType: "loop",
          }}
          className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-primary rounded-full"
        />
      </div>
    </motion.div>
  );
};
