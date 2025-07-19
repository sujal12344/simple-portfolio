"use client";
import { useState, useEffect, useRef } from "react";
import { NavLinkItem } from "../../data/data_types";

export const useNavigation = (navLinks: NavLinkItem[]) => {
  const [activeSection, setActiveSection] = useState("home");
  const [isScrolled, setIsScrolled] = useState(false);

  const isManualNavigation = useRef(false);
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);

  // Track scroll position for navbar styling and active section
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      if (isManualNavigation.current) return;

      const sections = navLinks.map((link) => link.name.toLowerCase());
      let maxVisibleSection = "";
      let maxVisibleHeight = 0;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          const navbarHeight = window.innerWidth < 640 ? 60 : 80;
          const visibleTop = Math.max(rect.top, navbarHeight);
          const visibleBottom = Math.min(rect.bottom, window.innerHeight);
          const visibleHeight = Math.max(0, visibleBottom - visibleTop);

          if (visibleHeight > maxVisibleHeight) {
            maxVisibleHeight = visibleHeight;
            maxVisibleSection = section;
          }
        }
      }

      if (maxVisibleSection && maxVisibleSection !== activeSection) {
        setActiveSection(maxVisibleSection);
      }
    };

    setTimeout(handleScroll, 300);
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, [activeSection, navLinks]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (!element) return;

    isManualNavigation.current = true;
    setActiveSection(sectionId);

    const navbarHeight = window.innerWidth < 640 ? 60 : 80;
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.scrollY - navbarHeight;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });

    if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
    scrollTimeout.current = setTimeout(() => {
      isManualNavigation.current = false;
    }, 1000);
  };

  return {
    activeSection,
    isScrolled,
    scrollToSection,
    setActiveSection,
  };
};
