import React from "react";
import { motion } from "framer-motion";
import { Calendar, Code, ExternalLink, Shield } from "lucide-react";
import { TechTag } from "./TechTag";
import { AchievementItem } from "./AchievementItem";
import {
  cardVariants,
  getCardPosition,
  getDatePosition,
  openInNewTab,
} from "@/lib/experience-utils";
import { cn } from "@/lib/utils";

interface ExperienceCardProps {
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
  isSmallScreen: boolean;
  proofLink?: string;
  companyLogo?: string;
  companyLogoStyle?: string;
}

export const ExperienceCard: React.FC<ExperienceCardProps> = ({
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
  isSmallScreen,
  proofLink,
  companyLogo,
  companyLogoStyle,
}) => {
  return (
    <motion.div
      variants={cardVariants}
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ once: true, amount: 0.2 }}
      className={`relative z-10 mb-10 sm:mb-16 ${getCardPosition(
        index,
        isSmallScreen
      )}`}
    >
      {/* Date indicator for desktop */}
      <motion.div
        className={getDatePosition(index)}
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <div className="flex flex-col items-end space-y-2">
          <div className="flex items-center space-x-2">
            <Calendar className="h-4 w-4 text-primary" />
            <span className="text-sm whitespace-nowrap">{period}</span>
          </div>
          {/* {proofLink && (
            <motion.a
              href={proofLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-1 text-xs text-primary/80 hover:text-primary transition-colors duration-200 bg-primary/10 hover:bg-primary/20 px-2 py-1 rounded-full"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Shield className="h-3 w-3" />
              <span>Proof</span>
              <ExternalLink className="h-3 w-3" />
            </motion.a>
          )} */}
        </div>
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
          <div className="flex flex-col">
            {/* Title and Company */}
            <div className="flex flex-col xs:flex-row items-start xs:items-center xs:justify-between mb-3 xs:mb-4">
              <div className="flex items-center mb-2 xs:mb-0">
                {/* <div className="mr-2 xs:mr-3 bg-primary/10 rounded-full"> */}
                  {companyLogo ? (
                    <img
                      src={companyLogo}
                      alt={`${company} logo`}
                      className={cn("sm:h-14 sm:w-14 h-8 w-8 -translate-x-2 rounded-full",
                        companyLogoStyle
                      )}
                    />
                  ) : <Code className="h-5 w-5" />}
                {/* </div> */}
                <div>
                  <h3 className="text-base xs:text-lg sm:text-lg font-medium">
                    {title}
                  </h3>
                  <div className="flex items-center text-muted-foreground text-sm xs:text-base">
                    <span
                      className="font-medium cursor-pointer hover:text-blue-500 transition-colors duration-200"
                      onClick={() => openInNewTab(companyLink)}
                    >
                      {company}
                    </span>
                    {location && (
                      <>
                        <span className="mx-1 xs:mx-2">•</span>
                        <span className="text-xs sm:text-sm">{location}</span>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Mobile date display */}
              <div className="xs:hidden sm:hidden md:hidden">
                <div className="text-xs text-muted-foreground flex items-center mb-1">
                  <Calendar className="h-3 w-3 mr-1 inline" />
                  {period}
                </div>
                {/* {proofLink && (
                  <motion.a
                    href={proofLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-1 text-xs text-primary/80 hover:text-primary transition-colors duration-200 bg-primary/10 hover:bg-primary/20 px-2 py-0.5 rounded-full"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Shield className="h-2.5 w-2.5" />
                    <span>Proof</span>
                    <ExternalLink className="h-2.5 w-2.5" />
                  </motion.a>
                )} */}
              </div>
            </div>

            {/* Tablet date display */}
            <div className="hidden xs:flex sm:flex md:hidden mb-3">
              <div className="flex flex-col space-y-1">
                <div className="text-xs text-muted-foreground flex items-center">
                  <Calendar className="h-3 w-3 mr-1 inline" />
                  {period}
                </div>
                {/* {proofLink && (
                  <motion.a
                    href={proofLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-1 text-xs text-primary/80 hover:text-primary transition-colors duration-200 bg-primary/10 hover:bg-primary/20 px-2 py-0.5 rounded-full w-fit"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Shield className="h-3 w-3" />
                    <span>Proof</span>
                    <ExternalLink className="h-3 w-3" />
                  </motion.a>
                )} */}
              </div>
            </div>

            {/* Description */}
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

            {/* Technologies */}
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
