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
  currently_exploring: TechStackItem;
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

// Email Validation Types
export interface AbstractAPIResponse {
  email_address: string;
  email_deliverability: {
    status: string;
    status_detail: string;
    is_format_valid: boolean;
    is_smtp_valid: boolean;
    is_mx_valid: boolean;
    mx_records: string[];
  };
  email_quality: {
    score: number;
    is_free_email: boolean;
    is_disposable: boolean;
    is_catchall: boolean;
    is_role: boolean;
  };
  email_risk: {
    address_risk_status: string;
    domain_risk_status: string;
  };
}

export interface EmailValidationResult {
  status: boolean;
  checks: {
    smtp: boolean;
    format: boolean;
    mx: boolean;
  };
  details: {
    deliverability: string;
    quality_score: number;
    is_disposable: boolean;
    risk_level: string;
  };
}

export interface EmailValidationError {
  error: string;
  details?: string;
  isQuotaExhausted?: boolean;
}
