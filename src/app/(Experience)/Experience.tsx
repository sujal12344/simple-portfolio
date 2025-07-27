"use client";
import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import Link from "next/link";
import { Experiences, Headers, PersonalData } from "@/data/data";
import { useResponsiveLayout } from "@/hooks/useResponsiveLayout";
import { AnimatedTimeline } from "@/components/experience/AnimatedTimeline";
import { ExperienceCard } from "@/components/experience/ExperienceCard";
import { TimelineDot } from "@/components/experience/TimelineDot";

// Main component
const ExperienceSection = () => {
  const containerRef = useRef(null);
  const { isSmallScreen, isMobileScreen } = useResponsiveLayout();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 0.2], [50, 0]);

  const {
    links: { github },
  } = PersonalData;

  const experiencesHeader = Headers.find(
    (header) => header.name === "experience"
  )!;

  return (
    <div
      className="overflow-hidden py-10 sm:py-10 md:py-12 relative bg-background"
      ref={containerRef}
      id={experiencesHeader.name}
    >
      {/* Background elements */}
      <div className="absolute top-10 xs:top-12 sm:top-16 md:top-20 left-0 opacity-5 text-lg xs:text-xl sm:text-3xl md:text-5xl lg:text-6xl font-mono">
        {experiencesHeader.background}
      </div>
      <div className="absolute bottom-10 xs:bottom-12 sm:bottom-16 md:bottom-20 right-0 opacity-5 text-lg xs:text-xl sm:text-3xl md:text-5xl lg:text-6xl font-mono">
        {experiencesHeader.backgroundClosing}
      </div>

      <div className="max-w-7xl mx-auto px-2 xs:px-3 sm:px-6 lg:px-8">
        {/* Section header with styling consistent with other sections */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-8 xs:mb-10 sm:mb-12 md:mb-16 flex flex-col items-center"
        >
          <div className="flex items-center gap-1 xs:gap-2 mb-2 xs:mb-3">
            <div className="h-px w-3 xs:w-5 bg-primary" />
            <motion.span
              whileHover={{
                scale: 1.05,
                backgroundColor: "rgba(38, 54, 179, 0.15)",
              }}
              className="text-primary font-mono text-xs sm:text-sm px-2 sm:px-3 py-1 rounded-full bg-primary/10 border border-primary/20"
            >
              {experiencesHeader.number}.{" "}
              <span className="text-foreground">{experiencesHeader.title}</span>
            </motion.span>
            <div className="h-px w-3 xs:w-5 bg-primary" />
          </div>

          <motion.h1
            initial={{ y: 20 }}
            whileInView={{ y: 0 }}
            transition={{ duration: 0.7, type: "spring" }}
            viewport={{ once: true }}
            className="text-xl sm:text-2xl md:text-3xl font-bold text-center mb-2 sm:mb-4 tracking-tight"
          >
            {experiencesHeader.subtitle}
          </motion.h1>

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-muted-foreground text-center max-w-2xl mx-auto text-sm xs:text-base sm:text-lg"
          >
            {experiencesHeader.description}
          </motion.p>
        </motion.div>

        {/* Timeline section */}
        <div
          className={`relative pt-8 pb-12 ${
            isSmallScreen ? "pl-8 xs:pl-10 sm:pl-12" : ""
          }`}
        >
          <AnimatedTimeline isSmallScreen={isSmallScreen} />

          {Experiences.map((exp, index) => (
            <React.Fragment key={index}>
              <ExperienceCard
                {...exp}
                index={index}
                isSmallScreen={isSmallScreen}
              />
              <TimelineDot
                index={index}
                year={exp.period.split(" - ")[0]}
                isSmallScreen={isSmallScreen}
              />
            </React.Fragment>
          ))}

          {/* Ending dot */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className={`absolute bottom-0 ${
              isSmallScreen
                ? "left-0 ml-[12px] xs:ml-[16px] w-3 h-3 xs:w-4 xs:h-4"
                : "left-1/2 transform -translate-x-1/2 w-4 h-4"
            } bg-primary rounded-full z-10`}
          />

          {/* Call to action */}
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
              <Link href={github} target="_blank">
                Visit my GitHub
              </Link>
              <ExternalLink className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ExperienceSection;
