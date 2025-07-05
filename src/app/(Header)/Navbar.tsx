"use client";
import React, { useState, useEffect, useRef } from "react";
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
import { NavLinks, PersonalData } from "../../../data/data";

const Navbar = () => {
  const [activeSection, setActiveSection] = useState("home");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { setTheme, theme } = useTheme();

  // Add refs to track manual navigation and scrolling state
  const isManualNavigation = useRef(false);
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);

  // Track scroll position for navbar styling and active section
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Don't detect sections if we're in manual navigation mode
      if (isManualNavigation.current) return;

      const sections = NavLinks.map(link => link.name.toLowerCase());

      // Find the section that is currently most visible in the viewport
      let maxVisibleSection = "";
      let maxVisibleHeight = 0;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();

          // Get responsive navbar height
          const navbarHeight = window.innerWidth < 640 ? 60 : 80;

          // Calculate how much of the section is visible in the viewport
          const visibleTop = Math.max(rect.top, navbarHeight);
          const visibleBottom = Math.min(rect.bottom, window.innerHeight);
          const visibleHeight = Math.max(0, visibleBottom - visibleTop);

          // If this section has more visible area than previous max, make it the active section
          if (visibleHeight > maxVisibleHeight) {
            maxVisibleHeight = visibleHeight;
            maxVisibleSection = section;
          }
        }
      }

      // Only update if we found a visible section and it's different from current
      if (maxVisibleSection && maxVisibleSection !== activeSection) {
        setActiveSection(maxVisibleSection);
      }
    };

    // Initialize on first render
    setTimeout(handleScroll, 300);

    // Add event listener
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Clean up event listener on component unmount
    return () => window.removeEventListener("scroll", handleScroll);
  }, [activeSection]);

  // Scroll to section with offset for fixed navbar
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (!element) return;

    // Mark that we're doing manual navigation
    isManualNavigation.current = true;

    // Set active section immediately for UI feedback
    setActiveSection(sectionId);

    // Get responsive navbar height
    const navbarHeight = window.innerWidth < 640 ? 60 : 80;

    // Calculate the position to scroll to
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.scrollY - navbarHeight;

    // Smooth scroll to the element
    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });

    // Reset manual navigation flag after scrolling finishes
    // This allows time for the scroll to complete before resuming automatic detection
    if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
    scrollTimeout.current = setTimeout(() => {
      isManualNavigation.current = false;
    }, 1000); // Wait 1 second after clicking before resuming scroll detection
  };

  const {
    name,
    links: { twitter, github, linkedin, resume },
  } = PersonalData;

  const initials = name.split(' ').map(n => n[0]).join('');

  return (
    <>
      {/* Desktop Navigation */}
      <nav
        className={`sm:flex hidden w-full fixed py-3 sm:py-4 px-4 sm:px-6 justify-between items-center z-50 transition-all duration-500 lg:px-20 xl:px-32 2xl:px-40 ${
          isScrolled
            ? "bg-background/95 backdrop-blur-md shadow-md border-b border-primary/10"
            : "bg-background/50 backdrop-blur-sm"
        }`}
      >
        {/* Logo/Avatar area - adjusted for better small screen support */}
        <div className="w-auto sm:w-1/3 flex items-center">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex space-x-2 sm:space-x-3 items-center group"
          >
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="p-0 h-auto w-auto rounded-full"
                >
                  <Avatar className="h-9 w-9 ring-2 ring-primary/20 transition-all hover:ring-primary/70 shadow-md cursor-pointer">
                    <AvatarImage src={`${github}.png`} alt="Profile" />
                    <AvatarFallback>
                      <span className="text-xs">{initials}</span>
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-56">
                <DropdownMenuLabel>Connect with me</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer hover:bg-primary/10">
                  <a
                    className="flex items-center w-full"
                    target="_blank"
                    href={github}
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
                    href={twitter}
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
                    href={linkedin}
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
                    href={resume}
                    rel="noopener noreferrer"
                  >
                    <File className="mr-2 h-4 w-4" />
                    <span>Resume</span>
                  </a>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <motion.h3
              className="font-medium text-sm sm:text-base flex items-center group-hover:text-primary transition-colors duration-300 cursor-pointer"
              whileHover={{ color: "hsl(var(--primary))" }}
            >
              {name}
            </motion.h3>
          </motion.div>
        </div>

        {/* Navigation Links - improved responsive spacing */}
        <ul className="flex flex-grow justify-center items-center space-x-2 sm:space-x-4 md:space-x-6">
          {NavLinks.map((link) => (
            <motion.li
              key={link.name}
              initial={{ opacity: 0.8 }}
              whileHover={{
                scale: 1.05,
                transition: { duration: 0.2 },
              }}
              whileTap={{ scale: 0.95 }}
              className={`relative px-2 sm:px-3 py-1.5 sm:py-2 rounded-md transition-all duration-300 text-sm ${
                activeSection === link.href.substring(1)
                  ? "text-primary font-medium bg-primary/5"
                  : "hover:bg-secondary/80"
              }`}
            >
              <a
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  const targetId = link.href.replace("#", "");

                  // Highlight clicked item immediately for better feedback
                  setActiveSection(targetId);

                  // Close mobile menu if open
                  if (isMobileMenuOpen) setIsMobileMenuOpen(false);

                  // Use custom scroll function
                  scrollToSection(targetId);
                }}
                className="flex items-center justify-center"
              >
                {link.name}
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
        </ul>

        {/* Theme Switcher */}
        <div className="flex-shrink-0">
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
        </div>
      </nav>

      {/* Mobile Navigation - Enhanced and fixed */}
      <nav
        className={`sm:hidden fixed top-0 left-0 right-0 z-50 p-3 ${
          isScrolled
            ? "bg-background/95 backdrop-blur-md shadow-sm"
            : "bg-background/70 backdrop-blur-sm"
        }`}
      >
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src={`${github}.png`} alt="Profile" />
              <AvatarFallback>SK</AvatarFallback>
            </Avatar>
            <span className="font-medium text-sm">{name}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="h-8 w-8"
              aria-label="Toggle theme"
            >
              {theme === "light" ? (
                <Moon className="h-4 w-4" />
              ) : (
                <Sun className="h-4 w-4" />
              )}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
              className="h-8 w-8"
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute top-full left-0 right-0 bg-background/95 backdrop-blur-lg shadow-lg border-t border-primary/10 rounded-b-lg overflow-hidden"
            >
              <ul className="py-2">
                {NavLinks.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className={`block px-6 py-3 text-sm ${
                        activeSection === link.href.substring(1)
                          ? "text-primary font-medium bg-primary/5"
                          : ""
                      }`}
                      onClick={(e) => {
                        e.preventDefault();
                        const targetId = link.href.replace("#", "");

                        // Set active section
                        setActiveSection(targetId);

                        // Close the mobile menu
                        setIsMobileMenuOpen(false);

                        // Use custom scroll function with correct offset
                        setTimeout(() => {
                          scrollToSection(targetId);
                        }, 100);
                      }}
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
                <li className="px-6 py-3 border-t border-primary/10">
                  <div className="flex space-x-6 justify-center mt-2">
                    <a
                      href={github}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="GitHub"
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      <Github className="h-5 w-5" />
                    </a>
                    <a
                      href={twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Twitter"
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      <Twitter className="h-5 w-5" />
                    </a>
                    <a
                      href={linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="LinkedIn"
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      <LinkedinIcon className="h-5 w-5" />
                    </a>
                    <a
                      href={resume}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Resume"
                      className="text-muted-foreground hover:text-primary transition-colors"
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
