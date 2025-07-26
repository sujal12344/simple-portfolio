import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  SkillCategory,
  CATEGORY_CONFIG,
  getMobileGridClass,
  SKILL_CONSTANTS,
} from "@/lib/skills-utils";

interface BaseSkillBubbleProps {
  name: string;
  category: SkillCategory;
  index: number;
}

interface MobileSkillBubbleProps extends BaseSkillBubbleProps {
  total: number;
}

interface DesktopSkillBubbleProps extends BaseSkillBubbleProps {
  x: string;
  y: string;
  delay: number;
}

const SkillIcon = ({
  category,
  className,
}: {
  category: SkillCategory;
  className?: string;
}) => {
  const IconComponent = CATEGORY_CONFIG[category].icon;
  return <IconComponent className={className} />;
};

export const MobileSkillBubble: React.FC<MobileSkillBubbleProps> = ({
  name,
  category,
  index,
  total,
}) => {
  const config = CATEGORY_CONFIG[category];
  const gridClass = getMobileGridClass(total);

  return (
    <motion.div
      className={`${gridClass} flex justify-center`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: index * SKILL_CONSTANTS.ANIMATION_DELAYS.SKILL_BUBBLE,
        duration: 0.5,
      }}
    >
      <div
        className={`rounded-full ${config.colors.mobile} text-white text-xs py-1.5 px-3 shadow-md flex items-center justify-center m-1`}
      >
        {name.length <= 7 && (
          <SkillIcon category={category} className="h-3 w-3 mr-1" />
        )}
        {name}
      </div>
    </motion.div>
  );
};

export const DesktopSkillBubble: React.FC<DesktopSkillBubbleProps> = ({
  name,
  x,
  y,
  delay,
  category,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const config = CATEGORY_CONFIG[category];

  return (
    <motion.div
      className={`flex items-center justify-center rounded-full font-medium bg-gradient-to-br ${config.colors.desktop} text-white py-1.5 sm:py-2 px-3 sm:px-4 shadow-lg cursor-pointer absolute text-sm md:text-base backdrop-blur-sm border border-white/10`}
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
        <SkillIcon category={category} className="h-3 w-3 mr-1" />
        {name}
      </div>
    </motion.div>
  );
};
