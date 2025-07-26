import { Braces, Server, Cpu } from "lucide-react";
import { SkillsData } from "@/data/data";

export type SkillCategory = "frontend" | "backend" | "other";

export interface Skill {
  name: string;
  level: number;
  category: SkillCategory;
}

export interface SkillPosition {
  x: string;
  y: string;
}

// Constants
export const SKILL_CONSTANTS = {
  DESKTOP_RADIUS: 230,
  MOBILE_GRID_COLS: 12,
  ANIMATION_DELAYS: {
    SKILL_BUBBLE: 0.1,
    HEADER: 0.2,
  },
  BREAKPOINTS: {
    MOBILE: 768,
  },
} as const;

export const CATEGORY_CONFIG: Record<
  SkillCategory,
  {
    colors: {
      mobile: string;
      desktop: string;
    };
    icon: React.ComponentType<{ className?: string }>;
    label: string;
  }
> = {
  frontend: {
    colors: {
      mobile: "bg-blue-500/90 dark:bg-blue-600/90",
      desktop:
        "from-blue-500/90 to-blue-600/90 dark:from-blue-600/90 dark:to-blue-700/90",
    },
    icon: Braces,
    label: "Frontend",
  },
  backend: {
    colors: {
      mobile: "bg-green-500/90 dark:bg-green-600/90",
      desktop:
        "from-green-500/90 to-green-600/90 dark:from-green-600/90 dark:to-green-700/90",
    },
    icon: Server,
    label: "Backend",
  },
  other: {
    colors: {
      mobile: "bg-purple-500/90 dark:bg-purple-600/90",
      desktop:
        "from-purple-500/90 to-purple-600/90 dark:from-purple-600/90 dark:to-purple-700/90",
    },
    icon: Cpu,
    label: "Tools",
  },
};

export const FILTER_OPTIONS = [
  { key: "all", label: "All Skills" },
  { key: "frontend", label: "Frontend" },
  { key: "backend", label: "Backend" },
  { key: "other", label: "Other" },
] as const;

// Utility functions
export const flattenSkills = (): Skill[] => [
  ...SkillsData.frontend.map((s) => ({
    ...s,
    category: "frontend" as SkillCategory,
  })),
  ...SkillsData.backend.map((s) => ({
    ...s,
    category: "backend" as SkillCategory,
  })),
  ...SkillsData.other.map((s) => ({
    ...s,
    category: "other" as SkillCategory,
  })),
];

export const filterSkills = (skills: Skill[], category: string): Skill[] =>
  category === "all"
    ? skills
    : skills.filter((skill) => skill.category === category);

export const calculateDesktopPositions = (
  totalSkills: number
): SkillPosition[] => {
  const positions: SkillPosition[] = [];
  const angleStep = (2 * Math.PI) / totalSkills;

  for (let i = 0; i < totalSkills; i++) {
    const angle = i * angleStep;
    const x = `${Math.round(
      (SKILL_CONSTANTS.DESKTOP_RADIUS * Math.cos(angle)) / 16
    )}vw`;
    const y = `${Math.round(
      (SKILL_CONSTANTS.DESKTOP_RADIUS * Math.sin(angle)) / 16
    )}vw`;
    positions.push({ x, y });
  }

  return positions;
};

export const getMobileGridClass = (total: number): string => {
  if (total <= 3) return `col-span-${Math.floor(12 / total)}`;
  return "col-span-4";
};

export const getCenterBubbleContent = (activeCategory: string): string => {
  if (activeCategory === "all") return "< Tech stack >";
  return CATEGORY_CONFIG[activeCategory as SkillCategory]?.label || "Tech";
};

export const getBackgroundColor = (activeCategory: string): string => {
  const colorMap: Record<string, string> = {
    all: "#f1f5f910",
    frontend: "#3b82f61a",
    backend: "#22c55e1a",
    other: "#a855f71a",
  };
  return colorMap[activeCategory] || colorMap.all;
};

export const getBackgroundSize = (activeCategory: string): string =>
  activeCategory === "all" ? "40vw" : "35vw";
