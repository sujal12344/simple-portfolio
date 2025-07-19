"use client";
import { motion } from "framer-motion";
import Image from "next/image";

interface HeroImageProps {
  src: string;
  alt: string;
  size?: number;
}

export const HeroImage = ({ src, alt, size = 280 }: HeroImageProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
      className="sm:w-1/2 w-full flex items-center justify-center pb-6 sm:pb-0 mt-1 sm:mt-0"
    >
      <div className="relative">
        <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary rounded-full blur-md opacity-75 animate-pulse" />
        <div className="relative">
          <Image
            src={src}
            className="rounded-full object-cover border-4 border-background shadow-2xl"
            alt={alt}
            width={size}
            height={size}
            sizes="(max-width: 640px) 240px, (max-width: 768px) 280px, 340px"
            style={{
              width: "auto",
              height: "auto",
              maxWidth: "100%",
              maxHeight: "70vh",
            }}
            priority
          />
        </div>
      </div>
    </motion.div>
  );
};
