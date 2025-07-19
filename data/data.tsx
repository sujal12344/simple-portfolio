import { Code, Gamepad, Terminal } from "lucide-react";
import { Metadata } from "next";
import {
  HeaderItem,
  HeaderName,
  ProjectType,
  PersonalInfo,
  NavLinkItem,
} from "./data_types";

export const ProjectData: ProjectType[] = [
  {
    id: 1,
    title: "Socially",
    description:
      "A modern social media platform built with Next.js, React, and TypeScript. Features user authentication, posts, comments, likes, messaging, friend requests, notifications, and customizable profiles with dark/light mode support.",
    github: "https://github.com/sujal12344/Socially",
    ImageUrl: "/Socially.png",
    websiteUrl: "https://socially-blond.vercel.app/",
    isFeatured: true,
  },
  {
    id: 2,
    title: "AI Companion",
    description:
      "AI-Companion is a cool software that lets you create your own custom AI models of people you admire, like actors or celebrities. It's a tool to make personalized artificial intelligence companions based on your favorite individuals.",
    github: "https://github.com/sujal12344/AI-Companion-Builder",
    ImageUrl: "/AI-Companion.png",
    websiteUrl: "https://ai-companion-builder.vercel.app/",
    isFeatured: true,
  },
  {
    id: 3,
    title: "Chatting Application",
    description:
      "A real-time chat application using the MERN stack (MongoDB, Express, React, Node.js) with Socket.IO for instant messaging. The app should enable user account creation, secure real-time communication, and deliver a smooth, responsive chat experience.",
    github: "https://github.com/sujal12344/chat-app",
    ImageUrl: "/chat-App.png",
    websiteUrl: "https://chat-app-fyek.onrender.com/",
    isFeatured: true,
  },
  {
    id: 4,
    title: "E-Commernce-Store",
    description:
      "An E-Commernce-Store where user easily buy good quality clothes and stylish shoes, glasses, bags, accessories, etc.",
    github: "https://github.com/sujal12344/E-commernce-website",
    ImageUrl: "/E-com.png",
    websiteUrl: "https://e-commernce-website.onrender.com/",
    isFeatured: false,
  },
];

export const Experiences = [
  {
    title: "Frontend Developer",
    company: "Neotix Lab Private Limited",
    companyLink: "https://raffl.pro/",
    location: "Remote",
    period: "Sep 2024 - Jan 2025",
    description:
      "Worked on the frontend of the Raffl's website using Nextjs, React.js, TypeScript,  NextUI, framar-motion, and Zustand.",
    achievements: [
      "Established file structure and refactored large production-ready application",
      "Managed global state using Zustand",
      "Implemented responsive design using Tailwind CSS",
      "Implemented form validation using Zod with Next UI styling",
      "Implemented lazy loading of components in React (lodash) for improved performance",
      "Debugged code efficiently using React Dev Tools",
    ],
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "NextUI",
      "Tailwind CSS",
      "Zustand",
      "Framer Motion",
    ],
    color: "from-blue-500 to-blue-600",
    icon: <Code className="h-5 w-5" />,
  },
  {
    title: "Full Stack Developer",
    company: "ParivartanX PRIVATE LIMITED",
    companyLink: "https://parivartanx.com/",
    location: "Remote",
    period: "March 2025 - May 2025",
    description:
      "A founding engineer who contributed heavily to building the backend using various libraries.",
    achievements: [
      "Built a full-stack application in a team of 5 using Next.js, React.js, TypeScript, and Tailwind CSS.",
      "Developed a custom backend architecture with Node.js and PostgreSQL for scalable data handling.",
      "Created robust REST APIs using Express.js to streamline server-side communication.",
      "Implemented a secure authentication flow using JWT for user verification and access control.",
    ],
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "PostgreSQL",
      "Prisma",
      "Neon",
      "ShadCN",
      "Zod",
      "REST API",
      "react Hook Form",
      "Tanstack Query",
      "Zustand",
      "Framer Motion",
      "etc",
    ],
    color: "from-emerald-500 to-emerald-600",
    icon: <Terminal className="h-5 w-5" />,
  },
  {
    title: "Full Stack Developer",
    company: "Waves Ducks",
    companyLink: "https://wavesducks.com/",
    location: "Remote",
    period: "May 2025 - July 2025",
    description:
      "Contributed to blockchain-integrated NFT games like Waves Ducks and Arkimals under the Waves Protocol ecosystem.",
    achievements: [
      "Developed smart NFT game features using JavaScript and Waves blockchain APIs",
      "Integrated breeding and trading logic in the Waves Ducks ecosystem",
      "Collaborated with blockchain developers to ensure secure asset handling",
      "Worked on UI/UX for Arkimals NFT gameplay experience",
    ],
    technologies: [
      "Blockchain",
      "React",
      "TypeScript",
      "Node.js",
      "Express",
      "Waves Protocol",
      "Vite",
      "React Query",
      "Recoil",
      "Scss",
      "NFT",
      "Smart Contracts",
    ],
    color: "from-yellow-500 to-yellow-600",
    icon: <Gamepad className="h-5 w-5" />,
  },
];

export const SkillsData = {
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
    // { name: "VectorDB", level: 65 },
    // { name: "Langchain", level: 70 },
    // { name: "S3", level: 75 },
  ],
};

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
  dev_tools: {
    name: "Dev Tools",
    items: ["Docker", "AWS", "Vercel AI SDK", "Stripe", "Git"],
  },
};

export const MetaData: Metadata = {
  title: "Sujal's Portfolio",
  icons: {
    icon: "/childish.png",
    shortcut: "/childish.png",
    apple: "/childish.png",
  },
  description: "Portfolio of Sujal, A full stack developer and a curious mind",
  keywords: [
    "Sujal Kesharwani",
    "Full Stack Developer",
    "Portfolio",
    "Web Development",
    "Next.js",
    "React",
    "TypeScript",
  ],
  // openGraph: {
  //   title: "Sujal's Portfolio",
  //   description:
  //     "Portfolio of Sujal, A full stack developer and a curious mind",
  //   url: "https://sujal-portfolio.vercel.app/",
  //   siteName: "Sujal's Portfolio",
  //   images: [
  //     {
  //       url: "/childish.png",
  //       width: 800,
  //       height: 600,
  //       alt: "Sujal's Portfolio",
  //     },
  //   ],
  //   locale: "en_US",
  //   type: "website",
  // },
  // twitter: {
  //   card: "summary_large_image",
  //   title: "Sujal's Portfolio",
  //   description:
  //     "Portfolio of Sujal, A full stack developer and a curious mind",
  //   images: ["/childish.png"],
  //   creator: "@Sujalkeshar220",
  // },
  robots: {
    index: true,
    follow: true,
  },
};

export const NavLinks: NavLinkItem[] = [
  { name: "Home", href: "#home" },
  { name: "Skills", href: "#skills" },
  { name: "Experience", href: "#experience" },
  { name: "Projects", href: "#projects" },
  // { name: "Background", href: "#background" },
  { name: "Services", href: "#services" },
  { name: "Contact", href: "#contact" },
];

const getBg = (name: HeaderName): string => "<" + name + ">";
const getBgClosing = (name: HeaderName): string => "</" + name + ">";

export const Headers: HeaderItem[] = [
  {
    name: "skills",
    number: "01",
    title: "Skills & Expertise",
    subtitle: "Technical Proficiency",
    description:
      "In the middle of difficulty lies opportunity. Explore my web of skills and technologies.",
    background: getBg("skills"),
    backgroundClosing: getBgClosing("skills"),
  },
  {
    name: "experience",
    number: "02",
    title: "Work Experience",
    subtitle: "My Coding Journey",
    description:
      "Staying with the problems long enough — not just intelligent, but persistent.",
    background: getBg("experience"),
    backgroundClosing: getBgClosing("experience"),
  },
  {
    name: "projects",
    number: "03",
    title: "Featured Projects",
    subtitle: "Problems and Paradigms",
    description:
      "Weaving the web, one solution at a time. Explore my technical projects that solve real-world problems.",
    background: getBg("projects"),
    backgroundClosing: getBgClosing("projects"),
  },
  {
    name: "services",
    number: "04",
    title: "Services",
    subtitle: "PASSION FUELS PURPOSE",
    description: "A passionate developer with a curiosity for new technologies",
    background: getBg("services"),
    backgroundClosing: getBgClosing("services"),
  },
  {
    name: "contact",
    number: "05",
    title: "Get In Touch",
    subtitle: "Let's Build Something Amazing Together",
    description:
      "Have a project in mind or just want to connect? Reach out and let's start a conversation.",
    background: getBg("contact"),
    backgroundClosing: getBgClosing("contact"),
  },
];
