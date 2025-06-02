"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { LeafyGreen, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import { personalData } from "../../../data/data";

const Herobody = () => {
  const { name, bio } = personalData;
  return (
    <div className="overflow-x-hidden">
      <div
        id="home"
        className="w-full pt-16 pb-8 md:pt-24 md:pb-0 min-h-[90vh] md:min-h-[80vh] flex flex-col-reverse sm:flex-row lg:px-4 xl:px-16 2xl:px-24"
      >
        {/* Left Content Section - Fixed animation that was pushing content off-screen */}
        <motion.div
          initial={{ opacity: 0, x: -200 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="sm:w-1/2 w-full flex flex-col items-center sm:items-start justify-center space-y-4 sm:space-y-6 px-4 sm:px-8 lg:px-16 mt-8 sm:mt-0"
        >
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
                Welcome to my portfolio
              </span>
            </motion.div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-3 tracking-tight">
              {name}
              <span
                role="img"
                aria-label="waving hand"
                className="inline-block animate-wave ml-2"
              >
                👋
              </span>
            </h1>
            <div className="flex items-center space-x-3 mb-3">
              <div className="h-0.5 w-8 sm:w-12 bg-primary rounded-full" />
              <h2 className="text-lg sm:text-xl text-muted-foreground font-medium">
                Fullstack Developer
              </h2>
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="text-sm sm:text-base lg:text-lg text-muted-foreground max-w-md leading-relaxed"
          >
            {bio}
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            className="flex gap-3 sm:space-x-4 mt-2 w-full sm:w-auto"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto"
            >
              <Button
                size="lg"
                className="w-full sm:w-auto group text-sm sm:text-base font-medium hover:bg-primary/90 transition-all shadow-lg hover:shadow-primary/25"
              >
                <a href="#contact" className="flex items-center">
                  <span>Say hello</span>
                  <LeafyGreen className="ml-2 h-4 w-4 sm:h-5 sm:w-5 group-hover:animate-bounce" />
                </a>
              </Button>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto"
            >
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto group text-sm sm:text-base font-medium transition-all hover:border-primary"
              >
                <a href="#projects" className="flex items-center">
                  <span>View work</span>
                  <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform" />
                </a>
              </Button>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.5 }}
            className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 mt-2"
          >
            <p className="text-base sm:text-lg text-muted-foreground underline font-medium underline-offset-8">
              Tech Stack
            </p>
            <div className="flex flex-wrap gap-1.5">
              {["Next.js", "TypeScript", "PostgreSQL", "Prisma"].map(
                (tech, i) => (
                  <motion.span
                    key={tech}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1 + i * 0.1, duration: 0.3 }}
                    className="px-2 py-1 rounded-md bg-secondary text-sm font-medium hover:bg-primary/10 transition-colors duration-200 cursor-pointer"
                    onClick={() => {
                      window.open(
                        `https://www.google.com/search?q=${tech}`,
                        "_blank"
                      );
                    }}
                  >
                    {tech}
                  </motion.span>
                )
              )}
            </div>
          </motion.div>
        </motion.div>

        {/* Right Image Section - Made responsive with better sizing */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          className="sm:w-1/2 w-full flex items-center justify-center pb-6 sm:pb-0 mt-1 sm:mt-0"
        >
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary rounded-full blur-md opacity-75 animate-pulse" />
            <div className="relative">
              <Image
                src="/images/Sujal.jpg"
                className="rounded-full object-cover border-4 border-background shadow-2xl"
                alt={`Profile picture of {name}`}
                width={280}
                height={280}
                sizes="(max-width: 640px) 240px, (max-width: 768px) 280px, 340px"
                style={{
                  width: "auto",
                  height: "auto",
                  maxWidth: "100%",
                  maxHeight: "70vh",
                }}
                priority
              />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator - Improved for mobile */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.2 }}
        className="flex flex-col items-center justify-center my-4 sm:mt-2 sm:mb-8 sticky bottom-4 sm:bottom-8 z-10"
      >
        <div className="text-xs sm:text-sm font-medium text-muted-foreground mb-1.5 sm:mb-2 bg-background/80 backdrop-blur-sm px-2.5 sm:px-3 py-1 rounded-full shadow-sm">
          Scroll down to explore
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
    </div>
  );
};

export default Herobody;
