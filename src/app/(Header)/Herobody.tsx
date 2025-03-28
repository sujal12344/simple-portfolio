"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import {
  LeafyGreen,
  MoveDown,
  ArrowDown,
  Code,
  ArrowRight,
} from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";

const Herobody = () => {
  return (
    <div className="overflow-x-hidden">
      <div
        id="home"
        className="w-full pt-20 md:pt-24 md:h-[80vh] sm:h-[70vh] flex flex-col-reverse sm:flex-row"
      >
        {/* Left Content Section */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 100 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="sm:w-1/2 flex flex-col items-center sm:items-start justify-center space-y-6 px-4 sm:px-8 md:px-16"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 mb-4 bg-gradient-to-r from-primary/10 to-primary/20 text-primary rounded-full text-sm font-medium border border-primary/10 shadow-sm"
            >
              <span className="flex items-center">
                <span className="relative flex h-2 w-2 mr-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
                </span>
                Welcome to my portfolio
              </span>
            </motion.div>
            <h1 className="md:text-5xl sm:text-4xl text-3xl font-bold mb-3 tracking-tight">
              Sujal Kesharwani
              <span
                role="img"
                aria-label="waving hand"
                className="inline-block animate-wave ml-2"
              >
                👋
              </span>
            </h1>
            <div className="flex items-center space-x-3 mb-3">
              <div className="h-0.5 w-12 bg-primary rounded-full" />
              <h2 className="text-xl text-muted-foreground font-medium">
                Fullstack Developer
              </h2>
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="text-lg text-muted-foreground max-w-md leading-relaxed"
          >
            Hi, I'm Sujal Kesharwani, a full stack developer with experience in
            building scalable web apps using modern industry technologies. I'm
            always curious and excite to explore new things.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            className="flex space-x-4 mt-2"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                size="lg"
                className="group text-base font-medium hover:bg-primary/90 transition-all shadow-lg hover:shadow-primary/25"
              >
                <a href="#contact" className="flex items-center">
                  <span>Say hello</span>
                  <LeafyGreen className="ml-2 h-5 w-5 group-hover:animate-bounce" />
                </a>
              </Button>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="outline"
                size="lg"
                className="group text-base font-medium transition-all hover:border-primary"
              >
                <a href="#projects" className="flex items-center">
                  <span>View work</span>
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </a>
              </Button>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.5 }}
            className="flex items-center space-x-4 mt-4"
          >
            <p className="text-lg text-muted-foreground underline font-medium underline-offset-8">
              Tech Stack
            </p>
            <div className="flex space-x-2">
              {["React", "Next.js", "TypeScript", "Tailwind"].map((tech, i) => (
                <motion.span
                  key={tech}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 + i * 0.1, duration: 0.3 }}
                  className="px-2 py-1 rounded-md bg-secondary text-xs font-medium"
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Right Image Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          className="sm:w-1/2 flex items-center justify-center pb-8 sm:pb-0"
        >
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary rounded-full blur-md opacity-75 animate-pulse" />
            <div className="relative">
              <Image
                src="https://github.com/sujal12344.png"
                className="rounded-full object-cover border-4 border-background shadow-2xl"
                alt="Profile picture of Sujal Kesharwani"
                width={340}
                height={340}
                priority
              />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator - Fixed positioning to ensure visibility */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.2 }}
        className="flex flex-col items-center justify-center mt-2 mb-8 sticky bottom-8 z-10"
      >
        <div className="text-sm font-medium text-muted-foreground mb-2 bg-background/80 backdrop-blur-sm px-3 py-1 rounded-full shadow-sm">
          Scroll down to explore
        </div>
        <div className="relative w-8 h-12 border-2 border-primary rounded-full flex justify-center p-1 bg-background/80 backdrop-blur-sm shadow-sm">
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              repeatType: "loop",
            }}
            className="w-2 h-2 bg-primary rounded-full"
          />
        </div>
      </motion.div>
    </div>
  );
};

export default Herobody;
