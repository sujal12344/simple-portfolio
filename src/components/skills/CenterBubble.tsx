import React from "react";
import { motion } from "framer-motion";

interface CenterBubbleProps {
  content: string;
  isMobile?: boolean;
}

export const CenterBubble: React.FC<CenterBubbleProps> = ({
  content,
  isMobile = false,
}) => {
  const baseClasses =
    "flex items-center justify-center rounded-full font-semibold bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-lg cursor-pointer z-10 backdrop-blur-sm border border-white/10";

  const sizeClasses = isMobile
    ? "text-sm p-2"
    : "text-lg md:text-xl p-2 md:p-4 px-6";

  return (
    <motion.div
      className={`${baseClasses} ${sizeClasses}`}
      whileHover={{
        scale: 1.05,
        boxShadow: "0 0 20px rgba(var(--primary-rgb)/0.6)",
      }}
      animate={{
        scale: [1, 1.05, 1],
        transition: { duration: 3, repeat: Infinity },
      }}
    >
      {content}
    </motion.div>
  );
};
