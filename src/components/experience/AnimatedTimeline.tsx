import React from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { getTimelinePosition } from "@/lib/experience-utils";

interface AnimatedTimelineProps {
  isSmallScreen: boolean;
}

export const AnimatedTimeline: React.FC<AnimatedTimelineProps> = ({
  isSmallScreen,
}) => {
  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <div className={getTimelinePosition(isSmallScreen)}>
      <div className="h-full w-px bg-primary/20 relative">
        <motion.div
          style={{ scaleY, height: "100%" }}
          className="absolute top-0 left-0 w-full bg-primary origin-top"
        />
      </div>
    </div>
  );
};
