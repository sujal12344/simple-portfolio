import { ArrowRight, LeafyGreen } from "lucide-react";

export interface HeroConfig {
  animations: {
    leftContent: {
      initial: { opacity: number; x: number };
      animate: { opacity: number; x: number };
      transition: { duration: number; ease: string };
    };
    delays: {
      greeting: number;
      bio: number;
      actions: number;
      techStack: number;
      scrollIndicator: number;
    };
  };
  layout: {
    containerClasses: string;
    leftSectionClasses: string;
    rightSectionClasses: string;
  };
  actions: Array<{
    href: string;
    text: string;
    icon: React.ReactNode;
    variant?: "default" | "outline";
  }>;
  scrollIndicator: {
    text: string;
    animation: {
      y: number[];
      duration: number;
      repeat: number;
    };
  };
}

export const heroConfig: HeroConfig = {
  animations: {
    leftContent: {
      initial: { opacity: 0, x: -200 },
      animate: { opacity: 1, x: 0 },
      transition: { duration: 0.8, ease: "easeOut" },
    },
    delays: {
      greeting: 0.3,
      bio: 0.5,
      actions: 0.7,
      techStack: 0.9,
      scrollIndicator: 1.2,
    },
  },
  layout: {
    containerClasses:
      "w-full pt-16 pb-8 md:pt-24 md:pb-0 min-h-[90vh] md:min-h-[80vh] flex flex-col-reverse sm:flex-row lg:px-4 xl:px-16 2xl:px-24",
    leftSectionClasses:
      "sm:w-1/2 w-full flex flex-col items-center sm:items-start justify-center space-y-4 sm:space-y-6 px-4 sm:px-8 lg:px-16 mt-8 sm:mt-0",
    rightSectionClasses:
      "sm:w-1/2 w-full flex items-center justify-center pb-6 sm:pb-0 mt-1 sm:mt-0",
  },
  actions: [
    {
      href: "#contact",
      text: "Say hello",
      icon: (
        <LeafyGreen className="ml-2 h-4 w-4 sm:h-5 sm:w-5 group-hover:animate-bounce" />
      ),
      variant: "default",
    },
    {
      href: "#projects",
      text: "View work",
      icon: (
        <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform" />
      ),
      variant: "outline",
    },
  ],
  scrollIndicator: {
    text: "Scroll down to explore",
    animation: {
      y: [0, 6, 0],
      duration: 1.5,
      repeat: Infinity,
    },
  },
};
