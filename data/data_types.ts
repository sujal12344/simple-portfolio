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

export type HeaderName = "home" | "about" | "skills" | "experience" | "projects" | "contact";

export interface HeaderItem {
  name: HeaderName;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  background: string;
  backgroundClosing: string;
}