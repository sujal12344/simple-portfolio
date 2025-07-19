export interface ProjectType {
  id: number;
  title: string;
  description: string;
  github: string;
  ImageUrl: string;
  websiteUrl: string;
  color?: string;
  categories?: string[];
  technologies?: string[];
  isFeatured?: boolean;
}

export type HeaderName =
  | "home"
  | "services"
  | "skills"
  | "experience"
  | "projects"
  | "contact";

export interface HeaderItem {
  name: HeaderName;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  background: string;
  backgroundClosing: string;
}

export interface TechStackItem {
  name: string;
  items: string[];
}

export interface PersonalInfo {
  name: string;
  role: string;
  greet: string;
  greetIcon: string;
  bio: string;
  links: {
    github: string;
    twitter: string;
    linkedin: string;
    resume: string;
    linktree: string;
  };
  tech_stack: TechStackItem;
  dev_tools: TechStackItem;
  profileImage: string;
}

export interface NavLink {
  name: string;
  href: string;
}[]