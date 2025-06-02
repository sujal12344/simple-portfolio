import { Code, Gamepad, Terminal } from "lucide-react";

export const ProjectData = [
  {
    id: 1,
    title: "Socially",
    description:
      "A modern social media platform built with Next.js, React, and TypeScript. Features user authentication, posts, comments, likes, messaging, friend requests, notifications, and customizable profiles with dark/light mode support.",
    github: "https://github.com/sujal12344/Socially",
    ImageUrl: "/images/Socially.png",
    websiteUrl: "https://socially-blond.vercel.app/",
    isFeatured: true,
  },
  {
    id: 2,
    title: "AI Companion",
    description:
      "AI-Companion is a cool software that lets you create your own custom AI models of people you admire, like actors or celebrities. It's a tool to make personalized artificial intelligence companions based on your favorite individuals.",
    github: "https://github.com/sujal12344/AI-Companion-Builder",
    ImageUrl: "/images/AI-Companion.png",
    websiteUrl: "https://ai-companion-builder.vercel.app/",
    isFeatured: true,
  },
  {
    id: 3,
    title: "Chatting Application",
    description:
      "A real-time chat application using the MERN stack (MongoDB, Express, React, Node.js) with Socket.IO for instant messaging. The app should enable user account creation, secure real-time communication, and deliver a smooth, responsive chat experience.",
    github: "https://github.com/sujal12344/chat-app",
    ImageUrl: "/images/chat-App.png",
    websiteUrl: "https://chat-app-fyek.onrender.com/",
    isFeatured: true,
  },
  {
    id: 4,
    title: "E-Commernce-Store",
    description:
      "An E-Commernce-Store where user easily buy good quality clothes and stylish shoes, glasses, bags, accessories, etc.",
    github: "https://github.com/sujal12344/E-commernce-website",
    ImageUrl: "/images/E-com.png",
    websiteUrl: "https://e-commernce-website.onrender.com/",
    isFeatured: false,
  },
];

export const experiences = [
  {
    title: "Frontend Developer",
    company: "Neotix Lab Private Limited",
    companyLink: "https://raffl.pro/",
    location: "Remote",
    period: "Sep 2024 - Jan 2025",
    description: `Worked on the frontend of the Raffl's website using Nextjs, React.js, TypeScript,  NextUI, framar-motion, and Zustand.`,
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
    period: "March 2024 - April 2025",
    description:
      "A founding engineer who contributed heavily to building the backend using various AI libraries.",
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
    period: "May 2025 - Present",
    description: `Contributed to blockchain-integrated NFT games like Waves Ducks and Arkimals under the Waves Protocol ecosystem.`,
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

export const skillsData = {
  frontend: [
    { name: "NextJS", level: 85 },
    { name: "React", level: 90 },
    { name: "Typescript", level: 80 },
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
    { name: "Git", level: 90 },
    { name: "Docker", level: 75 },
    { name: "Stripe", level: 70 },
    { name: "VectorDB", level: 65 },
    { name: "Langchain", level: 70 },
    { name: "S3", level: 75 },
  ],
};

export const personalData = {
  name: "Sujal Kesharwani",
  bio: "Hi, I'm Sujal Kesharwani, a full stack developer with experience in building scalable web apps using modern industry technologies. I'm always curious and excited to explore new things.",
  links: {
    github: "https://github.com/sujal12344",
    twitter: "https://twitter.com/Sujalkeshar220",
    linkedin: "https://www.linkedin.com/in/sujal-kesharwani-518798368/",
    resume: "https://childish.tiiny.site/",
  },
};
