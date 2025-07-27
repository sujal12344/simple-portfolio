import { Component, Server, Braces } from "lucide-react";

// Constants and configuration
export const SERVICES_CONSTANTS = {
  ANIMATIONS: {
    CARD_HOVER_Y: -8,
    CARD_DURATION: 0.3,
    SPRING_DURATION: 1,
    SPRING_BOUNCE: 0.2,
  },
  CODE_SNIPPET: {
    COLORS: {
      KEYWORD: "text-blue-400",
      VARIABLE: "text-green-400",
      PROPERTY: "text-pink-400",
      STRING: "text-orange-300",
      MUTED: "text-muted-foreground",
    },
  },
} as const;

// Service data structure
export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  details: string;
  modalChecks: string[];
  direction: "left" | "right" | "bottom";
}

// Animation variants
export const getCardAnimation = (direction: "left" | "right" | "bottom") => {
  const animations = {
    left: { opacity: 0.2, x: -100, y: 0 },
    right: { opacity: 0.2, x: 100, y: 0 },
    bottom: { opacity: 0.2, y: 100, x: 0 },
  };
  return animations[direction];
};

export const cardVariants = {
  hidden: (direction: "left" | "right" | "bottom") =>
    getCardAnimation(direction),
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: {
      type: "spring",
      duration: SERVICES_CONSTANTS.ANIMATIONS.SPRING_DURATION,
      bounce: SERVICES_CONSTANTS.ANIMATIONS.SPRING_BOUNCE,
    },
  },
  hover: {
    y: SERVICES_CONSTANTS.ANIMATIONS.CARD_HOVER_Y,
    transition: { duration: SERVICES_CONSTANTS.ANIMATIONS.CARD_DURATION },
  },
};

// Services data
export const servicesData: ServiceItem[] = [
  {
    id: "frontend",
    title: "Front-End Development",
    description: "Creating responsive, interactive UIs",
    icon: <Component className="h-6 w-6 text-primary" />,
    details:
      "I turn designs into pixel-perfect, responsive UIs that offer intuitive and engaging user experiences.",
    modalChecks: [
      "Creating smooth animation, effects that enhance UX (User Experience).",
      "Building responsive layouts that work across all devices and screen sizes.",
      "Implementing interactive elements using modern JavaScript frameworks.",
      "Optimizing for performance with code splitting and lazy loading.",
    ],
    direction: "left",
  },
  {
    id: "backend",
    title: "Back-End Development",
    description: "Powerful, scalable server solutions",
    icon: <Server className="h-6 w-6 text-primary" />,
    details:
      "I develop robust APIs and scalable back-end systems to power complex business workflows with efficiency.",
    modalChecks: [
      "Creating efficient database schemas and query optimizations.",
      "Creating RESTful APIs that enable efficient, scalable data communication.",
      "Setting up secure authentication and authorization systems.",
      "Implementing caching strategies for better performance.",
    ],
    direction: "bottom",
  },
  {
    id: "fullstack",
    title: "Full-Stack Development",
    description: "End-to-end application solutions",
    icon: <Braces className="h-6 w-6 text-primary" />,
    details:
      "I deliver full-stack solutions from concept to deployment, managing both front-end and back-end seamlessly.",
    modalChecks: [
      "Developing efficient logic with serverless functions using Next.js and TypeScript.",
      "Optimizing entire application stacks for performance and scalability.",
      "Architecting complete solutions that integrate front-end and back-end systems.",
      "Providing ongoing maintenance and feature development.",
    ],
    direction: "right",
  },
];

// Code snippet data
export const codeSnippetData = {
  filename: "my-approach.js",
  content: [
    {
      type: "declaration",
      keyword: "const",
      variable: "myApproach",
      operator: " = {",
    },
    {
      type: "property",
      key: "problemSolving",
      value: "'Breaking complex problems into manageable parts'",
    },
    {
      type: "property",
      key: "codingStyle",
      value: "'Clean, maintainable, and well-documented'",
    },
    {
      type: "property",
      key: "userFocus",
      value: "'Creating intuitive interfaces with exceptional UX'",
    },
    {
      type: "property",
      key: "communication",
      value: "'Clear, honest, and collaborative'",
    },
    { type: "closing", content: "};" },
  ],
};
