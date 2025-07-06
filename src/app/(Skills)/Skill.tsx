"use client";
import { motion } from "framer-motion";
import React, { useState, useEffect } from "react";
import { Code, Braces, Server, Cpu } from "lucide-react";
import { Headers, SkillsData } from "../../../data/data";

// Define types for skills and categories
type SkillCategory = "frontend" | "backend" | "other";
type Skill = {
  name: string;
  level: number;
  category: SkillCategory;
};

// Mobile detection hook
const useMobileDetect = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Set initial value
    checkMobile();

    // Add event listener
    window.addEventListener("resize", checkMobile);

    // Cleanup
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return isMobile;
};

// MOBILE-SPECIFIC SKILL COMPONENT
const MobileSkillBubble = ({
  name,
  category,
  index,
  total,
}: {
  name: string;
  category: SkillCategory;
  index: number;
  total: number;
}) => {
  const categoryColors: Record<SkillCategory, string> = {
    frontend: "bg-blue-500/90 dark:bg-blue-600/90",
    backend: "bg-green-500/90 dark:bg-green-600/90",
    other: "bg-purple-500/90 dark:bg-purple-600/90",
  };

  // Calculate position in the grid
  const getGridPosition = () => {
    // Create a 3-column layout
    if (total <= 3) {
      return `col-span-${Math.floor(12 / total)}`; // Evenly divide 12 columns
    } else {
      return "col-span-4"; // Default to 3 per row
    }
  };

  const getIcon = () => {
    switch (category) {
      case "frontend":
        return <Braces className="h-3 w-3 mr-1" />;
      case "backend":
        return <Server className="h-3 w-3 mr-1" />;
      case "other":
        return <Cpu className="h-3 w-3 mr-1" />;
      default:
        return null;
    }
  };

  return (
    <motion.div
      className={`${getGridPosition()} flex justify-center`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
    >
      <div
        className={`rounded-full ${categoryColors[category]} text-white text-xs py-1.5 px-3 shadow-md flex items-center justify-center m-1`}
      >
        {name.length <= 7 && getIcon()}
        {name}
      </div>
    </motion.div>
  );
};

// DESKTOP SKILL BUBBLE
const DesktopSkillBubble = ({
  name,
  x,
  y,
  delay,
  category,
}: {
  name: string;
  x: string;
  y: string;
  delay: number;
  category: SkillCategory | "core";
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const categoryColors: Record<SkillCategory | "core", string> = {
    frontend:
      "from-blue-500/90 to-blue-600/90 dark:from-blue-600/90 dark:to-blue-700/90",
    backend:
      "from-green-500/90 to-green-600/90 dark:from-green-600/90 dark:to-green-700/90",
    other:
      "from-purple-500/90 to-purple-600/90 dark:from-purple-600/90 dark:to-purple-700/90",
    core: "from-primary/90 to-primary dark:from-primary/90 dark:to-primary",
  };

  const getIcon = () => {
    switch (category) {
      case "frontend":
        return <Braces className="h-3 w-3 mr-1" />;
      case "backend":
        return <Server className="h-3 w-3 mr-1" />;
      case "other":
        return <Cpu className="h-3 w-3 mr-1" />;
      default:
        return null;
    }
  };

  return (
    <motion.div
      className={`flex items-center justify-center rounded-full font-medium bg-gradient-to-br ${categoryColors[category]} text-white py-1.5 sm:py-2 px-3 sm:px-4 shadow-lg cursor-pointer absolute text-sm md:text-base backdrop-blur-sm border border-white/10`}
      whileHover={{
        scale: 1.5,
        zIndex: isHovered ? 50 : 10,
        boxShadow: "0 0 15px rgba(var(--primary-rgb)/0.5)",
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      initial={{ x: 0, y: 0, opacity: 0 }}
      whileInView={{ x, y, opacity: 1 }}
      transition={{
        duration: 1.2,
        delay,
        type: "spring",
        stiffness: 100,
      }}
      viewport={{ once: true }}
    >
      <div className="flex items-center">
        {getIcon()}
        {name}
      </div>
    </motion.div>
  );
};

// DESKTOP POSITIONS CALCULATION
const calculateDesktopPositions = (totalSkills: number) => {
  const positions = [];
  const angleStep = (2 * Math.PI) / totalSkills;
  const radius = 230;

  for (let i = 0; i < totalSkills; i++) {
    const angle = i * angleStep;
    // Use fixed values to ensure consistency
    const x = `${Math.round((radius * Math.cos(angle)) / 16)}vw`;
    const y = `${Math.round((radius * Math.sin(angle)) / 16)}vw`;
    positions.push({ x, y });
  }

  return positions;
};

const SkillSection = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const isMobile = useMobileDetect();

  // Flatten skills for the display
  const allSkills: Array<Skill> = [
    ...SkillsData.frontend.map((s) => ({
      ...s,
      category: "frontend" as SkillCategory,
    })),
    ...SkillsData.backend.map((s) => ({
      ...s,
      category: "backend" as SkillCategory,
    })),
    ...SkillsData.other.map((s) => ({
      ...s,
      category: "other" as SkillCategory,
    })),
  ];

  // Generate positions for desktop
  const positions = calculateDesktopPositions(allSkills.length);

  // Filter skills based on active category
  const filteredSkills =
    activeCategory === "all"
      ? allSkills
      : allSkills.filter((skill) => skill.category === activeCategory);

  const skillsHeader = Headers.find((h) => h.name === "skills")!;

  return (
    <div
      id={skillsHeader.name}
      className="overflow-x-hidden py-10 sm:py-16 md:py-20 relative"
    >
      {/* Background elements */}
      <div className="absolute top-6 sm:top-10 md:top-20 left-0 opacity-5 text-xl sm:text-3xl md:text-5xl lg:text-6xl font-mono">
        {skillsHeader.background}
      </div>
      <div className="absolute bottom-6 sm:bottom-10 md:bottom-20 right-0 opacity-5 text-xl sm:text-3xl md:text-5xl lg:text-6xl font-mono">
        {skillsHeader.backgroundClosing}
      </div>
      <div className="absolute inset-0 bg-grid-small-white/[0.025] -z-10" />

      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-6 sm:mb-10 md:mb-8 flex flex-col items-center"
        >
          <div className="flex items-center gap-1 sm:gap-2 mb-2 sm:mb-3">
            <div className="h-px w-3 sm:w-5 bg-primary" />
            <motion.span
              whileHover={{
                scale: 1.05,
                backgroundColor: "rgba(38, 54, 179, 0.15)",
              }}
              className="text-primary font-mono text-xs sm:text-sm px-2 sm:px-3 py-0.5 sm:py-1 rounded-full bg-primary/10 border border-primary/20"
            >
              {skillsHeader.number}.{" "}
              <span className="text-foreground">{skillsHeader.title}</span>
            </motion.span>
            <div className="h-px w-3 sm:w-5 bg-primary" />
          </div>

          <motion.h1
            initial={{ y: 20 }}
            whileInView={{ y: 0 }}
            transition={{ duration: 0.7, type: "spring" }}
            viewport={{ once: true }}
            className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-2 sm:mb-4 tracking-tight"
          >
            {skillsHeader.subtitle}
          </motion.h1>

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-muted-foreground text-center max-w-2xl mx-auto text-sm sm:text-base md:text-lg"
          >
            {skillsHeader.description}
          </motion.p>
        </motion.div>

        {/* Category filters */}
        <div className="flex justify-center mb-6 sm:mb-20 flex-wrap gap-2 sm:gap-4">
          {["all", "frontend", "backend", "other"].map((category) => (
            <motion.button
              key={category}
              className={`px-2.5 sm:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all ${
                activeCategory === category
                  ? "bg-primary text-white shadow-lg"
                  : "bg-secondary/50 text-muted-foreground hover:bg-secondary"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveCategory(category)}
            >
              {category === "all"
                ? "All Skills"
                : category === "frontend"
                ? "Frontend"
                : category === "backend"
                ? "Backend"
                : "Other"}
            </motion.button>
          ))}
        </div>

        {/* MOBILE SKILLS VIEW - Grid Layout */}
        {isMobile && (
          <div className="mb-8">
            {/* Mobile center bubble */}
            <div className="flex justify-center mb-6">
              <motion.div
                className="flex items-center justify-center rounded-full font-semibold bg-gradient-to-br from-primary to-primary/80 text-primary-foreground text-base shadow-lg cursor-pointer z-10 p-4 backdrop-blur-sm border border-white/10"
                animate={{
                  scale: [1, 1.05, 1],
                  transition: { duration: 3, repeat: Infinity },
                }}
              >
                <Code className="mr-1.5 h-4 w-4" />
                {activeCategory === "all"
                  ? "Tech"
                  : activeCategory === "frontend"
                  ? "Frontend"
                  : activeCategory === "backend"
                  ? "Backend"
                  : "Tools"}
              </motion.div>
            </div>

            {/* Mobile grid layout */}
            <div className="grid grid-cols-12 gap-1">
              {filteredSkills.map((skill, index) => (
                <MobileSkillBubble
                  key={skill.name}
                  name={skill.name}
                  category={skill.category}
                  index={index}
                  total={filteredSkills.length}
                />
              ))}
            </div>
          </div>
        )}

        {/* DESKTOP SKILLS VIEW - Web Layout */}
        {!isMobile && (
          <div className="relative h-[50vh] md:h-[60vh] lg:h-[70vh] mx-auto mb-8 flex items-center justify-center">
            {/* Dynamic background circle */}
            <motion.div
              className="absolute rounded-full bg-secondary/30 border border-primary/10"
              initial={{ width: "30vw", height: "30vw" }}
              animate={{
                width: activeCategory === "all" ? "40vw" : "35vw",
                height: activeCategory === "all" ? "40vw" : "35vw",
                backgroundColor:
                  activeCategory === "all"
                    ? "#f1f5f910" // Using hex with alpha
                    : activeCategory === "frontend"
                    ? "#3b82f61a"
                    : activeCategory === "backend"
                    ? "#22c55e1a"
                    : "#a855f71a",
              }}
              transition={{ duration: 0.5 }}
            />

            {/* Core tech bubble */}
            <motion.div
              className="flex items-center justify-center rounded-full font-semibold bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-lg cursor-pointer z-10 text-lg md:text-xl p-2 md:p-4 px-6 backdrop-blur-sm border border-white/10"
              whileHover={{
                scale: 1.05,
                boxShadow: "0 0 20px rgba(var(--primary-rgb)/0.6)",
              }}
              animate={{
                scale: [1, 1.05, 1],
                transition: { duration: 3, repeat: Infinity },
              }}
            >
              {/* <Code className="mr-2 h-5 w-5 md:h-6 md:w-6">"Tech stack"</Code> */}
              {activeCategory === "all"
                ? "< Tech stack >"
                : activeCategory === "frontend"
                ? "Frontend"
                : activeCategory === "backend"
                ? "Backend"
                : "Tools"}
            </motion.div>

            {/* Skill bubbles */}
            {filteredSkills.map((skill, index) => {
              const position = positions[index % positions.length];
              return (
                <DesktopSkillBubble
                  key={skill.name}
                  name={skill.name}
                  x={position.x}
                  y={position.y}
                  delay={index * 0.1}
                  category={skill.category}
                />
              );
            })}
          </div>
        )}

        {/* Skill bars section for details */}
        {/* <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto mt-4 sm:mt-8 md:mt-12 bg-secondary/30 rounded-lg border border-primary/10 p-3 sm:p-6 shadow-md"
        >
          <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-3 sm:mb-6 flex items-center">
            <Globe className="mr-1.5 sm:mr-2 h-4 w-4 sm:h-5 sm:w-5 text-primary" />
            {activeCategory === "all"
              ? "Key Skills"
              : activeCategory === "frontend"
              ? "Frontend Skills"
              : activeCategory === "backend"
              ? "Backend Skills"
              : "Other Skills"}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-6">
            {(activeCategory === "all"
              ? [
                  ...SkillsData.frontend.slice(0, 3),
                  ...SkillsData.backend.slice(0, 2),
                ]
              : activeCategory === "frontend"
              ? SkillsData.frontend
              : activeCategory === "backend"
              ? SkillsData.backend
              : SkillsData.other
            ).map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="mb-2 sm:mb-3"
              >
                <div className="flex justify-between mb-0.5 sm:mb-1">
                  <span className="font-medium text-xs sm:text-base">
                    {skill.name}
                  </span>
                  <span className="text-xs sm:text-sm text-muted-foreground">
                    {skill.level}%
                  </span>
                </div>
                <div className="h-1.5 sm:h-2 w-full bg-secondary rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-primary rounded-full"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    transition={{ duration: 1, delay: 0.2 + index * 0.1 }}
                    viewport={{ once: true }}
                  />
                </div>
              </motion.div>
            ))}
          </div>

          {activeCategory === "all" && (
            <motion.div
              className="mt-3 sm:mt-6 text-center"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center text-primary hover:underline cursor-pointer group text-xs sm:text-base">
                <span>See all my skills</span>
                <ArrowRight className="ml-1 h-3 w-3 sm:h-4 sm:w-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.div>
          )}
        </motion.div> */}
      </div>
    </div>
  );
};

export default SkillSection;
