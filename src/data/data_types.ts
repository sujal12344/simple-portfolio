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

export interface NavLinkItem {
  name: string;
  href: string;
}

export interface ExperienceType {
  title: string;
  company: string;
  companyLink: string;
  location?: string;
  period: string;
  description: string;
  achievements: string[];
  technologies: string[];
  color: string;
  icon?: React.ReactNode;
  proofLink?: string;
  companyLogo?: string;
  companyLogoStyle?: string;
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
