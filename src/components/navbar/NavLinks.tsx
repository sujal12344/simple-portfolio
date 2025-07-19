"use client";
import { motion } from "framer-motion";
import { NavLink } from "../../../data/data_types";

interface NavLinksProps {
  links: NavLink[];
  activeSection: string;
  onLinkClick: (targetId: string) => void;
}

export const NavLinks = ({
  links,
  activeSection,
  onLinkClick,
}: NavLinksProps) => {
  return (
    <ul className="flex flex-grow justify-center items-center space-x-2 sm:space-x-4 md:space-x-6">
      {links.map((link) => {
        const targetId = link.href.substring(1);
        const isActive = activeSection === targetId;

        return (
          <motion.li
            key={link.name}
            initial={{ opacity: 0.8 }}
            whileHover={{
              scale: 1.05,
              transition: { duration: 0.2 },
            }}
            whileTap={{ scale: 0.95 }}
            className={`relative px-2 sm:px-3 py-1.5 sm:py-2 rounded-md transition-all duration-300 text-sm ${
              isActive
                ? "text-primary font-medium bg-primary/5"
                : "hover:bg-secondary/80"
            }`}
          >
            <a
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                onLinkClick(targetId);
              }}
              className="flex items-center justify-center"
            >
              {link.name}
            </a>

            {isActive && (
              <motion.div
                layoutId="activeSection"
                className="absolute bottom-0 left-0 right-0 mx-auto w-full h-0.5 bg-primary"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 0.3 }}
              />
            )}
          </motion.li>
        );
      })}
    </ul>
  );
};
