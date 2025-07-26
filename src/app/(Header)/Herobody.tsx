"use client";
import React from "react";
import { motion } from "framer-motion";
import { PersonalData } from "@/data/data";
import { heroConfig } from "@/config/hero.config";
import {
  HeroGreeting,
  HeroActions,
  TechStack,
  HeroImage,
  ScrollIndicator,
} from "@/components/hero";

const Herobody = () => {
  const {
    name,
    bio,
    greet,
    greetIcon,
    role,
    tech_stack,
    dev_tools,
    profileImage,
  } = PersonalData;

  const { animations, layout, actions, scrollIndicator } = heroConfig;

  return (
    <div className="overflow-x-hidden">
      <div id="home" className={layout.containerClasses}>
        {/* Left Content Section */}
        <motion.div
          initial={animations.leftContent.initial}
          animate={animations.leftContent.animate}
          transition={animations.leftContent.transition}
          className={layout.leftSectionClasses}
        >
          <HeroGreeting
            greet={greet}
            name={name}
            greetIcon={greetIcon}
            role={role}
          />

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: animations.delays.bio, duration: 0.5 }}
            className="text-sm sm:text-base lg:text-lg text-muted-foreground max-w-md leading-relaxed"
          >
            {bio}
          </motion.p>

          <HeroActions actions={actions} />

          <TechStack
            name={tech_stack.name}
            items={tech_stack.items}
            delay={animations.delays.techStack}
          />

          {/* Uncomment to show dev tools */}
          {/* <TechStack
            title={dev_tools.name}
            items={dev_tools.items}
            delay={animations.delays.techStack + 0.2}
          /> */}
        </motion.div>

        {/* Right Image Section */}
        <HeroImage
          src={profileImage}
          alt={`Profile picture of ${name}`}
          size={280}
        />
      </div>

      <ScrollIndicator text={scrollIndicator.text} />
    </div>
  );
};

export default Herobody;
