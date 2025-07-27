import React from "react";

interface TechStackProps {
  technologies?: string[];
  variant?: "badge" | "tag";
}

export const TechStack: React.FC<TechStackProps> = ({
  technologies,
  variant = "tag",
}) => {
  if (!technologies || technologies.length === 0) return null;

  const variantClasses = {
    badge:
      "text-xs font-medium px-2 py-1 bg-black/50 text-white rounded-full backdrop-blur-sm",
    tag: "text-xs px-2 py-1 bg-primary/10 text-primary rounded-full",
  };

  return (
    <div className="flex flex-wrap gap-1">
      {technologies.map((tech, index) => (
        <span key={index} className={variantClasses[variant]}>
          {tech}
        </span>
      ))}
    </div>
  );
};
