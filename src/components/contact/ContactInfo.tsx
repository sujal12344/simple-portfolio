"use client";
import { motion } from "framer-motion";
import { Mail, Calendar, GithubIcon, TwitterIcon, LinkedinIcon, File } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SocialLinks } from "@/data/data_types";
import { CONTACT_INFO } from "@/config/constants";

interface ContactInfoProps {
  socialLinks: SocialLinks;
  itemVariants: any;
}

const ContactInfo = ({ socialLinks, itemVariants }: ContactInfoProps) => {
  const { github, linkedin, twitter, resume } = socialLinks;

  return (
    <motion.div variants={itemVariants} className="space-y-6 sm:space-y-8">
      <div>
        <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 relative inline-block">
          <span className="relative z-10">Get in Touch</span>
          <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary/50 -z-10 skew-x-3" />
        </h2>
        <p className="text-sm sm:text-base text-muted-foreground mb-4 sm:mb-6">
          I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
        </p>
      </div>

      <div className="space-y-3 sm:space-y-5">
        <ContactMethod
          href={`mailto:${CONTACT_INFO.EMAIL}`}
          icon={<Mail className="h-4 w-4 sm:h-5 sm:w-5" />}
          title="Email Me"
          description={CONTACT_INFO.EMAIL}
        />
        
        <ContactMethod
          href={CONTACT_INFO.CALENDAR_URL}
          icon={<Calendar className="h-4 w-4 sm:h-5 sm:w-5" />}
          title="Schedule a Meeting"
          description="Find a time on my calendar"
          external
        />
      </div>

      <div className="pt-4 border-t border-border/40">
        <h3 className="text-base sm:text-lg font-medium mb-3 sm:mb-4">Connect with Me</h3>
        <div className="flex gap-2 sm:gap-3">
          <SocialButton href={github} icon={<GithubIcon className="h-4 w-4 sm:h-5 sm:w-5" />} label="GitHub" />
          <SocialButton href={twitter} icon={<TwitterIcon className="h-4 w-4 sm:h-5 sm:w-5" />} label="Twitter" />
          <SocialButton href={linkedin} icon={<LinkedinIcon className="h-4 w-4 sm:h-5 sm:w-5" />} label="LinkedIn" />
          <SocialButton href={resume} icon={<File className="h-4 w-4 sm:h-5 sm:w-5" />} label="Resume" />
        </div>
      </div>
    </motion.div>
  );
};

const ContactMethod = ({ 
  href, 
  icon, 
  title, 
  description, 
  external = false 
}: {
  href: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  external?: boolean;
}) => (
  <motion.a
    href={href}
    {...(external && { target: "_blank", rel: "noopener noreferrer" })}
    className="flex items-center gap-3 sm:gap-4 group cursor-pointer p-2 sm:p-3 rounded-lg hover:bg-primary/5 transition-colors"
    whileHover={{ x: 5 }}
    transition={{ type: "spring", stiffness: 400, damping: 10 }}
  >
    <div className="p-2 sm:p-3 rounded-full bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors">
      {icon}
    </div>
    <div>
      <h3 className="font-medium text-sm sm:text-base">{title}</h3>
      <p className="text-xs sm:text-sm text-muted-foreground group-hover:text-primary/80 transition-colors break-all">
        {description}
      </p>
    </div>
  </motion.a>
);

const SocialButton = ({ 
  href, 
  icon, 
  label 
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
}) => (
  <motion.div whileHover={{ y: -5 }} whileTap={{ scale: 0.95 }}>
    <Button
      asChild
      variant="outline"
      size="icon"
      className="h-9 w-9 sm:h-10 sm:w-10 rounded-full hover:bg-primary hover:text-white transition-all duration-300 border-primary/30"
    >
      <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label}>
        {icon}
      </a>
    </Button>
  </motion.div>
);

export default ContactInfo;