"use client";
import { motion } from "framer-motion";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  GithubIcon,
  TwitterIcon,
  LinkedinIcon,
  File,
  Mail,
  Calendar,
  SendIcon,
  CheckCircle,
  AlertCircle,
  Loader2,
} from "lucide-react";

const Contact = () => {
  const [formStatus, setFormStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    message: "",
  });
  // Add state for current URL
  const [currentUrl, setCurrentUrl] = useState("");

  // Set the URL after component mounts (client-side only)
  useEffect(() => {
    setCurrentUrl(window.location.href);
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus("loading");

    try {
      // Use the existing FormSubmit.co endpoint
      const formElement = document.getElementById(
        "contact-form"
      ) as HTMLFormElement;
      const formData = new FormData(formElement);

      const response = await fetch(
        "https://formsubmit.co/cc9e32fafc72f282ca8d7e86196eeefb",
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        setFormStatus("success");
        setFormData({ email: "", name: "", message: "" });
      } else {
        setFormStatus("error");
      }
    } catch (error) {
      setFormStatus("error");
    }

    // Reset status after 5 seconds
    setTimeout(() => {
      setFormStatus("idle");
    }, 5000);
  };

  // Staggered animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 },
    },
  };

  return (
    <div className="relative py-20 overflow-hidden bg-background" id="contact">
      {/* Background elements */}
      <div className="absolute top-20 left-0 opacity-5 text-6xl font-mono">
        {"<contact>"}
      </div>
      <div className="absolute bottom-20 right-0 opacity-5 text-6xl font-mono">
        {"</contact>"}
      </div>
      <div className="absolute inset-0 bg-grid-small-white/[0.025] -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-12 flex flex-col items-center"
        >
          <div className="flex items-center gap-2 mb-3">
            <div className="h-px w-5 bg-primary" />
            <motion.span
              whileHover={{
                scale: 1.05,
                backgroundColor: "hsl(var(--primary)/0.15)",
              }}
              className="text-primary font-mono text-sm px-3 py-1 rounded-full bg-primary/10 border border-primary/20"
            >
              05. <span className="text-foreground">Get In Touch</span>
            </motion.span>
            <div className="h-px w-5 bg-primary" />
          </div>

          <motion.h1
            initial={{ y: 20 }}
            whileInView={{ y: 0 }}
            transition={{ duration: 0.7, type: "spring" }}
            viewport={{ once: true }}
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-4 tracking-tight"
          >
            Let&apos;s Build Something Amazing Together
          </motion.h1>

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-muted-foreground text-center max-w-2xl mx-auto text-lg"
          >
            Have a project in mind or just want to connect? Reach out and let's
            start a conversation.
          </motion.p>
        </motion.div>

        <div className="container mx-auto max-w-5xl">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="bg-card/50 backdrop-blur-sm rounded-xl shadow-lg border border-primary/10 p-6 md:p-10 mb-20"
          >
            <div className="grid md:grid-cols-2 gap-10 md:gap-16">
              {/* Left column - Contact info */}
              <motion.div variants={itemVariants} className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold mb-4 relative inline-block">
                    <span className="relative z-10">Get in Touch</span>
                    <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary/50 -z-10 skew-x-3" />
                  </h2>
                  <p className="text-muted-foreground mb-6">
                    I'm always open to discussing new projects, creative ideas,
                    or opportunities to be part of your vision.
                  </p>
                </div>

                <div className="space-y-5">
                  <motion.a
                    href="mailto:sujalkesharwani220@gmail.com"
                    className="flex items-center gap-4 group cursor-pointer p-3 rounded-lg hover:bg-primary/5 transition-colors"
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <div className="p-3 rounded-full bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors">
                      <Mail className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-medium">Email Me</h3>
                      <p className="text-sm text-muted-foreground group-hover:text-primary/80 transition-colors">
                        sujalkesharwani220@gmail.com
                      </p>
                    </div>
                  </motion.a>

                  <motion.a
                    href="https://cal.com/whycurious101"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 group cursor-pointer p-3 rounded-lg hover:bg-primary/5 transition-colors"
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <div className="p-3 rounded-full bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors">
                      <Calendar className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-medium">Schedule a Meeting</h3>
                      <p className="text-sm text-muted-foreground group-hover:text-primary/80 transition-colors">
                        Find a time on my calendar
                      </p>
                    </div>
                  </motion.a>
                </div>

                <div className="pt-4 border-t border-border/40">
                  <h3 className="text-lg font-medium mb-4">Connect with Me</h3>
                  <div className="flex gap-3">
                    <motion.div
                      whileHover={{ y: -5 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button
                        asChild
                        variant="outline"
                        size="icon"
                        className="rounded-full hover:bg-primary hover:text-white transition-all duration-300 border-primary/30"
                      >
                        <a
                          href="https://github.com/sujal12344"
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="GitHub"
                        >
                          <GithubIcon className="h-5 w-5" />
                        </a>
                      </Button>
                    </motion.div>

                    <motion.div
                      whileHover={{ y: -5 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button
                        asChild
                        variant="outline"
                        size="icon"
                        className="rounded-full hover:bg-primary hover:text-white transition-all duration-300 border-primary/30"
                      >
                        <a
                          href="https://twitter.com/whycurious101"
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="Twitter"
                        >
                          <TwitterIcon className="h-5 w-5" />
                        </a>
                      </Button>
                    </motion.div>

                    <motion.div
                      whileHover={{ y: -5 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button
                        asChild
                        variant="outline"
                        size="icon"
                        className="rounded-full hover:bg-primary hover:text-white transition-all duration-300 border-primary/30"
                      >
                        <a
                          href="https://www.linkedin.com/in/sujal-kesharwani-978632258/"
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="LinkedIn"
                        >
                          <LinkedinIcon className="h-5 w-5" />
                        </a>
                      </Button>
                    </motion.div>

                    <motion.div
                      whileHover={{ y: -5 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button
                        asChild
                        variant="outline"
                        size="icon"
                        className="rounded-full hover:bg-primary hover:text-white transition-all duration-300 border-primary/30"
                      >
                        <a
                          href="https://dhrishp.tiiny.site"
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="Resume"
                        >
                          <File className="h-5 w-5" />
                        </a>
                      </Button>
                    </motion.div>
                  </div>
                </div>
              </motion.div>

              {/* Right column - Contact form */}
              <motion.div variants={itemVariants}>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold relative inline-block">
                    <span className="relative z-10">Send a Message</span>
                    <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary/50 -z-10 skew-x-3" />
                  </h2>
                </div>

                <form
                  id="contact-form"
                  method="POST"
                  onSubmit={handleSubmit}
                  className="space-y-6"
                >
                  {/* Hidden input for FormSubmit.co */}
                  <input type="hidden" name="_captcha" value="false" />
                  {/* Use the state variable instead of directly accessing window */}
                  <input type="hidden" name="_next" value={currentUrl} />
                  <input
                    type="hidden"
                    name="_subject"
                    value="New contact from portfolio"
                  />

                  {/* Input fields with animated labels */}
                  <motion.div variants={itemVariants} className="group">
                    <div className="relative border border-primary/20 rounded-lg focus-within:border-primary focus-within:ring-1 focus-within:ring-primary/30 transition-all duration-200 overflow-hidden">
                      <input
                        type="email"
                        name="email"
                        id="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="block w-full px-4 pt-6 pb-2 text-base bg-transparent appearance-none focus:outline-none peer"
                        placeholder=" "
                        required
                      />
                      <label
                        htmlFor="email"
                        className="absolute top-2 left-4 text-xs text-muted-foreground peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-base transition-all duration-200 peer-focus:top-2 peer-focus:text-xs"
                      >
                        Email Address
                      </label>
                      <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-primary transition-all duration-300 group-hover:w-full" />
                    </div>
                  </motion.div>

                  <motion.div variants={itemVariants} className="group">
                    <div className="relative border border-primary/20 rounded-lg focus-within:border-primary focus-within:ring-1 focus-within:ring-primary/30 transition-all duration-200 overflow-hidden">
                      <input
                        type="text"
                        name="name"
                        id="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="block w-full px-4 pt-6 pb-2 text-base bg-transparent appearance-none focus:outline-none peer"
                        placeholder=" "
                        required
                      />
                      <label
                        htmlFor="name"
                        className="absolute top-2 left-4 text-xs text-muted-foreground peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-base transition-all duration-200 peer-focus:top-2 peer-focus:text-xs"
                      >
                        Your Name
                      </label>
                      <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-primary transition-all duration-300 group-hover:w-full" />
                    </div>
                  </motion.div>

                  <motion.div variants={itemVariants} className="group">
                    <div className="relative border border-primary/20 rounded-lg focus-within:border-primary focus-within:ring-1 focus-within:ring-primary/30 transition-all duration-200 overflow-hidden">
                      <textarea
                        name="message"
                        id="message"
                        rows={4}
                        value={formData.message}
                        onChange={handleInputChange}
                        className="block w-full px-4 pt-6 pb-2 text-base bg-transparent appearance-none focus:outline-none resize-none peer"
                        placeholder=" "
                        required
                      />
                      <label
                        htmlFor="message"
                        className="absolute top-2 left-4 text-xs text-muted-foreground peer-placeholder-shown:top-4 peer-placeholder-shown:text-base transition-all duration-200 peer-focus:top-2 peer-focus:text-xs"
                      >
                        Your Message
                      </label>
                      <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-primary transition-all duration-300 group-hover:w-full" />
                    </div>
                  </motion.div>

                  {/* Form status feedback */}
                  {formStatus === "success" && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-3 bg-green-100 dark:bg-green-900/30 border border-green-200 dark:border-green-800 rounded-lg text-green-800 dark:text-green-300 flex items-center gap-2"
                    >
                      <CheckCircle className="h-5 w-5" />
                      <span>
                        Message sent successfully! I'll get back to you soon.
                      </span>
                    </motion.div>
                  )}

                  {formStatus === "error" && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-3 bg-red-100 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg text-red-800 dark:text-red-300 flex items-center gap-2"
                    >
                      <AlertCircle className="h-5 w-5" />
                      <span>
                        There was an error sending your message. Please try
                        again.
                      </span>
                    </motion.div>
                  )}

                  {/* Submit button */}
                  <motion.div variants={itemVariants}>
                    <Button
                      className="w-full bg-primary hover:bg-primary/90 text-white font-medium py-6 rounded-lg transition-all duration-300 group overflow-hidden relative"
                      type="submit"
                      size="lg"
                      disabled={formStatus === "loading"}
                    >
                      <span className="relative z-10 flex items-center gap-2">
                        {formStatus === "loading" ? (
                          <>
                            <Loader2 className="h-5 w-5 animate-spin" />
                            Sending...
                          </>
                        ) : (
                          <>
                            Send Message
                            <SendIcon className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                          </>
                        )}
                      </span>
                      <div className="absolute inset-0 -z-0 bg-primary-foreground/20 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" />
                    </Button>
                  </motion.div>
                </form>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
