"use client";
import { motion } from "framer-motion";
import { HeaderItem } from "@/data/data_types";

interface SectionHeaderProps {
  header: HeaderItem;
}

const SectionHeader = ({ header }: SectionHeaderProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="mb-8 sm:mb-10 md:mb-12 flex flex-col items-center"
    >
      <div className="flex items-center gap-2 mb-3">
        <div className="h-px w-5 bg-primary" />
        <motion.span
          whileHover={{
            scale: 1.05,
            backgroundColor: "rgba(38, 54, 179, 0.15)",
          }}
          className="text-primary font-mono text-xs sm:text-sm px-2 sm:px-3 py-1 rounded-full bg-primary/10 border border-primary/20"
        >
          {header.number}. <span className="text-foreground">{header.title}</span>
        </motion.span>
        <div className="h-px w-5 bg-primary" />
      </div>

      <motion.h1
        initial={{ y: 20 }}
        whileInView={{ y: 0 }}
        transition={{ duration: 0.7, type: "spring" }}
        viewport={{ once: true }}
        className="text-xl sm:text-2xl md:text-3xl font-bold text-center mb-2 sm:mb-4 tracking-tight"
      >
        {header.subtitle}
      </motion.h1>

      <motion.p
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        viewport={{ once: true }}
        className="text-muted-foreground text-center max-w-2xl mx-auto text-sm sm:text-base md:text-lg px-2"
      >
        {header.description}
      </motion.p>
    </motion.div>
  );
};

export default SectionHeader;