// Constants and configuration
export const EXPERIENCE_CONSTANTS = {
  BREAKPOINTS: {
    MOBILE: 640,
    TABLET: 768,
  },
  ANIMATIONS: {
    CARD_DELAY: 0.2,
    STAGGER_DELAY: 0.1,
    DOT_DELAY: 0.2,
    SPRING_CONFIG: {
      type: "spring" as const,
      bounce: 0.4,
      duration: 0.8,
    },
  },
  TIMELINE: {
    DOT_SIZE: {
      mobile: "w-3 h-3 xs:w-4 xs:h-4",
      desktop: "w-5 h-5",
    },
    POSITION: {
      mobile: "left-0 ml-[12px] xs:ml-[16px]",
      desktop: "left-1/2 transform -translate-x-1/2",
    },
  },
} as const;

// Animation variants
export const cardVariants = {
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
      ...EXPERIENCE_CONSTANTS.ANIMATIONS.SPRING_CONFIG,
      delayChildren: EXPERIENCE_CONSTANTS.ANIMATIONS.CARD_DELAY,
      staggerChildren: EXPERIENCE_CONSTANTS.ANIMATIONS.STAGGER_DELAY,
    },
  },
};

// Utility functions
export const getCardPosition = (
  index: number,
  isSmallScreen: boolean
): string => {
  if (isSmallScreen) return "w-full px-1 xs:px-2 sm:px-4";

  const isEven = index % 2 === 0;
  return `w-full md:w-[90%] ${
    isEven ? "ml-auto pr-6 md:pr-0" : "mr-auto pl-6 md:pl-0"
  }`;
};

export const getDatePosition = (index: number): string => {
  const isEven = index % 2 === 0;
  return `hidden md:flex absolute top-6 right-0 translate-x-full pr-8 items-center space-x-2 text-muted-foreground z-30`;
};

export const getTimelinePosition = (isSmallScreen: boolean): string => {
  return `absolute ${
    isSmallScreen
      ? EXPERIENCE_CONSTANTS.TIMELINE.POSITION.mobile
      : EXPERIENCE_CONSTANTS.TIMELINE.POSITION.desktop
  } top-0 h-full z-10 flex items-center`;
};

export const getDotSize = (isSmallScreen: boolean): string => {
  return isSmallScreen
    ? EXPERIENCE_CONSTANTS.TIMELINE.DOT_SIZE.mobile
    : EXPERIENCE_CONSTANTS.TIMELINE.DOT_SIZE.desktop;
};

export const extractYear = (period: string): string => {
  return period.split(" - ")[0];
};

export const openInNewTab = (url: string): void => {
  window.open(url, "_blank");
};
