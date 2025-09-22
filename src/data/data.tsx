import { Metadata } from "next";
import {
  HeaderItem,
  HeaderName,
  ProjectType,
  PersonalInfo,
  NavLinkItem,
  ExperienceType,
  SkillCategory,
} from "./data_types";

// Project data with improved structure
export const ProjectData: ProjectType[] = [
  {
    id: 1,
    title: "Socially",
    description: "A modern social media platform built with Next.js, React, and TypeScript. Features user authentication, posts, comments, likes, messaging, friend requests, notifications, and customizable profiles with dark/light mode support.",
    github: "https://github.com/sujal12344/Socially",
    ImageUrl: "/Socially.png",
    websiteUrl: "https://socially-blond.vercel.app/",
    isFeatured: true,
  },
  {
    id: 2,
    title: "AI Companion",
    description: "AI-Companion is a cool software that lets you create your own custom AI models of people you admire, like actors or celebrities. It's a tool to make personalized artificial intelligence companions based on your favorite individuals.",
    github: "https://github.com/sujal12344/AI-Companion-Builder",
    ImageUrl: "/AI-Companion.png",
    websiteUrl: "https://ai-companion-builder.vercel.app/",
    isFeatured: true,
  },
  {
    id: 3,
    title: "Chatting Application",
    description: "A real-time chat application using the MERN stack (MongoDB, Express, React, Node.js) with Socket.IO for instant messaging. The app should enable user account creation, secure real-time communication, and deliver a smooth, responsive chat experience.",
    github: "https://github.com/sujal12344/chat-app",
    ImageUrl: "/chat-App.png",
    websiteUrl: "https://chat-app-fyek.onrender.com/",
    isFeatured: true,
  },
  {
    id: 4,
    title: "E-Commerce Store",
    description: "An E-Commerce Store where users can easily buy good quality clothes and stylish shoes, glasses, bags, accessories, etc.",
    github: "https://github.com/sujal12344/E-commernce-website",
    ImageUrl: "/E-com.png",
    websiteUrl: "https://e-commernce-website.onrender.com/",
    isFeatured: false,
  },
];

// Experience data with consistent structure
export const Experiences: ExperienceType[] = [
  {
    title: "Full Stack Developer",
    company: "Arkimals",
    companyLink: "https://arkimals-game.com/",
    location: "Remote",
    period: "May 2025 - Aug 2025",
    description: "Contributed to blockchain-integrated NFT games like Waves Ducks and Arkimals under the Waves Protocol ecosystem.",
    achievements: [
      "Refactored a large codebase across 5+ microservices, improving maintainability and reducing technical debt by 30%.",
      "Reduced average page load time by up to 40% by implementing data caching and prefetching with React Query.",
      "Enhanced UI/UX with AI tools like Cursor and Claude, leading to a 25% boost in user engagement metrics.",
      "Authored 50+ automated test cases for the image service using Supertest and Jest, increasing test coverage to 85%.",
    ],
    technologies: ["Blockchain", "React", "TypeScript", "Node.js", "Express", "Waves Protocol", "Vite", "React Query", "Recoil", "Scss", "NFT", "Smart Contracts"],
    color: "from-emerald-300 to-emerald-600",
    companyLogo: "https://arkimals-game.com/img/landingMain/logo.svg",
    companyLogoStyle: "",
  },
  // {
  //   title: "Full Stack Developer",
  //   company: "ParivartanX PRIVATE LIMITED",
  //   companyLink: "https://parivartanx.com/",
  //   location: "Remote",
  //   period: "March 2025 - May 2025",
  //   description: "A founding engineer who contributed heavily to building the backend using various libraries.",
  //   achievements: [
  //     "Built a full-stack application in a team of 5 using Next.js, React.js, TypeScript, and Tailwind CSS.",
  //     "Developed a custom backend architecture with Node.js and PostgreSQL for scalable data handling.",
  //     "Created robust REST APIs using Express.js to streamline server-side communication.",
  //     "Implemented a secure authentication flow using JWT for user verification and access control.",
  //   ],
  //   technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "PostgreSQL", "Prisma", "Neon", "ShadCN", "Zod", "REST API", "react Hook Form", "Tanstack Query", "Zustand", "Framer Motion"],
  //   color: "from-blue-300 to-blue-600",
  //   companyLogo: "https://parivartanx.com/parivartanx.png",
  //   companyLogoStyle: "sm:h-12 sm:w-12 h-8 w-8 -translate-x-1 mr-2 rounded-full",
  // },
  {
    title: "Frontend Developer",
    company: "Neotix Lab Private Limited",
    companyLink: "https://raffl.vercel.app/",
    location: "Remote",
    period: "Feb 2024 - May 2025",
    description: "Worked on the frontend of the Raffl's website using Nextjs, React.js, TypeScript, NextUI, framer-motion, and Zustand.",
    achievements: [
      "Developed the frontend for Raffl, a web3 platform enabling users to create raffles, write blogs, and design quests, resulting in a 40% increase in user participation.",
      "Implemented an intuitive UX that improved user satisfaction scores by 30% through streamlined navigation and interactive components.",
      "Designed an attractive user interface that boosted user engagement and increased average session duration by 25%.",
    ],
    technologies: ["Next.js", "React", "TypeScript", "NextUI", "Tailwind CSS", "Zustand", "Framer Motion"],
    color: "from-yellow-200 to-yellow-400",
    companyLogo: "https://raffl.vercel.app/RAFFL_LOGO.svg",
    companyLogoStyle: "sm:h-12 sm:w-12 h-8 w-8 translate-x-0 mr-2 rounded-full scale-[3.5]",
  },
];

// Skills data with improved typing
export const SkillsData: SkillCategory = {
  frontend: [
    { name: "NextJS", level: 85 },
    { name: "React", level: 90 },
    { name: "Typescript", level: 80 },
    { name: "ShadCn", level: 85 },
    { name: "Tailwind", level: 90 },
  ],
  backend: [
    { name: "Next.JS", level: 85 },
    { name: "NodeJS", level: 85 },
    { name: "Express", level: 80 },
    { name: "Prisma", level: 70 },
    { name: "PostgreSQL", level: 75 },
    { name: "MongoDB", level: 80 },
  ],
  other: [
    { name: "Docker", level: 75 },
    { name: "Stripe", level: 70 },
    { name: "Git", level: 90 },
  ],
};

// Personal information
export const PersonalData: PersonalInfo = {
  name: "Sujal Kesharwani",
  role: "Fullstack Developer",
  greet: "Welcome to my portfolio",
  greetIcon: "👋",
  bio: "Hi, I'm Sujal Kesharwani, a full stack developer with experience in building scalable web apps using modern industry technologies. I'm always curious and excited to explore new things.",
  profileImage: "/Sujal.jpg",
  links: {
    github: "https://github.com/sujal12344",
    twitter: "https://twitter.com/Sujalkeshar220",
    linkedin: "https://www.linkedin.com/in/sujal-kesharwani-518798368/",
    resume: "https://childish.tiiny.site/",
    linktree: "https://linktr.ee/childishhh",
  },
  tech_stack: {
    name: "Tech Stack",
    items: ["Next.js", "TypeScript", "PostgreSQL", "Prisma"],
  },
  currently_exploring: {
    name: "Currently Exploring",
    items: [ "Python", "AI SDK", "Solidity"],
  },
  dev_tools: {
    name: "Dev Tools",
    items: ["Docker", "AWS", "Vercel AI SDK", "Stripe", "Git"],
  },
};

// Metadata configuration
export const MetaData: Metadata = {
  title: "Sujal's Portfolio",
  icons: {
    icon: "/childish.png",
    shortcut: "/childish.png",
    apple: "/childish.png",
  },
  description: "Portfolio of Sujal, A full stack developer and a curious mind",
  keywords: ["Sujal Kesharwani", "Full Stack Developer", "Portfolio", "Web Development", "Next.js", "React", "TypeScript"],
  robots: { index: true, follow: true },
};

// Navigation links
export const NavLinks: NavLinkItem[] = [
  { name: "Home", href: "#home" },
  { name: "Skills", href: "#skills" },
  { name: "Experience", href: "#experience" },
  { name: "Projects", href: "#projects" },
  { name: "Services", href: "#services" },
  { name: "Contact", href: "#contact" },
];

// Header creation utility
const createHeaderItem = (
  name: HeaderName,
  number: string,
  title: string,
  subtitle: string,
  description: string
): HeaderItem => ({
  name,
  number,
  title,
  subtitle,
  description,
  background: `<${name}>`,
  backgroundClosing: `</${name}>`,
});

// Headers configuration
export const Headers: HeaderItem[] = [
  createHeaderItem("skills", "01", "Skills & Expertise", "Technical Proficiency", "In the middle of difficulty lies opportunity. Explore my web of skills and technologies."),
  createHeaderItem("experience", "02", "Work Experience", "My Coding Journey", "Staying with the problems long enough — not just intelligent, but persistent."),
  createHeaderItem("projects", "03", "Featured Projects", "Problems and Paradigms", "Weaving the web, one solution at a time. Explore my technical projects that solve real-world problems."),
  createHeaderItem("services", "04", "Services", "PASSION FUELS PURPOSE", "A passionate developer with a curiosity for new technologies"),
  createHeaderItem("contact", "05", "Get In Touch", "Let's Build Something Amazing Together", "Have a project in mind or just want to connect? Reach out and let's start a conversation."),
];

// Utility functions for data access
export const getHeaderByName = (name: HeaderName): HeaderItem | undefined =>
  Headers.find(header => header.name === name);

export const getFeaturedProjects = (): ProjectType[] =>
  ProjectData.filter(project => project.isFeatured);

export const getProjectById = (id: number): ProjectType | undefined =>
  ProjectData.find(project => project.id === id);
