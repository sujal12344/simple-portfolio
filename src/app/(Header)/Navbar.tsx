"use client";
import React, { useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Github,
  Twitter,
  LinkedinIcon,
  File,
  Menu,
  X,
  Moon,
  Sun,
} from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

import { motion, AnimatePresence } from "framer-motion";
import { Code } from "lucide-react";

const Navbar = () => {
  const [activeSection, setActiveSection] = useState("home");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { setTheme, theme } = useTheme();

  // Track scroll position for navbar styling and active section
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Determine active section based on scroll position
      const sections = ["home", "about", "skills", "projects", "contact"];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Experience", href: "#experience" },
    { name: "Projects", href: "#projects" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <>
      {/* Desktop Navigation */}
      <nav
        className={`sm:flex hidden w-full md:fixed py-4 px-6 justify-between items-center z-10 transition-all duration-500 ${
          isScrolled
            ? "bg-background/90 backdrop-blur-md shadow-md border-b border-primary/10"
            : ""
        }`}
      >
        <div className="w-1/3 flex-col flex items-center">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex space-x-3 items-center justify-center"
          >
            <DropdownMenu>
              <Avatar className="ring-2 ring-primary/20 transition-all hover:ring-primary/70 shadow-md">
                <DropdownMenuTrigger>
                  <AvatarImage
                    src="https://github.com/Sujal12344.png"
                    alt="Profile"
                  />
                  <AvatarFallback>
                    <span className="text-xs">Sujal</span>
                  </AvatarFallback>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>Connect with me</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="cursor-pointer hover:bg-primary/10">
                    <a
                      className="flex items-center w-full"
                      target="_blank"
                      href="https://github.com/Sujal12344"
                      rel="noopener noreferrer"
                    >
                      <Github className="mr-2 h-4 w-4" />
                      <span>GitHub</span>
                    </a>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer hover:bg-primary/10">
                    <a
                      className="flex items-center w-full"
                      target="_blank"
                      href="https://twitter.com/whycurious101"
                      rel="noopener noreferrer"
                    >
                      <Twitter className="mr-2 h-4 w-4" />
                      <span>Twitter</span>
                    </a>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer hover:bg-primary/10">
                    <a
                      className="flex items-center w-full"
                      target="_blank"
                      href="https://www.linkedin.com/in/sujal-kesharwani-978632258/"
                      rel="noopener noreferrer"
                    >
                      <LinkedinIcon className="mr-2 h-4 w-4" />
                      <span>LinkedIn</span>
                    </a>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer hover:bg-primary/10">
                    <a
                      className="flex items-center w-full"
                      target="_blank"
                      href="https://dhrishp.tiiny.site"
                      rel="noopener noreferrer"
                    >
                      <File className="mr-2 h-4 w-4" />
                      <span>Resume</span>
                    </a>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </Avatar>
              <motion.h3
                className="font-medium ml-2 flex items-center gap-1"
                whileHover={{ color: "hsl(var(--primary))" }}
              >
                {/* <Code className="h-4 w-4 text-primary" /> */}
                Sujal Kesharwani
              </motion.h3>
            </DropdownMenu>
          </motion.div>
        </div>

        <ul className="w-1/2 flex cursor-pointer mr-2 md:mr-2 items-center space-x-6 justify-center">
          {navLinks.map((link) => (
            <motion.li
              key={link.name}
              initial={{ opacity: 0.8 }}
              whileHover={{
                scale: 1.05,
                transition: { duration: 0.2 },
              }}
              whileTap={{ scale: 0.95 }}
              className={`relative px-3 py-2 rounded-md transition-all duration-300 ${
                activeSection === link.href.substring(1)
                  ? "text-primary font-medium bg-primary/5"
                  : "hover:bg-secondary/80"
              }`}
            >
              <a
                href={link.href}
                onClick={(e) => {
                  // Add smooth scrolling with a slight delay for better UX
                  e.preventDefault();
                  const href = link.href;
                  const targetId = href.replace("#", "");
                  const element = document.getElementById(targetId);

                  // Highlight clicked item immediately for better feedback
                  setActiveSection(targetId);

                  // Close mobile menu if open
                  if (isMobileMenuOpen) setIsMobileMenuOpen(false);

                  // Smooth scroll with slight delay for better UX
                  setTimeout(() => {
                    element?.scrollIntoView({ behavior: "smooth" });
                  }, 100);
                }}
                className="flex items-center justify-center space-x-1"
              >
                <span>{link.name}</span>
              </a>

              {/* Enhanced active indicator with animation */}
              {activeSection === link.href.substring(1) && (
                <motion.div
                  layoutId="activeSection"
                  className="absolute bottom-0 left-0 right-0 mx-auto w-full h-0.5 bg-primary"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 0.3 }}
                />
              )}
            </motion.li>
          ))}
          <li>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                  <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                  <span className="sr-only">Toggle theme</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setTheme("light")}>
                  <Sun className="mr-2 h-4 w-4" /> Light
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("dark")}>
                  <Moon className="mr-2 h-4 w-4" /> Dark
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("system")}>
                  System
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </li>
        </ul>
      </nav>

      {/* Mobile Navigation */}
      <nav
        className={`sm:hidden fixed top-0 left-0 right-0 z-50 p-4 ${
          isScrolled
            ? "bg-background/90 backdrop-blur-md shadow-sm"
            : "bg-background/50"
        }`}
      >
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Avatar className="h-8 w-8">
              <AvatarImage
                src="https://github.com/Sujal12344.png"
                alt="Profile"
              />
              <AvatarFallback>SK</AvatarFallback>
            </Avatar>
            <span className="font-medium">Sujal Kesharwani</span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </Button>
        </div>

        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full left-0 right-0 bg-background/95 backdrop-blur-lg shadow-lg border-t dark:border-gray-800 rounded-b-lg overflow-hidden"
            >
              <ul className="py-2">
                {navLinks.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className={`block px-6 py-3 ${
                        activeSection === link.href.substring(1)
                          ? "text-primary font-medium"
                          : ""
                      }`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
                <li className="px-6 py-3 flex items-center justify-between">
                  <span>Theme</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() =>
                      setTheme(theme === "dark" ? "light" : "dark")
                    }
                    aria-label="Toggle theme"
                  >
                    {theme === "dark" ? <Sun /> : <Moon />}
                  </Button>
                </li>
                <li className="px-6 py-3 border-t dark:border-gray-800">
                  <div className="flex space-x-4 justify-center mt-2">
                    <a
                      href="https://github.com/Sujal12344"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="GitHub"
                    >
                      <Github className="h-5 w-5" />
                    </a>
                    <a
                      href="https://twitter.com/whycurious101"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Twitter"
                    >
                      <Twitter className="h-5 w-5" />
                    </a>
                    <a
                      href="https://www.linkedin.com/in/sujal-kesharwani-978632258/"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="LinkedIn"
                    >
                      <LinkedinIcon className="h-5 w-5" />
                    </a>
                    <a
                      href="https://dhrishp.tiiny.site"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Resume"
                    >
                      <File className="h-5 w-5" />
                    </a>
                  </div>
                </li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
};

export default Navbar;
