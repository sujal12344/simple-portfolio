"use client";
import { motion, AnimatePresence } from "framer-motion";
import { Github, Twitter, LinkedinIcon, File } from "lucide-react";
import { NavLink } from "../../../data/data_types";

interface MobileMenuProps {
  isOpen: boolean;
  links: NavLink[];
  activeSection: string;
  socialLinks: {
    github: string;
    twitter: string;
    linkedin: string;
    resume: string;
  };
  onLinkClick: (targetId: string) => void;
}

export const MobileMenu = ({
  isOpen,
  links,
  activeSection,
  socialLinks,
  onLinkClick,
}: MobileMenuProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="absolute top-full left-0 right-0 bg-background/95 backdrop-blur-lg shadow-lg border-t border-primary/10 rounded-b-lg overflow-hidden"
        >
          <ul className="py-2">
            {links.map((link) => {
              const targetId = link.href.substring(1);
              const isActive = activeSection === targetId;

              return (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className={`block px-6 py-3 text-sm ${
                      isActive ? "text-primary font-medium bg-primary/5" : ""
                    }`}
                    onClick={(e) => {
                      e.preventDefault();
                      onLinkClick(targetId);
                    }}
                  >
                    {link.name}
                  </a>
                </li>
              );
            })}
            <li className="px-6 py-3 border-t border-primary/10">
              <div className="flex space-x-6 justify-center mt-2">
                <a
                  href={socialLinks.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  <Github className="h-5 w-5" />
                </a>
                <a
                  href={socialLinks.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Twitter"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  <Twitter className="h-5 w-5" />
                </a>
                <a
                  href={socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  <LinkedinIcon className="h-5 w-5" />
                </a>
                <a
                  href={socialLinks.resume}
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
  );
};
