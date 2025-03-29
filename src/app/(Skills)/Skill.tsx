"use client";
import { motion } from "framer-motion";
import React, { useState } from "react";
import {
  Code,
  Braces,
  Database,
  Server,
  Globe,
  Cpu,
  ArrowRight,
} from "lucide-react";

// Skills data organized by categories
const skillsData = {
  frontend: [
    { name: "React", level: 90 },
    { name: "NextJS", level: 85 },
    { name: "Typescript", level: 80 },
    { name: "HTML5", level: 95 },
    { name: "Tailwind", level: 90 },
  ],
  backend: [
    { name: "NodeJS", level: 85 },
    { name: "Express", level: 80 },
    { name: "PostgreSQL", level: 75 },
    { name: "MongoDB", level: 80 },
    { name: "Redis", level: 70 },
  ],
  other: [
    { name: "AWS", level: 75 },
    { name: "VectorDB", level: 65 },
    { name: "Langchain", level: 70 },
    { name: "Docker", level: 75 },
    { name: "Git", level: 90 },
  ],
};

// Improved skill bubble component
const SkillBubble = ({
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
  category: string;
}) => {
  // Map categories to colors
  const categoryColors: {
    [key: string]: string;
  } = {
    frontend:
      "from-blue-500/90 to-blue-600/90 dark:from-blue-600/90 dark:to-blue-700/90",
    backend:
      "from-green-500/90 to-green-600/90 dark:from-green-600/90 dark:to-green-700/90",
    other:
      "from-purple-500/90 to-purple-600/90 dark:from-purple-600/90 dark:to-purple-700/90",
    core: "from-primary/90 to-primary dark:from-primary/90 dark:to-primary",
  };

  // Determine icon based on category
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
      className={`flex items-center justify-center rounded-full font-medium bg-gradient-to-br ${categoryColors[category]} text-white py-2 px-4 shadow-lg cursor-pointer absolute text-sm md:text-base backdrop-blur-sm border border-white/10`}
      whileHover={{
        scale: 1.1,
        boxShadow: "0 0 15px rgba(var(--primary-rgb)/0.5)",
      }}
      initial={{ x: 0, y: 0, opacity: 0 }}
      whileInView={{ x: x, y: y, opacity: 1 }}
      transition={{
        duration: 1.2,
        delay: delay,
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

// Calculate positions for responsive skill web
const calculatePositions = (totalSkills: number, radius = 180) => {
  const positions = [];
  const angleStep = (2 * Math.PI) / totalSkills;

  for (let i = 0; i < totalSkills; i++) {
    const angle = i * angleStep;
    // Convert polar coordinates to Cartesian
    const x = `${(radius * Math.cos(angle)) / 16}vw`;
    const y = `${(radius * Math.sin(angle)) / 16}vw`;
    positions.push({ x, y });
  }

  return positions;
};

const Skill = () => {
  const [activeCategory, setActiveCategory] = useState("all");

  // Flatten skills for the web display
  const allSkills = [
    ...skillsData.frontend.map((s) => ({ ...s, category: "frontend" })),
    ...skillsData.backend.map((s) => ({ ...s, category: "backend" })),
    ...skillsData.other.map((s) => ({ ...s, category: "other" })),
  ];

  // Generate positions for all skills
  const positions = calculatePositions(allSkills.length);

  // Filter skills based on active category
  const filteredSkills =
    activeCategory === "all"
      ? allSkills
      : allSkills.filter((skill) => skill.category === activeCategory);

  return (
    <div id="skills" className="overflow-x-hidden py-20 relative">
      {/* Background elements */}
      <div className="absolute top-20 left-0 opacity-5 text-6xl font-mono">
        {"<skills>"}
      </div>
      <div className="absolute bottom-20 right-0 opacity-5 text-6xl font-mono">
        {"</skills>"}
      </div>
      <div className="absolute inset-0 bg-grid-small-white/[0.025] -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-12 flex flex-col items-center"
        >
          <div className="flex items-center gap-2 mb-3">
            <div className="h-px w-5 bg-primary" />
            <motion.span
              whileHover={{
                scale: 1.05,
                backgroundColor: "hsl(var(--primary)/0.15)",
              }}
              className="text-primary font-mono text-sm px-3 py-1 rounded-full bg-primary/10 border border-primary/20"
            >
              02. <span className="text-foreground">Skills & Expertise</span>
            </motion.span>
            <div className="h-px w-5 bg-primary" />
          </div>

          <motion.h1
            initial={{ y: 20 }}
            whileInView={{ y: 0 }}
            transition={{ duration: 0.7, type: "spring" }}
            viewport={{ once: true }}
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-4 tracking-tight"
          >
            Technical Proficiency
          </motion.h1>

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-muted-foreground text-center max-w-2xl mx-auto text-lg"
          >
            In the middle of difficulty lies opportunity. Explore my web of
            skills and technologies.
          </motion.p>
        </motion.div>

        {/* Category filters */}
        <div className="flex justify-center mb-10 flex-wrap gap-4">
          {["all", "frontend", "backend", "other"].map((category) => (
            <motion.button
              key={category}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
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

        {/* Skills visualization */}
        <div className="relative h-[60vh] md:h-[70vh] lg:h-[80vh] mx-auto mb-10 flex items-center justify-center">
          {/* Dynamic background circle */}
          <motion.div
            className="absolute rounded-full bg-secondary/30 border border-primary/10"
            initial={{ width: "30vw", height: "30vw" }}
            animate={{
              width: activeCategory === "all" ? "45vw" : "35vw",
              height: activeCategory === "all" ? "45vw" : "35vw",
              backgroundColor:
                activeCategory === "all"
                  ? "rgba(176, 190, 197, 0.3)" // Replace with a direct color value
                  : activeCategory === "frontend"
                  ? "rgba(59, 130, 246, 0.1)"
                  : activeCategory === "backend"
                  ? "rgba(34, 197, 94, 0.1)"
                  : "rgba(168, 85, 247, 0.1)",
            }}
            transition={{ duration: 0.5 }}
          />

          {/* Core tech bubble */}
          <motion.div
            className="flex items-center justify-center rounded-full font-semibold bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-lg cursor-pointer z-10 text-xl p-8 backdrop-blur-sm border border-white/10"
            whileHover={{
              scale: 1.05,
              boxShadow: "0 0 20px rgba(var(--primary-rgb)/0.6)",
            }}
            animate={{
              scale: [1, 1.05, 1],
              transition: { duration: 3, repeat: Infinity },
            }}
          >
            <Code className="mr-2 h-6 w-6" />
            {activeCategory === "all"
              ? "Tech"
              : activeCategory === "frontend"
              ? "Frontend"
              : activeCategory === "backend"
              ? "Backend"
              : "Tools"}
          </motion.div>

          {/* Skill bubbles */}
          {filteredSkills.map((skill, index) => {
            // Use modulo to allow for category filtering
            const position = positions[index % positions.length];

            return (
              <SkillBubble
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

        {/* Skill bars section for details */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto mt-16 bg-secondary/30 rounded-lg border border-primary/10 p-6 shadow-md"
        >
          <h3 className="text-2xl font-bold mb-6 flex items-center">
            <Globe className="mr-2 h-5 w-5 text-primary" />
            {activeCategory === "all"
              ? "Key Skills"
              : activeCategory === "frontend"
              ? "Frontend Skills"
              : activeCategory === "backend"
              ? "Backend Skills"
              : "Other Skills"}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {(activeCategory === "all"
              ? [
                  ...skillsData.frontend.slice(0, 3),
                  ...skillsData.backend.slice(0, 2),
                ]
              : activeCategory === "frontend"
              ? skillsData.frontend
              : activeCategory === "backend"
              ? skillsData.backend
              : skillsData.other
            ).map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="mb-3"
              >
                <div className="flex justify-between mb-1">
                  <span className="font-medium">{skill.name}</span>
                  <span className="text-sm text-muted-foreground">
                    {skill.level}%
                  </span>
                </div>
                <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
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
              className="mt-6 text-center"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center text-primary hover:underline cursor-pointer group">
                <span>See all my skills</span>
                <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Skill;
