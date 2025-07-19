"use client";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MoveLeft } from "lucide-react";
import { forwardRef } from "react";

interface NavAvatarProps {
  name: string;
  githubUrl: string;
  initials: string;
  onClick: () => void;
  variant?: "desktop" | "mobile";
  showConnectText?: boolean;
}

export const NavAvatar = forwardRef<HTMLButtonElement, NavAvatarProps>(
  (
    {
      name,
      githubUrl,
      initials,
      onClick,
      variant = "desktop",
      showConnectText = true,
    },
    ref
  ) => {
    const avatarSize = variant === "desktop" ? "h-9 w-9" : "h-8 w-8";
    const badgeSize = variant === "desktop" ? "w-3.5 h-3.5" : "w-3 h-3";
    const textSize = variant === "desktop" ? "text-sm sm:text-base" : "text-sm";
    const subTextSize = variant === "desktop" ? "text-xs" : "text-[11px]";

    return (
      <motion.div
        whileHover={{ scale: variant === "desktop" ? 1.05 : 1 }}
        className="flex space-x-2 sm:space-x-3 items-center group"
      >
        <Button
          ref={ref}
          variant="ghost"
          className="p-0 h-auto w-auto rounded-full relative"
          onClick={onClick}
        >
          <div className="relative">
            <span className="absolute inset-0 rounded-full animate-ping bg-primary/30 opacity-75" />

            <Avatar
              className={`${avatarSize} ring-2 ring-primary/40 transition-all shadow-md`}
            >
              <AvatarImage src={`${githubUrl}.png`} alt="Profile" />
              <AvatarFallback>
                <span className="text-xs">{initials}</span>
              </AvatarFallback>
            </Avatar>

            <span
              className={`absolute -top-1 -right-1 ${badgeSize} bg-primary rounded-full flex items-center justify-center`}
            >
              <span className="text-[9px] text-white font-bold">+</span>
            </span>
          </div>
        </Button>

        {showConnectText && (
          <div className="flex flex-col">
            <motion.h3
              className={`font-medium ${textSize} flex items-center group-hover:text-primary transition-colors duration-300`}
            >
              {name}
            </motion.h3>
            <span
              className={`${subTextSize} text-primary/90 flex items-center gap-2`}
            >
              <MoveLeft className="h-4 w-4 sm:h-5 sm:w-5" />
              Tap to connect
            </span>
          </div>
        )}
      </motion.div>
    );
  }
);
