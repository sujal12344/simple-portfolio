import React from "react";
import Link from "next/link";
import { Github, ExternalLink } from "lucide-react";

interface ProjectLinksProps {
  github?: string;
  websiteUrl?: string;
  variant?: "overlay" | "card";
}

export const ProjectLinks: React.FC<ProjectLinksProps> = ({
  github,
  websiteUrl,
  variant = "overlay",
}) => {
  const baseClasses = "p-2 rounded-full transition-colors duration-200";
  const variantClasses = {
    overlay: "bg-black/50 text-white hover:bg-black/70 backdrop-blur-sm",
    card: "bg-white/10 hover:bg-white/20 text-white",
  };

  return (
    <div className="flex space-x-2">
      {github && (
        <Link
          href={github}
          target="_blank"
          rel="noopener noreferrer"
          className={`${baseClasses} ${variantClasses[variant]}`}
          onClick={(e) => e.stopPropagation()}
        >
          <Github className="h-4 w-4" />
        </Link>
      )}
      {websiteUrl && (
        <Link
          href={websiteUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`${baseClasses} ${variantClasses[variant]}`}
          onClick={(e) => e.stopPropagation()}
        >
          <ExternalLink className="h-4 w-4" />
        </Link>
      )}
    </div>
  );
};
