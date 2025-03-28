"use client";
import React from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  MoveRight,
  Component,
  Server,
  Asterisk,
  Code,
  Terminal,
  Braces,
} from "lucide-react";
import DialogModal from "@/components/ui/dialogmodal";

const About = () => {
  return (
    <div id="about" className="overflow-x-hidden py-20 relative">
      {/* Background elements - terminal-like decorations */}
      <div className="absolute top-20 left-0 opacity-5 text-6xl font-mono">
        {"<about>"}
      </div>
      <div className="absolute bottom-20 right-0 opacity-5 text-6xl font-mono">
        {"</about>"}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header with improved animation */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-8 flex flex-col items-center"
        >
          <div className="flex items-center gap-2 mb-2">
            <div className="h-px w-5 bg-primary" />
            <span className="text-primary font-mono text-sm px-3 py-1 rounded-full bg-primary/10 border border-primary/20">
              01. <span className="text-foreground">About & Services</span>
            </span>
            <div className="h-px w-5 bg-primary" />
          </div>

          <motion.h1
            initial={{ y: 20 }}
            whileInView={{ y: 0 }}
            transition={{ duration: 0.7, type: "spring" }}
            viewport={{ once: true }}
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-3 tracking-tight"
          >
            PASSION FUELS PURPOSE.
          </motion.h1>

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-muted-foreground text-center max-w-2xl mx-auto text-lg"
          >
            I build full-stack applications with modern technologies, focusing
            on clean code, performance, and exceptional user experiences.
          </motion.p>
        </motion.div>

        {/* Service cards with improved layout and animations */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
          {/* Front-End Card */}
          <ServiceCard
            title="Front-End Development"
            description="Creating responsive, interactive UIs"
            icon={<Component className="h-6 w-6 text-primary" />}
            details="I transform designs into pixel-perfect, responsive interfaces that users love to interact with."
            modalChecks={[
              "Building responsive layouts that work across all devices and screen sizes.",
              "Implementing interactive elements using modern JavaScript frameworks.",
              "Optimizing for performance with code splitting and lazy loading.",
              "Creating accessible interfaces that follow WCAG guidelines.",
            ]}
            direction="left"
          />

          {/* Back-End Card */}
          <ServiceCard
            title="Back-End Development"
            description="Powerful, scalable server solutions"
            icon={<Server className="h-6 w-6 text-primary" />}
            details="I build robust APIs and server-side applications that handle complex business logic efficiently."
            modalChecks={[
              "Designing and implementing RESTful and GraphQL APIs.",
              "Setting up secure authentication and authorization systems.",
              "Creating efficient database schemas and query optimizations.",
              "Implementing caching strategies for better performance.",
            ]}
            direction="bottom"
          />

          {/* Full-Stack Card */}
          <ServiceCard
            title="Full-Stack Development"
            description="End-to-end application solutions"
            icon={<Braces className="h-6 w-6 text-primary" />}
            details="I deliver complete applications from concept to deployment, handling both client and server sides."
            modalChecks={[
              "Architecting complete solutions that integrate front-end and back-end systems.",
              "Implementing CI/CD pipelines for automated testing and deployment.",
              "Optimizing entire application stacks for performance and scalability.",
              "Providing ongoing maintenance and feature development.",
            ]}
            direction="right"
          />
        </div>

        {/* Code snippet section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mt-24 max-w-3xl mx-auto bg-secondary/50 rounded-lg border border-primary/10 overflow-hidden"
        >
          <div className="flex items-center gap-2 px-4 py-3 bg-secondary border-b border-primary/10">
            <div className="flex space-x-2">
              <div className="h-3 w-3 rounded-full bg-destructive" />
              <div className="h-3 w-3 rounded-full bg-yellow-500" />
              <div className="h-3 w-3 rounded-full bg-green-500" />
            </div>
            <div className="flex-1 text-center">
              <span className="text-xs font-mono text-muted-foreground">
                my-approach.js
              </span>
            </div>
          </div>

          <div className="p-6 font-mono text-sm space-y-3">
            <div className="text-muted-foreground">
              <span className="text-blue-400">const</span>{" "}
              <span className="text-green-400">myApproach</span> = {"{"}
            </div>
            <div className="pl-6">
              <span className="text-pink-400">problemSolving:</span>{" "}
              <span className="text-orange-300">
                'Breaking complex problems into manageable parts'
              </span>
              ,
            </div>
            <div className="pl-6">
              <span className="text-pink-400">codingStyle:</span>{" "}
              <span className="text-orange-300">
                'Clean, maintainable, and well-documented'
              </span>
              ,
            </div>
            <div className="pl-6">
              <span className="text-pink-400">userFocus:</span>{" "}
              <span className="text-orange-300">
                'Creating intuitive interfaces with exceptional UX'
              </span>
              ,
            </div>
            <div className="pl-6">
              <span className="text-pink-400">communication:</span>{" "}
              <span className="text-orange-300">
                'Clear, honest, and collaborative'
              </span>
              ,
            </div>
            <div className="text-muted-foreground">{"};"}</div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

// Helper component for service cards
const ServiceCard = ({
  title,
  description,
  icon,
  details,
  modalChecks,
  direction,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  details: string;
  modalChecks: string[];
  direction: "left" | "right" | "bottom";
}) => {
  // Set animation based on direction
  const getAnimation = () => {
    if (direction === "left") return { opacity: 0.2, x: -100, y: 0 };
    if (direction === "right") return { opacity: 0.2, x: 100, y: 0 };
    return { opacity: 0.2, y: 100 };
  };

  return (
    <motion.div
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      initial={getAnimation()}
      transition={{ type: "spring", duration: 1, bounce: 0.2 }}
      viewport={{ once: true, margin: "-100px" }}
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
      className="rounded shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
    >
      <Card className="h-full border border-primary/10 bg-card/50 backdrop-blur-sm hover:border-primary/30 transition-all">
        <CardHeader className="relative pb-0">
          <div className="absolute top-8 right-6 bg-primary/10 p-2 rounded-full">
            {icon}
          </div>
          <CardTitle className="text-xl font-bold">{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>

        <CardContent className="pt-6">
          <div className="space-y-2">
            <div className="h-0.5 w-12 bg-primary/50 rounded-full mb-4" />
            <p className="text-muted-foreground">{details}</p>
          </div>
        </CardContent>

        <DialogModal
          title={title}
          check1={modalChecks[0]}
          check2={modalChecks[1]}
          check3={modalChecks[2]}
          check4={modalChecks[3]}
        >
          <CardFooter className="pt-0">
            <div className="w-full">
              <div className="flex items-center justify-center group">
                <h3 className="font-medium text-primary group-hover:underline transition-all cursor-pointer">
                  View details
                </h3>
                <MoveRight className="w-5 ml-1 text-primary opacity-70 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </CardFooter>
        </DialogModal>
      </Card>
    </motion.div>
  );
};

export default About;
