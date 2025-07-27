import React from "react";
import { motion } from "framer-motion";
import { Github, ArrowRight } from "lucide-react";

interface CallToActionProps {
  githubUrl: string;
}

export const CallToAction: React.FC<CallToActionProps> = ({ githubUrl }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="text-center mt-16"
    >
      <p className="text-muted-foreground mb-4">
        Interested in collaborating or want to see more?
      </p>
      <div className="flex flex-wrap justify-center gap-4">
        <motion.a
          href={githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
          className="inline-flex items-center gap-2 bg-primary/10 hover:bg-primary/20 text-primary px-5 py-2.5 rounded-full transition-all duration-300 cursor-pointer font-medium"
        >
          <Github className="h-4 w-4" />
          <span>See More on GitHub</span>
        </motion.a>

        <motion.a
          href="#contact"
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
          className="inline-flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-full transition-all duration-300 cursor-pointer font-medium"
        >
          <span>Contact Me</span>
          <ArrowRight className="h-4 w-4" />
        </motion.a>
      </div>
    </motion.div>
  );
};
