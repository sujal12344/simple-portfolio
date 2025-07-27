import { ProjectType } from "@/data/data_types";

// Constants and configuration
export const PROJECTS_CONSTANTS = {
  ANIMATIONS: {
    STAGGER_DELAY: 0.1,
    CARD_DURATION: 0.5,
    HOVER_SCALE: 1.02,
    FEATURED_SCALE: 1.05,
  },
  GRID: {
    FEATURED_HEIGHT: 300,
    CARD_HEIGHT: 192, // h-48 in pixels
  },
  CATEGORIES: {
    ALL: "All",
    OTHER: "Other",
  },
} as const;

// Animation variants
export const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: index * PROJECTS_CONSTANTS.ANIMATIONS.STAGGER_DELAY,
      duration: PROJECTS_CONSTANTS.ANIMATIONS.CARD_DURATION,
      ease: "easeOut",
    },
  }),
};

export const featuredCardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: PROJECTS_CONSTANTS.ANIMATIONS.CARD_DURATION,
      delay: index * PROJECTS_CONSTANTS.ANIMATIONS.STAGGER_DELAY,
    },
  }),
};

// Utility functions
export const extractCategories = (projects: ProjectType[]): string[] => {
  return Array.from(
    new Set(
      projects.flatMap(
        (project) => project.categories || [PROJECTS_CONSTANTS.CATEGORIES.OTHER]
      )
    )
  );
};

export const filterProjects = (
  projects: ProjectType[],
  activeCategory: string,
  searchQuery: string
): ProjectType[] => {
  return projects.filter((project) => {
    const matchesCategory =
      activeCategory === PROJECTS_CONSTANTS.CATEGORIES.ALL ||
      (activeCategory === PROJECTS_CONSTANTS.CATEGORIES.OTHER &&
        project.isFeatured === false) ||
      (project.categories && project.categories.includes(activeCategory));

    const matchesSearch =
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });
};

export const getFeaturedProjects = (projects: ProjectType[]): ProjectType[] => {
  return projects.filter((project) => project.isFeatured);
};

export const openInNewTab = (url: string): void => {
  window.open(url, "_blank");
};

export const getImageSrc = (imageUrl: string | undefined): string => {
  return imageUrl || "/placeholder-project.jpg";
};

export const clearFilters = (
  setActiveCategory: (category: string) => void,
  setSearchQuery: (query: string) => void
): void => {
  setActiveCategory(PROJECTS_CONSTANTS.CATEGORIES.ALL);
  setSearchQuery("");
};
