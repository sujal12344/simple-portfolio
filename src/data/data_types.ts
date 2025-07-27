// Base interfaces
export interface BaseItem {
  id?: number;
  title: string;
  description: string;
}

export interface ProjectType extends BaseItem {
  id: number;
  github: string;
  ImageUrl: string;
  websiteUrl: string;
  color?: string;
  categories?: string[];
  technologies?: string[];
  isFeatured?: boolean;
}

export type HeaderName = "home" | "services" | "skills" | "experience" | "projects" | "contact";

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

export interface SkillItem {
  name: string;
  level: number;
}

export interface SkillCategory {
  [key: string]: SkillItem[];
}

export interface NavLinkItem {
  name: string;
  href: string;
}

export interface ExperienceType extends BaseItem {
  company: string;
  companyLink: string;
  location?: string;
  period: string;
  achievements: string[];
  technologies: string[];
  color: string;
  icon?: React.ReactNode;
  proofLink?: string;
  companyLogo?: string;
  companyLogoStyle?: string;
}

export interface SocialLinks {
  github: string;
  twitter: string;
  linkedin: string;
  resume: string;
  linktree: string;
}

export interface PersonalInfo {
  name: string;
  role: string;
  greet: string;
  greetIcon: string;
  bio: string;
  links: SocialLinks;
  tech_stack: TechStackItem;
  dev_tools: TechStackItem;
  profileImage: string;
}

// Form related types
export interface ContactFormData {
  email: string;
  name: string;
  message: string;
}

export type FormStatus = "idle" | "loading" | "success" | "error";
export type EmailValidationState = boolean | null;
