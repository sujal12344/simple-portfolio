import React from "react";
import { motion } from "framer-motion";
import { Github, ExternalLink } from "lucide-react";
import Link from "next/link";

interface CallToActionProps {
  githubUrl: string;
}

export const CallToAction: React.FC<CallToActionProps> = ({ githubUrl }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.7, delay: 0.3 }}
    className="mt-10 xs:mt-12 sm:mt-16 text-center"
  >
    <p className="text-muted-foreground text-sm sm:text-base md:text-lg mb-3 sm:mb-4">
      Want to see more of my work?
    </p>
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="inline-flex items-center gap-1.5 sm:gap-2 bg-primary/10 hover:bg-primary/20 text-primary px-4 sm:px-6 py-2 sm:py-3 rounded-full transition-all duration-300 cursor-pointer font-medium text-sm sm:text-base"
    >
      <Github className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
      <Link href={githubUrl} target="_blank">
        Visit my GitHub
      </Link>
      <ExternalLink className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
    </motion.div>
  </motion.div>
);
