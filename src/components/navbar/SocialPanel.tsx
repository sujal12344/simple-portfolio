"use client";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { X, Github, Twitter, LinkedinIcon, File } from "lucide-react";
import { PiLinktreeLogoBold } from "react-icons/pi";
import { cn } from "@/lib/utils";
import { useMemo } from "react";

interface SocialItem {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  url: string;
}

interface SocialPanelProps {
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
}

export const SocialPanel = ({
  isVisible,
  onClose,
  variant = "desktop",
  links,
  panelRef,
}: SocialPanelProps) => {
  const socialItems: SocialItem[] = useMemo(
    () => [
      { icon: Github, label: "GitHub", url: links.github },
      { icon: Twitter, label: "Twitter", url: links.twitter },
      { icon: LinkedinIcon, label: "LinkedIn", url: links.linkedin },
      { icon: File, label: "Resume", url: links.resume },
      { icon: PiLinktreeLogoBold, label: "Links", url: links.linktree },
    ],
    [links]
  );

  const styles = useMemo(
    () => ({
      container:
        variant === "desktop" ? "absolute top-12 left-0 w-max z-50" : "mt-2",
      iconSize: variant === "desktop" ? "h-5.5 w-5.5" : "h-5 w-5",
      circleSize: variant === "desktop" ? "w-11 h-11" : "w-10 h-10",
      labelSize:
        variant === "desktop" ? "text-[11px] mt-1" : "text-[10px] mt-0.5",
      animation:
        variant === "desktop"
          ? {
              initial: { opacity: 0, y: 10 },
              animate: { opacity: 1, y: 0 },
              exit: { opacity: 0, y: 5 },
            }
          : {
              initial: { opacity: 0, height: 0 },
              animate: { opacity: 1, height: "auto" },
              exit: { opacity: 0, height: 0 },
            },
    }),
    [variant]
  );

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
                whileHover={{
                  scale: 1.05,
                  backgroundColor: "rgba(var(--primary), 0.1)",
                }}
              >
                <div
                  className={`${styles.circleSize} rounded-full bg-primary/10 flex items-center justify-center text-primary`}
                >
                  <item.icon
                    className={cn(
                      item.icon === PiLinktreeLogoBold
                        ? variant === "desktop"
                          ? "h-7 w-7"
                          : "h-6 w-6"
                        : styles.iconSize
                    )}
                  />
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
