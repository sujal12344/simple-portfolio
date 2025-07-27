import React from "react";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";

interface AchievementItemProps {
  text: string;
}

export const AchievementItem: React.FC<AchievementItemProps> = ({ text }) => (
  <motion.li
    className="mb-1.5 xs:mb-2 flex items-start"
    initial={{ opacity: 0, x: -10 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.3 }}
  >
    <span className="text-primary mr-1.5 xs:mr-2 flex-shrink-0 mt-1">
      <ChevronRight className="h-3 w-3 xs:h-4 xs:w-4" />
    </span>
    <span className="text-xs xs:text-sm sm:text-base">{text}</span>
  </motion.li>
);
