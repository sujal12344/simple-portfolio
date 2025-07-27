import React from "react";
import { motion } from "framer-motion";
import { getDotSize, EXPERIENCE_CONSTANTS } from "@/lib/experience-utils";

interface TimelineDotProps {
  index: number;
  year: string;
  isSmallScreen: boolean;
}

export const TimelineDot: React.FC<TimelineDotProps> = ({
  index,
  year,
  isSmallScreen,
}) => (
  <div
    className={`absolute ${
      isSmallScreen
        ? "left-0 ml-[10px] xs:ml-[14px]"
        : "left-1/2 transform -translate-x-1/2"
    } -translate-y-1/2 z-20 flex flex-col items-center`}
  >
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.5,
        delay: index * EXPERIENCE_CONSTANTS.ANIMATIONS.DOT_DELAY,
      }}
      className={`${getDotSize(
        isSmallScreen
      )} bg-primary rounded-full shadow-lg relative`}
    >
      <motion.div
        className="absolute inset-1 rounded-full bg-white"
        initial={{ scale: 0.8 }}
        whileInView={{ scale: [0.8, 1.2, 0.8] }}
        transition={{ repeat: Infinity, duration: 3, repeatType: "loop" }}
      />
    </motion.div>
  </div>
);
