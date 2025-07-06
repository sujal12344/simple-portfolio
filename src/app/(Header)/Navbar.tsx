"use client";
import React, { useState, useEffect, useRef, useMemo } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
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
  MoveLeft,
} from "lucide-react";
import { PiLinktreeLogoBold } from "react-icons/pi";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { NavLinks, PersonalData } from "../../../data/data";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const [activeSection, setActiveSection] = useState("home");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showDesktopSocial, setShowDesktopSocial] = useState(false);
  const [showMobileSocial, setShowMobileSocial] = useState(false);
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
    links: { twitter, github, linkedin, resume, linktree },
  } = PersonalData;

  const initials = name.split(' ').map(n => n[0]).join('');

  // Add this reusable component inside your Navbar component 
  // (before the return statement)
  const SocialPanel = ({ 
    isVisible, 
    onClose, 
    variant = "desktop",
    links,
    panelRef
  }: { 
    isVisible: boolean; 
    onClose: () => void; 
    variant?: "desktop" | "mobile";
    links: { 
      github: string; 
      twitter: string; 
      linkedin: string; 
      resume: string; 
      linktree: string;
    };
    panelRef: React.RefObject<HTMLDivElement>;
  }) => {
    // Adjust styling based on variant
    const styles = useMemo(() => ({
      container: variant === "desktop"
        ? "absolute top-12 left-0 w-max z-50"
        : "mt-2",
      iconSize: variant === "desktop" ? "h-5.5 w-5.5" : "h-5 w-5",
      circleSize: variant === "desktop" ? "w-11 h-11" : "w-10 h-10",
      labelSize: variant === "desktop" ? "text-[11px] mt-1" : "text-[10px] mt-0.5",
      animation: variant === "desktop"
        ? { initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: 5 } }
        : { initial: { opacity: 0, height: 0 }, animate: { opacity: 1, height: "auto" }, exit: { opacity: 0, height: 0 } }
    }), [variant]);

    const socialItems = [
      { icon: Github, label: "GitHub", url: links.github },
      { icon: Twitter, label: "Twitter", url: links.twitter },
      { icon: LinkedinIcon, label: "LinkedIn", url: links.linkedin },
      { icon: File, label: "Resume", url: links.resume },
      { icon: PiLinktreeLogoBold, label: "Links", url: links.linktree },
    ];

    return (
      <AnimatePresence>
        {isVisible && (
          <motion.div
            ref={panelRef}
            {...styles.animation}
            transition={{ duration: 0.2 }}
            className={`bg-background/95 backdrop-blur-md border border-primary/30 rounded-lg shadow-lg p-2 ${styles.container}`}
          >
            <div className="flex justify-between items-center px-2">
              <h3 className="text-sm font-medium">Connect with me</h3>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-6 w-6" 
                onClick={onClose}
              >
                <X className="h-3.5 w-3.5" />
              </Button>
            </div>
            
            <div className="grid grid-cols-5 gap-2 justify-center mt-2 p-1">
              {socialItems.map((item, i) => (
                <motion.a
                  key={item.label}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center gap-1.5 py-1.5 px-1 rounded-md"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.05, duration: 0.15 }}
                  whileHover={{ scale: 1.05, backgroundColor: "rgba(var(--primary), 0.1)" }}
                >
                  <div className={`${styles.circleSize} rounded-full bg-primary/10 flex items-center justify-center text-primary`}>
                    {<item.icon className={cn(item.icon === PiLinktreeLogoBold ? (variant === "desktop" ? "h-7 w-7" : "h-6 w-6") : styles.iconSize)} />}
                  </div>
                  <span className={styles.labelSize}>{item.label}</span>
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  };

  // Effect to handle clicks outside the panel and scrolling
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      // For desktop panel
      if (showDesktopSocial && 
          desktopPanelRef.current && 
          !desktopPanelRef.current.contains(e.target as Node) &&
          avatarDesktopRef.current && 
          !avatarDesktopRef.current.contains(e.target as Node)) {
        setShowDesktopSocial(false);
      }
      
      // For mobile panel
      if (showMobileSocial && 
          mobilePanelRef.current && 
          !mobilePanelRef.current.contains(e.target as Node) &&
          avatarMobileRef.current && 
          !avatarMobileRef.current.contains(e.target as Node)) {
        setShowMobileSocial(false);
      }
    };
    
    // Close panels on scroll
    const handleScroll = () => {
      if (showDesktopSocial) {
        setShowDesktopSocial(false);
      }
      if (showMobileSocial) {
        setShowMobileSocial(false);
      }
    };
    
    // Add event listeners
    document.addEventListener('mousedown', handleOutsideClick);
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Cleanup event listeners
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [showDesktopSocial, showMobileSocial]);

  // Refs for the panels
  const desktopPanelRef = useRef<HTMLDivElement>(null);
  const mobilePanelRef = useRef<HTMLDivElement>(null);
  const avatarDesktopRef = useRef<HTMLButtonElement>(null);
  const avatarMobileRef = useRef<HTMLButtonElement>(null);

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
          <div className="relative">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex space-x-2 sm:space-x-3 items-center group"
            >
              {/* Replace DropdownMenu with custom connect panel */}
              <Button
                ref={avatarDesktopRef}
                variant="ghost"
                className="p-0 h-auto w-auto rounded-full relative"
                onClick={() => setShowDesktopSocial(!showDesktopSocial)}
              >
                <div className="relative">
                  {/* Pinging animation */}
                  <span className="absolute inset-0 rounded-full animate-ping bg-primary/30 opacity-75"/>
                  
                  <Avatar className="h-9 w-9 ring-2 ring-primary/40 transition-all shadow-md">
                    <AvatarImage src={`${github}.png`} alt="Profile" />
                    <AvatarFallback>
                      <span className="text-xs">{initials}</span>
                    </AvatarFallback>
                  </Avatar>
                  
                  {/* Small notification badge */}
                  <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-primary rounded-full flex items-center justify-center">
                    <span className="text-[9px] text-white font-bold">+</span>
                  </span>
                </div>
              </Button>

              <div className="flex flex-col">
                <motion.h3
                  className="font-medium text-sm sm:text-base flex items-center group-hover:text-primary transition-colors duration-300"
                >
                  {name}
                </motion.h3>
                <span className="text-xs text-primary/90 flex items-center gap-2">
                  <MoveLeft className="h-4 w-4 sm:h-5 sm:w-5" />
                  Tap to connect
                </span>
              </div>
            </motion.div>
            
            {/* Use reusable SocialPanel component */}
            <SocialPanel 
              isVisible={showDesktopSocial} 
              onClose={() => setShowDesktopSocial(false)} 
              variant="desktop" 
              links={{ github, twitter, linkedin, resume, linktree }} 
              panelRef={desktopPanelRef}
            />
          </div>
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
            <div className="relative">
              {/* Pinging effect */}
              <span className="absolute inset-0 rounded-full animate-ping bg-primary/30 opacity-75"/>
              
              <Button
                ref={avatarMobileRef}
                variant="ghost"
                className="p-0 h-auto w-auto rounded-full"
                onClick={() => setShowMobileSocial(!showMobileSocial)}
              >
                <Avatar className="h-8 w-8 ring-2 ring-primary/40">
                  <AvatarImage src={`${github}.png`} alt="Profile" />
                  <AvatarFallback>{initials}</AvatarFallback>
                </Avatar>
                
                {/* Small notification badge */}
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full flex items-center justify-center">
                  <span className="text-[8px] text-white font-bold">+</span>
                </span>
              </Button>
            </div>
            
            <div className="flex flex-col">
              <span className="font-medium text-sm">{name}</span>
              <span className="text-[11px] text-primary/90 flex items-center gap-2">
                <MoveLeft className="h-4 w-4 sm:h-5 sm:w-5" />
                Tap to connect
              </span>
            </div>
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

        {/* Social panel for mobile */}
        <SocialPanel 
          isVisible={showMobileSocial} 
          onClose={() => setShowMobileSocial(false)} 
          variant="mobile" 
          links={{ github, twitter, linkedin, resume, linktree }} 
          panelRef={mobilePanelRef}
        />
      </nav>
    </>
  );
};

export default Navbar;
