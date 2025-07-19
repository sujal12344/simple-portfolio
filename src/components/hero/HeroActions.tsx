"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { LeafyGreen, ArrowRight } from "lucide-react";

interface ActionButton {
  href: string;
  text: string;
  icon: React.ReactNode;
  variant?: "default" | "outline";
}

interface HeroActionsProps {
  actions?: ActionButton[];
}

const defaultActions: ActionButton[] = [
  {
    href: "#contact",
    text: "Say hello",
    icon: (
      <LeafyGreen className="ml-2 h-4 w-4 sm:h-5 sm:w-5 group-hover:animate-bounce" />
    ),
    variant: "default",
  },
  {
    href: "#projects",
    text: "View work",
    icon: (
      <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform" />
    ),
    variant: "outline",
  },
];

export const HeroActions = ({ actions = defaultActions }: HeroActionsProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.7, duration: 0.5 }}
      className="flex gap-3 sm:space-x-4 mt-2 w-full sm:w-auto"
    >
      {actions.map((action, index) => (
        <motion.div
          key={action.href}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full sm:w-auto"
        >
          <Button
            variant={action.variant || "default"}
            size="lg"
            className={`w-full sm:w-auto group text-sm sm:text-base font-medium transition-all ${
              action.variant === "outline"
                ? "hover:border-primary"
                : "hover:bg-primary/90 shadow-lg hover:shadow-primary/25"
            }`}
          >
            <a href={action.href} className="flex items-center">
              <span>{action.text}</span>
              {action.icon}
            </a>
          </Button>
        </motion.div>
      ))}
    </motion.div>
  );
};
