"use client";
import { motion } from "framer-motion";
import React, { useState } from "react";
import { Headers } from "@/data/data";
import { useMobileDetect } from "@/hooks/useMobileDetect";
import {
  flattenSkills,
  filterSkills,
  calculateDesktopPositions,
  getCenterBubbleContent,
  getBackgroundColor,
  getBackgroundSize,
  SKILL_CONSTANTS,
} from "@/lib/skills-utils";
import {
  MobileSkillBubble,
  DesktopSkillBubble,
} from "@/components/skills/SkillBubble";
import { CategoryFilter } from "@/components/skills/CategoryFilter";
import { SectionHeader } from "@/components/skills/SectionHeader";
import { CenterBubble } from "@/components/skills/CenterBubble";

const SkillSection = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const isMobile = useMobileDetect();

  // Get data
  const allSkills = flattenSkills();
  const filteredSkills = filterSkills(allSkills, activeCategory);
  const positions = calculateDesktopPositions(allSkills.length);
  const skillsHeader = Headers.find((h) => h.name === "skills")!;

  return (
    <div
      id={skillsHeader.name}
      className="overflow-x-hidden py-10 sm:py-10 md:py-12 relative"
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
        <SectionHeader header={skillsHeader} />
        <CategoryFilter
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />

        {/* MOBILE SKILLS VIEW */}
        {isMobile && (
          <div className="mb-8">
            <div className="flex justify-center mb-6">
              <CenterBubble
                content={getCenterBubbleContent(activeCategory)}
                isMobile={true}
              />
            </div>
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

        {/* DESKTOP SKILLS VIEW */}
        {!isMobile && (
          <div className="relative h-[50vh] md:h-[60vh] lg:h-[70vh] mx-auto mb-8 flex items-center justify-center">
            <motion.div
              className="absolute rounded-full bg-secondary/30 border border-primary/10"
              initial={{ width: "30vw", height: "30vw" }}
              animate={{
                width: getBackgroundSize(activeCategory),
                height: getBackgroundSize(activeCategory),
                backgroundColor: getBackgroundColor(activeCategory),
              }}
              transition={{ duration: 0.5 }}
            />

            <CenterBubble content={getCenterBubbleContent(activeCategory)} />

            {filteredSkills.map((skill, index) => {
              const position = positions[index % positions.length];
              return (
                <DesktopSkillBubble
                  key={skill.name}
                  name={skill.name}
                  x={position.x}
                  y={position.y}
                  delay={index * SKILL_CONSTANTS.ANIMATION_DELAYS.SKILL_BUBBLE}
                  category={skill.category}
                  index={index}
                />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default SkillSection;
