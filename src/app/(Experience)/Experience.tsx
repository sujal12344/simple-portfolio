"use client";
import React, { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import ReactMarkdown from "react-markdown";
import {
  Briefcase,
  Calendar,
  ChevronRight,
  Code,
  ExternalLink,
  Github,
  Globe,
  Star,
  Terminal,
  User,
} from "lucide-react";
import Link from "next/link";

// Enhanced experience data with added fields for better UI
const experiences = [
  {
    title: "Frontend Developer",
    company: "CelebralZip Private Limited",
    location: "Remote",
    period: "Feb 2024 - July 2024",
    description: `Worked on the core frontend of the website using React.js, Material UI, TypeScript, and React Redux.`,
    achievements: [
      "Implemented lazy loading of components in React (lodash) for improved performance",
      "Created WebSockets to show realtime progress, speed and ETA for uploading large files",
      "Established file structure and refactored large production-ready application",
      "Debugged code efficiently using React Dev Tools",
      "Managed global state using Redux and useContext",
      "Implemented form validation using Formik with Material UI styling",
    ],
    technologies: [
      "React",
      "TypeScript",
      "Material UI",
      "Redux",
      "WebSockets",
      "Formik",
    ],
    color: "from-blue-500 to-blue-600",
    icon: <Code className="h-5 w-5" />,
  },
  {
    title: "Full Stack Developer",
    company: "EpiphanyAI",
    location: "San Francisco, CA (Remote)",
    period: "May 2024 - Present",
    description:
      "A founding engineer who contributed heavily to building the backend using various AI libraries.",
    achievements: [
      "Collaborated with a seasoned Silicon Valley founder ($400MM in acquisitions)",
      "Built Vercel AI SDK tooling to support non-standard LLMs (Llama 70B, Qwen) for inference providers like Groq and Fireworks, reducing costs by 80%",
      "Migrated from Tavily to SearX for sources and media, reducing costs by 90%+",
      "Implemented parallel generative UI streaming for media and sources (Vercel AI SDK)",
      "Generated sitemaps for 200K+ queries",
      "Resolved TTL DevOps errors, client-side exceptions and frontend issues for emergency production fixes",
      "Created under-the-hood agent functionality for Vercel AI SDK to support widgets",
      "Developed functionality widgets for weather and finance applications",
      "Utilized LangChain for object generation in non-supported inference providers",
    ],
    technologies: [
      "Next.js",
      "TypeScript",
      "Vercel AI SDK",
      "LangChain",
      "SearX",
      "LLMs",
      "Groq",
      "Fireworks",
    ],
    color: "from-emerald-500 to-emerald-600",
    icon: <Terminal className="h-5 w-5" />,
  },
];

// Technology tag component
const TechTag = ({ name }: { name: string }) => (
  <motion.span
    className="inline-block bg-primary/10 text-primary text-xs px-2 py-1 rounded-full mr-2 mb-2"
    whileHover={{
      scale: 1.05,
      backgroundColor: "rgba(var(--primary-rgb), 0.2)",
    }}
  >
    {name}
  </motion.span>
);

// Achievement item component
const AchievementItem = ({ text }: { text: string }) => (
  <motion.li
    className="mb-2 flex items-start"
    initial={{ opacity: 0, x: -10 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.3 }}
  >
    <span className="text-primary mr-2 flex-shrink-0 mt-1">
      <ChevronRight className="h-4 w-4" />
    </span>
    <span>{text}</span>
  </motion.li>
);

// Enhanced experience card
const ExperienceCard = ({
  title,
  company,
  location,
  period,
  description,
  achievements,
  technologies,
  index,
  color,
  icon,
}: {
  title: string;
  company: string;
  location?: string;
  period: string;
  description: string;
  achievements: string[];
  technologies: string[];
  index: number;
  color: string;
  icon: React.ReactNode;
}) => {
  // Card enter animation variants
  const cardVariants = {
    offscreen: {
      y: 50,
      opacity: 0,
      scale: 0.95,
    },
    onscreen: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        bounce: 0.4,
        duration: 0.8,
        delayChildren: 0.2,
        staggerChildren: 0.1,
      },
    },
  };

  // Alternating layout based on index
  const isEven = index % 2 === 0;

  return (
    <motion.div
      variants={cardVariants}
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ once: true, amount: 0.3 }}
      className={`relative z-10 mb-16 w-full md:w-[90%] ${
        isEven ? "ml-auto pr-6 md:pr-0" : "mr-auto pl-6 md:pl-0"
      }`}
    >
      {/* Date indicator */}
      <motion.div
        className={`hidden md:flex absolute top-6 right-0 translate-x-full pr-8 items-center space-x-2 text-muted-foreground`}
        initial={{ opacity: 0, x: isEven ? 20 : -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <Calendar className="h-4 w-4 text-primary" />
        <span className="text-sm whitespace-nowrap">{period}</span>
      </motion.div>

      {/* Card container */}
      <motion.div
        whileHover={{
          y: -5,
          boxShadow: "0 10px 30px -15px rgba(var(--primary-rgb), 0.15)",
        }}
        className="bg-card border border-primary/10 rounded-lg overflow-hidden shadow-md transition-all duration-300"
      >
        {/* Header with gradient */}
        <div className={`bg-gradient-to-r ${color} h-2 w-full`} />

        <div className="p-6">
          {/* Card content */}
          <div className="flex flex-col">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center">
                <div className={`mr-3 bg-primary/10 p-2 rounded-full`}>
                  {icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold">{title}</h3>
                  <div className="flex items-center text-muted-foreground">
                    <span className="font-medium">{company}</span>
                    {location && (
                      <>
                        <span className="mx-2">•</span>
                        <span className="text-sm">{location}</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
              <div className="md:hidden text-sm text-muted-foreground flex items-center">
                <Calendar className="h-3 w-3 mr-1 inline" />
                {period}
              </div>
            </div>

            {/* Description section */}
            <p className="text-muted-foreground mb-4">{description}</p>

            {/* Key Achievements */}
            <div className="mb-4">
              <h4 className="text-sm uppercase tracking-wider text-primary font-semibold mb-2">
                Key Achievements
              </h4>
              <ul className="space-y-1 text-sm">
                {achievements.map((achievement, i) => (
                  <AchievementItem key={i} text={achievement} />
                ))}
              </ul>
            </div>

            {/* Technologies used */}
            <div>
              <h4 className="text-sm uppercase tracking-wider text-primary font-semibold mb-2">
                Technologies
              </h4>
              <div className="flex flex-wrap">
                {technologies.map((tech, i) => (
                  <TechTag key={i} name={tech} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// Enhanced timeline dot with year label
const TimelineDot = ({ index, year }: { index: number; year: string }) => (
  <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center">
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.2 }}
      className="w-5 h-5 bg-primary rounded-full shadow-lg relative"
    >
      <motion.div
        className="absolute inset-1 rounded-full bg-white"
        initial={{ scale: 0.8 }}
        whileInView={{ scale: [0.8, 1.2, 0.8] }}
        transition={{ repeat: Infinity, duration: 3, repeatType: "loop" }}
      />
    </motion.div>
  </div>
);

// Animated timeline with progress
const AnimatedTimeline = () => {
  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <div className="absolute left-1/2 transform -translate-x-1/2 top-0 h-full z-10 flex items-center">
      <div className="h-full w-px bg-primary/20 relative">
        <motion.div
          style={{ scaleY, height: "100%" }}
          className="absolute top-0 left-0 w-full bg-primary origin-top"
        />
      </div>
    </div>
  );
};

// Main component
const Experience = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 0.2], [50, 0]);

  return (
    <div
      className="overflow-hidden py-20 relative bg-background"
      ref={containerRef}
      id="experience"
    >
      {/* Background elements */}
      <div className="absolute top-20 left-0 opacity-5 text-6xl font-mono">
        {"<experience>"}
      </div>
      <div className="absolute bottom-20 right-0 opacity-5 text-6xl font-mono">
        {"</experience>"}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header with styling consistent with other sections */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-16 flex flex-col items-center"
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
              03. <span className="text-foreground">Work Experience</span>
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
            My Professional Journey
          </motion.h1>

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-muted-foreground text-center max-w-2xl mx-auto text-lg"
          >
            Staying with the problems long enough — not just intelligent, but
            persistent.
          </motion.p>
        </motion.div>

        {/* Timeline section */}
        <div className="relative pt-8 pb-12">
          <AnimatedTimeline />

          {experiences.map((exp, index) => (
            <React.Fragment key={index}>
              <ExperienceCard {...exp} index={index} />
              <TimelineDot index={index} year={exp.period.split(" - ")[0]} />
            </React.Fragment>
          ))}

          {/* Ending dot */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-primary rounded-full z-10"
          />

          {/* Call to action */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-16 text-center"
          >
            <p className="text-muted-foreground mb-4">
              Want to see more of my work?
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 bg-primary/10 hover:bg-primary/20 text-primary px-6 py-3 rounded-full transition-all duration-300 cursor-pointer font-medium"
            >
              <Github className="h-4 w-4" />
              <span>Visit my GitHub</span>
              <ExternalLink className="h-4 w-4" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Experience;
