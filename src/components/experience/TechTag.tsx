import React from "react";
import { motion } from "framer-motion";

interface TechTagProps {
  name: string;
}

export const TechTag: React.FC<TechTagProps> = ({ name }) => (
  <motion.span
    className="inline-block bg-primary/10 text-primary text-[10px] xs:text-xs px-1.5 xs:px-2 py-0.5 xs:py-1 rounded-full mr-1.5 xs:mr-2 mb-1.5 xs:mb-2 cursor-pointer"
    initial={{ opacity: 0, scale: 0.8 }}
    whileInView={{ opacity: 1, scale: 1 }}
    whileHover={{
      scale: 1.05,
      backgroundColor: "rgba(30, 41, 122, 1)",
    }}
  >
    {name}
  </motion.span>
);
