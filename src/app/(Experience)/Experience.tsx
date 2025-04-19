"use client";
import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
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
    company: "Neotix Lab Private Limited",
    companyLink: "https://raffl.pro/",
    location: "Remote",
    period: "Sep 2024 - Jan 2025",
    description: `Worked on the frontend of the Raffl's website using Nextjs, React.js, TypeScript,  NextUI, framar-motion, and Zustand.`,
    achievements: [
      "Established file structure and refactored large production-ready application",
      "Managed global state using Zustand",
      "Implemented responsive design using Tailwind CSS",
      "Implemented form validation using Zod with Next UI styling",
      "Implemented lazy loading of components in React (lodash) for improved performance",
      "Debugged code efficiently using React Dev Tools",
    ],
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "NextUI",
      "Tailwind CSS",
      "Zustand",
      "Framer Motion",
    ],
    color: "from-blue-500 to-blue-600",
    icon: <Code className="h-5 w-5" />,
  },
  {
    title: "Full Stack Developer",
    company: "ParivartanX PRIVATE LIMITED",
    companyLink: "https://parivartanx.com/",
    location: "Remote",
    period: "May 2024 - Present",
    description:
      "A founding engineer who contributed heavily to building the backend using various AI libraries.",
    achievements: [
      "Built a full-stack application in a team of 5 using Next.js, React.js, TypeScript, and Tailwind CSS.",
      "Developed a custom backend architecture with Node.js and PostgreSQL for scalable data handling.",
      "Created robust REST APIs using Express.js to streamline server-side communication.",
      "Implemented a secure authentication flow using JWT for user verification and access control.",
    ],
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "PostgreSQL",
      "Prisma",
      "Neon",
      "ShadCN",
      "Zod",
      "REST API",
      "react Hook Form",
      "Tanstack Query",
      "Zustand",
      "Framer Motion",
      "etc",
    ],
    color: "from-emerald-500 to-emerald-600",
    icon: <Terminal className="h-5 w-5" />,
  },
];

// Custom hook for responsive design
const useResponsiveLayout = () => {
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [isMobileScreen, setIsMobileScreen] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth < 768);
      setIsMobileScreen(window.innerWidth < 640);
    };

    // Set initial value
    checkScreenSize();

    // Add event listener
    window.addEventListener("resize", checkScreenSize);

    // Cleanup
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  return { isSmallScreen, isMobileScreen };
};

// Technology tag component
const TechTag = ({ name }: { name: string }) => (
  <motion.span
    className="inline-block bg-primary/10 text-primary text-[10px] xs:text-xs px-1.5 xs:px-2 py-0.5 xs:py-1 rounded-full mr-1.5 xs:mr-2 mb-1.5 xs:mb-2 cursor-pointer"
    initial={{ opacity: 0, scale: 0.8 }}
    whileInView={{ opacity: 1, scale: 1 }}
    whileHover={{
      scale: 1.05,
      backgroundColor: "rgba(30, 41, 122, 1)",
    }}
  >
    {name}
  </motion.span>
);

// Achievement item component
const AchievementItem = ({ text }: { text: string }) => (
  <motion.li
    className="mb-1.5 xs:mb-2 flex items-start"
    initial={{ opacity: 0, x: -10 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.3 }}
  >
    <span className="text-primary mr-1.5 xs:mr-2 flex-shrink-0 mt-1">
      <ChevronRight className="h-3 w-3 xs:h-4 xs:w-4" />
    </span>
    <span className="text-xs xs:text-sm sm:text-base">{text}</span>
  </motion.li>
);

// Enhanced experience card
const ExperienceCard = ({
  title,
  company,
  companyLink,
  location,
  period,
  description,
  achievements,
  technologies,
  index,
  color,
  icon,
  isSmallScreen,
}: {
  title: string;
  company: string;
  companyLink: string;
  location?: string;
  period: string;
  description: string;
  achievements: string[];
  technologies: string[];
  index: number;
  color: string;
  icon: React.ReactNode;
  isSmallScreen: boolean;
}) => {
  // Card enter animation variants
  const cardVariants = {
    offscreen: {
      y: 30,
      opacity: 0,
      scale: 0.98,
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

  // Alternating layout - only on tablet/desktop
  const isEven = index % 2 === 0;
  const cardPosition = isSmallScreen
    ? "w-full px-1 xs:px-2 sm:px-4"
    : `w-full md:w-[90%] ${
        isEven ? "ml-auto pr-6 md:pr-0" : "mr-auto pl-6 md:pl-0"
      }`;

  return (
    <motion.div
      variants={cardVariants}
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ once: true, amount: 0.2 }}
      className={`relative z-10 mb-10 sm:mb-16 ${cardPosition}`}
    >
      {/* Date indicator for desktop - MOVED TO HIGHER Z-INDEX */}
      <motion.div
        className={`hidden md:flex absolute top-6 ${"right-0 translate-x-full pr-8"} items-center space-x-2 text-muted-foreground z-30`}
        initial={{ opacity: 0, x: isEven ? 50 : -50 }}
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
        className="bg-card border border-primary/10 rounded-lg overflow-hidden shadow-md transition-all duration-300 z-20 relative"
      >
        {/* Header with gradient */}
        <div className={`bg-gradient-to-r ${color} h-1.5 xs:h-2 w-full`} />

        <div className="p-3 xs:p-4 sm:p-6">
          {/* Card content */}
          <div className="flex flex-col">
            <div className="flex flex-col xs:flex-row items-start xs:items-center xs:justify-between mb-3 xs:mb-4">
              <div className="flex items-center mb-2 xs:mb-0">
                <div
                  className={`mr-2 xs:mr-3 bg-primary/10 p-1.5 xs:p-2 rounded-full`}
                >
                  {icon}
                </div>
                <div>
                  <h3 className="text-base xs:text-lg sm:text-xl font-bold">
                    {title}
                  </h3>
                  <div className="flex items-center text-muted-foreground text-xs xs:text-sm">
                    <span
                      className="font-medium cursor-pointer hover:text-blue-500 transition-colors duration-200"
                      // Open company link in new tab
                      onClick={() => {
                        window.open(companyLink, "_blank");
                      }}
                    >
                      {company}
                    </span>
                    {location && (
                      <>
                        <span className="mx-1 xs:mx-2">•</span>
                        <span className="text-xs">{location}</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
              <div className="xs:hidden sm:hidden md:hidden text-xs text-muted-foreground flex items-center">
                <Calendar className="h-3 w-3 mr-1 inline" />
                {period}
              </div>
            </div>

            {/* Mobile date display */}
            <div className="hidden xs:flex sm:flex md:hidden text-xs text-muted-foreground items-center mb-3">
              <Calendar className="h-3 w-3 mr-1 inline" />
              {period}
            </div>

            {/* Description section */}
            <p className="text-xs sm:text-sm text-muted-foreground mb-3 xs:mb-4">
              {description}
            </p>

            {/* Key Achievements */}
            <div className="mb-3 xs:mb-4">
              <h4 className="text-xs uppercase tracking-wider text-primary font-semibold mb-1.5 xs:mb-2">
                Key Achievements
              </h4>
              <ul className="space-y-0.5 xs:space-y-1">
                {achievements.map((achievement, i) => (
                  <AchievementItem key={i} text={achievement} />
                ))}
              </ul>
            </div>

            {/* Technologies used */}
            <div>
              <h4 className="text-xs uppercase tracking-wider text-primary font-semibold mb-1.5 xs:mb-2">
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
const TimelineDot = ({
  index,
  year,
  isSmallScreen,
}: {
  index: number;
  year: string;
  isSmallScreen: boolean;
}) => (
  <div
    className={`absolute ${
      isSmallScreen
        ? "left-0 ml-[10px] xs:ml-[14px]"
        : "left-1/2 transform -translate-x-1/2"
    } -translate-y-1/2 z-20 flex flex-col items-center`}
  >
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.2 }}
      className={`${
        isSmallScreen ? "w-3 h-3 xs:w-4 xs:h-4" : "w-5 h-5"
      } bg-primary rounded-full shadow-lg relative`}
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

// Animated timeline with progress - responsive version
const AnimatedTimeline = ({ isSmallScreen }: { isSmallScreen: boolean }) => {
  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <div
      className={`absolute ${
        isSmallScreen
          ? "left-0 ml-[12px] xs:ml-[16px]"
          : "left-1/2 transform -translate-x-1/2"
      } top-0 h-full z-10 flex items-center`}
    >
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
  const { isSmallScreen, isMobileScreen } = useResponsiveLayout();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 0.2], [50, 0]);

  return (
    <div
      className="overflow-hidden py-10 xs:py-12 sm:py-16 md:py-20 relative bg-background"
      ref={containerRef}
      id="experience"
    >
      {/* Background elements */}
      <div className="absolute top-10 xs:top-12 sm:top-16 md:top-20 left-0 opacity-5 text-lg xs:text-xl sm:text-3xl md:text-5xl lg:text-6xl font-mono">
        {"<experience>"}
      </div>
      <div className="absolute bottom-10 xs:bottom-12 sm:bottom-16 md:bottom-20 right-0 opacity-5 text-lg xs:text-xl sm:text-3xl md:text-5xl lg:text-6xl font-mono">
        {"</experience>"}
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
              className="text-primary font-mono text-xs xs:text-sm px-2 xs:px-3 py-0.5 xs:py-1 rounded-full bg-primary/10 border border-primary/20"
            >
              03. <span className="text-foreground">Work Experience</span>
            </motion.span>
            <div className="h-px w-3 xs:w-5 bg-primary" />
          </div>

          <motion.h1
            initial={{ y: 20 }}
            whileInView={{ y: 0 }}
            transition={{ duration: 0.7, type: "spring" }}
            viewport={{ once: true }}
            className="text-xl xs:text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-2 xs:mb-4 tracking-tight"
          >
            My Coding Journey
          </motion.h1>

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-muted-foreground text-center max-w-2xl mx-auto text-sm xs:text-base sm:text-lg"
          >
            Staying with the problems long enough — not just intelligent, but
            persistent.
          </motion.p>
        </motion.div>

        {/* Timeline section */}
        <div
          className={`relative pt-8 pb-12 ${
            isSmallScreen ? "pl-8 xs:pl-10 sm:pl-12" : ""
          }`}
        >
          <AnimatedTimeline isSmallScreen={isSmallScreen} />

          {experiences.map((exp, index) => (
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
              <Link href={"https://github.com/sujal12344"} target="_blank">
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

export default Experience;
