"use client";
import { motion } from "framer-motion";

interface HeroGreetingProps {
  greet: string;
  name: string;
  greetIcon: string;
  role: string;
}

export const HeroGreeting = ({
  greet,
  name,
  greetIcon,
  role,
}: HeroGreetingProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3, duration: 0.5 }}
      className="w-full"
    >
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 mb-3 sm:mb-4 bg-gradient-to-r from-primary/10 to-primary/20 text-primary rounded-full text-xs sm:text-sm font-medium border border-primary/10 shadow-sm"
      >
        <span className="flex items-center">
          <span className="relative flex h-1.5 w-1.5 sm:h-2 sm:w-2 mr-1 sm:mr-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 sm:h-2 sm:w-2 bg-primary" />
          </span>
          {greet}
        </span>
      </motion.div>

      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-3 tracking-tight">
        {name}
        <span
          role="img"
          aria-label="waving hand"
          className="inline-block animate-wave ml-2"
        >
          {greetIcon}
        </span>
      </h1>

      <div className="flex items-center space-x-3 mb-3">
        <div className="h-0.5 w-8 sm:w-12 bg-primary rounded-full" />
        <h2 className="text-lg sm:text-xl text-muted-foreground font-medium">
          {role}
        </h2>
      </div>
    </motion.div>
  );
};
