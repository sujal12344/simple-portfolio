"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { LeafyGreen, MoveDown, ArrowDown } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";

const Herobody = () => {
  return (
    <div className="overflow-x-hidden">
      <div
        id="home"
        className=" w-full pt-20 md:pt-24 md:h-[90vh] sm:h-[70vh] flex flex-col-reverse sm:flex-row"
      >
        {/* Left Content Section */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 100 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="sm:w-1/2 flex flex-col items-center sm:items-start justify-center space-y-6 px-4 sm:px-8 md:px-16"
        >
          <div>
            <h1 className="md:text-6xl sm:text-5xl text-4xl font-bold mb-2">
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
              <div className="h-0.5 w-12 bg-primary rounded-full"></div>
              <h2 className="text-xl text-muted-foreground font-medium">
                Fullstack Developer
              </h2>
            </div>
          </div>

          <p className="text-lg text-muted-foreground max-w-md leading-relaxed">
            Turning vision into reality with coding and designing using awesome
            technologies. I also write to document my life journey.
          </p>

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-6"
          >
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
        </motion.div>

        {/* Right Image Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          className="sm:w-1/2 flex items-center justify-center pb-8 sm:pb-0"
        >
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary rounded-full blur-md opacity-75 animate-pulse"></div>
            <div className="relative">
              <Image
                src="/images/profile.jpg"
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

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.6,
          delay: 1.2,
          repeat: Infinity,
          repeatType: "reverse",
          repeatDelay: 1,
        }}
        className="flex flex-col items-center justify-center mt-0 sm:mt-4 mb-8"
      >
        <div className="text-sm font-medium text-muted-foreground mb-2">
          Scroll down to explore
        </div>
        <div className="relative w-8 h-12 border-2 border-primary rounded-full flex justify-center p-1">
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
