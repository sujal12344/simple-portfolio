"use client";
import { motion } from "framer-motion";
import React, { useState, useEffect, useRef } from "react";
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
import { Headers, PersonalData } from "../../data/data";

const ContactSection = () => {
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

  const emailRegex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  // Add these states inside your ContactSection component
  const [isEmailValid, setIsEmailValid] = useState<boolean | null>(null);
  const [emailValidationMessage, setEmailValidationMessage] = useState("");
  const [isValidatingEmail, setIsValidatingEmail] = useState(false);
  const emailTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Add this function to validate email using our API route
  const validateEmail = async (email: string) => {
    if (!email || !email.includes("@") || emailRegex.test(email) === false) {
      setIsEmailValid(false);
      setEmailValidationMessage("Please enter a valid email address");
      return;
    }

    setIsValidatingEmail(true);
    setEmailValidationMessage("Verifying email...");

    try {
      const response = await fetch("/api/verify-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error(`Server responded with status: ${response.status}`);
      }

      const data = await response.json();

      // Check if the email is valid based on the VerifyRight API response
      if (data.status === true && data.checks?.smtp === true) {
        setIsEmailValid(true);
        setEmailValidationMessage("Email verified!");
        // Clear message after 2 seconds
        setTimeout(() => setEmailValidationMessage(""), 2000);
      } else {
        setIsEmailValid(false);
        setEmailValidationMessage("This email address appears to be invalid");
      }
    } catch (error) {
      console.error("Email validation error:", error);
      setIsEmailValid(null);
      setEmailValidationMessage("Could not verify email");
    } finally {
      setIsValidatingEmail(false);
    }
  };

  // Add this function to handle email input with debounce
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const email = e.target.value;

    // Update the form state immediately
    handleInputChange(e);

    // Reset validation states
    if (isEmailValid !== null) {
      setIsEmailValid(null);
      setEmailValidationMessage("");
    }

    // Clear any existing timeout
    if (emailTimeoutRef.current) {
      clearTimeout(emailTimeoutRef.current);
    }

    // Only validate if email has @ character (basic check before API call)
    if (email && (email.includes("@") || emailRegex.test(email) === false)) {
      emailTimeoutRef.current = setTimeout(() => {
        validateEmail(email);
      }, 800); // Wait 800ms after typing stops
    }
  };

  // Update your handleSubmit function to use our API route
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // If email hasn't been validated yet or is invalid
    if (formData.email && (isEmailValid === null || isEmailValid === false)) {
      // Validate email first
      setFormStatus("loading");
      await validateEmail(formData.email);

      // If validation failed, don't submit
      if (!isEmailValid) {
        setFormStatus("idle");
        return;
      }
    }

    // Continue with form submission
    setFormStatus("loading");

    try {
      // Get all form data
      const formElement = document.getElementById(
        "contact-form"
      ) as HTMLFormElement;
      const formData = new FormData(formElement);
      const formValues = Object.fromEntries(formData);

      // Use our API route instead of calling FormSubmit directly
      const response = await fetch("/api/submit-form", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formValues),
      });

      if (!response.ok) {
        throw new Error(`Server responded with status: ${response.status}`);
      }

      const result = await response.json();

      if (result.success === "true" || result.success === true) {
        setFormStatus("success");
        setFormData({ email: "", name: "", message: "" });
      } else {
        console.error("Form submission failed:", result);
        setFormStatus("error");
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setFormStatus("error");
    }

    // Reset status after 5 seconds
    setTimeout(() => {
      setFormStatus("idle");
    }, 5000);
  };

  // Clean up on component unmount
  useEffect(() => {
    return () => {
      if (emailTimeoutRef.current) {
        clearTimeout(emailTimeoutRef.current);
      }
    };
  }, []);

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
  const {
    links: { github, linkedin, twitter, resume },
  } = PersonalData;

  const contactHeader = Headers.find((h) => h.name === "contact")!;

  const autoResponse =
    "Thank you for contacting Sujal! I've received your message and will get back to you as soon as possible.";

  return (
    <div
      className="relative py-12 sm:py-10 md:py-12 overflow-hidden bg-background"
      id={contactHeader.name}
    >
      {/* Background elements - Adjusted for better mobile display */}
      <div className="absolute top-10 sm:top-20 left-0 opacity-5 text-2xl min-[500px]:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-mono">
        {contactHeader.background}
      </div>
      <div className="absolute bottom-10 sm:bottom-20 right-0 opacity-5 text-2xl min-[500px]:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-mono">
        {contactHeader.backgroundClosing}
      </div>
      <div className="absolute inset-0 bg-grid-small-white/[0.025] -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header - Made more responsive */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-8 sm:mb-10 md:mb-12 flex flex-col items-center"
        >
          <div className="flex items-center gap-2 mb-3">
            <div className="h-px w-5 bg-primary" />
            <motion.span
              whileHover={{
                scale: 1.05,
                backgroundColor: "rgba(38, 54, 179, 0.15)",
              }}
              className="text-primary font-mono text-xs sm:text-sm px-2 sm:px-3 py-1 rounded-full bg-primary/10 border border-primary/20"
            >
              {contactHeader.number}.{" "}
              <span className="text-foreground">{contactHeader.title}</span>
            </motion.span>
            <div className="h-px w-5 bg-primary" />
          </div>

          <motion.h1
            initial={{ y: 20 }}
            whileInView={{ y: 0 }}
            transition={{ duration: 0.7, type: "spring" }}
            viewport={{ once: true }}
            className="text-xl sm:text-2xl md:text-3xl font-bold text-center mb-2 sm:mb-4 tracking-tight"
          >
            {contactHeader.subtitle}
          </motion.h1>

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-muted-foreground text-center max-w-2xl mx-auto text-sm sm:text-base md:text-lg px-2"
          >
            {contactHeader.description}
          </motion.p>
        </motion.div>

        <div className="container mx-auto max-w-5xl px-0">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="bg-card/50 backdrop-blur-sm rounded-xl shadow-lg border border-primary/10 p-4 sm:p-6 md:p-8 lg:p-10 mb-10 sm:mb-16 md:mb-20"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 lg:gap-16">
              {/* Left column - Contact info - Made mobile friendly */}
              <motion.div
                variants={itemVariants}
                className="space-y-6 sm:space-y-8"
              >
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 relative inline-block">
                    <span className="relative z-10">Get in Touch</span>
                    <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary/50 -z-10 skew-x-3" />
                  </h2>
                  <p className="text-sm sm:text-base text-muted-foreground mb-4 sm:mb-6">
                    I'm always open to discussing new projects, creative ideas,
                    or opportunities to be part of your vision.
                  </p>
                </div>

                <div className="space-y-3 sm:space-y-5">
                  <motion.a
                    href="mailto:sujalkesharwani220@gmail.com"
                    className="flex items-center gap-3 sm:gap-4 group cursor-pointer p-2 sm:p-3 rounded-lg hover:bg-primary/5 transition-colors"
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <div className="p-2 sm:p-3 rounded-full bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors">
                      <Mail className="h-4 w-4 sm:h-5 sm:w-5" />
                    </div>
                    <div>
                      <h3 className="font-medium text-sm sm:text-base">
                        Email Me
                      </h3>
                      <p className="text-xs sm:text-sm text-muted-foreground group-hover:text-primary/80 transition-colors break-all">
                        sujalkesharwani220@gmail.com
                      </p>
                    </div>
                  </motion.a>

                  <motion.a
                    href="https://cal.com/childish"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 sm:gap-4 group cursor-pointer p-2 sm:p-3 rounded-lg hover:bg-primary/5 transition-colors"
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <div className="p-2 sm:p-3 rounded-full bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors">
                      <Calendar className="h-4 w-4 sm:h-5 sm:w-5" />
                    </div>
                    <div>
                      <h3 className="font-medium text-sm sm:text-base">
                        Schedule a Meeting
                      </h3>
                      <p className="text-xs sm:text-sm text-muted-foreground group-hover:text-primary/80 transition-colors">
                        Find a time on my calendar
                      </p>
                    </div>
                  </motion.a>
                </div>

                <div className="pt-4 border-t border-border/40">
                  <h3 className="text-base sm:text-lg font-medium mb-3 sm:mb-4">
                    Connect with Me
                  </h3>
                  <div className="flex gap-2 sm:gap-3">
                    <motion.div
                      whileHover={{ y: -5 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button
                        asChild
                        variant="outline"
                        size="icon"
                        className="h-9 w-9 sm:h-10 sm:w-10 rounded-full hover:bg-primary hover:text-white transition-all duration-300 border-primary/30"
                      >
                        <a
                          href={github}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="GitHub"
                        >
                          <GithubIcon className="h-4 w-4 sm:h-5 sm:w-5" />
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
                        className="h-9 w-9 sm:h-10 sm:w-10 rounded-full hover:bg-primary hover:text-white transition-all duration-300 border-primary/30"
                      >
                        <a
                          href={twitter}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="Twitter"
                        >
                          <TwitterIcon className="h-4 w-4 sm:h-5 sm:w-5" />
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
                        className="h-9 w-9 sm:h-10 sm:w-10 rounded-full hover:bg-primary hover:text-white transition-all duration-300 border-primary/30"
                      >
                        <a
                          href={linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="LinkedIn"
                        >
                          <LinkedinIcon className="h-4 w-4 sm:h-5 sm:w-5" />
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
                        className="h-9 w-9 sm:h-10 sm:w-10 rounded-full hover:bg-primary hover:text-white transition-all duration-300 border-primary/30"
                      >
                        <a
                          href={resume}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="Resume"
                        >
                          <File className="h-4 w-4 sm:h-5 sm:w-5" />
                        </a>
                      </Button>
                    </motion.div>
                  </div>
                </div>
              </motion.div>

              {/* Right column - Contact form - Made touch-friendly */}
              <motion.div variants={itemVariants}>
                <div className="flex items-center justify-between mb-4 sm:mb-6">
                  <h2 className="text-xl sm:text-2xl font-bold relative inline-block">
                    <span className="relative z-10">Send a Message</span>
                    <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary/50 -z-10 skew-x-3" />
                  </h2>
                </div>

                <form
                  id="contact-form"
                  method="POST"
                  onSubmit={handleSubmit}
                  className="space-y-4 sm:space-y-6"
                  action={`${process.env.NEXT_PUBLIC_FORM_SUBMIT_URL}/${process.env.NEXT_PUBLIC_FORM_SUBMIT_ID}`}
                >
                  {/* FormSubmit advanced features */}
                  <input type="hidden" name="_captcha" value="false" />
                  <input type="hidden" name="_next" value={currentUrl} />
                  <input
                    type="hidden"
                    name="_subject"
                    value="New contact from portfolio"
                  />
                  <input
                    type="hidden"
                    name="_cc"
                    value={process.env.NEXT_PUBLIC_SECONDARY_EMAIL}
                  />{" "}
                  {/* Optional: CC another email */}
                  <input
                    type="hidden"
                    name="_autoresponse"
                    value={autoResponse}
                  />{" "}
                  {/* Send automatic response */}
                  {/* Input fields with animated labels - Improved for touch devices */}
                  <motion.div variants={itemVariants} className="group">
                    <div
                      className={`relative border rounded-lg transition-all duration-200 overflow-hidden ${
                        isEmailValid === false
                          ? "border-red-500 bg-red-50 dark:bg-red-900/20"
                          : isEmailValid === true
                          ? "border-green-500 bg-green-50 dark:bg-green-900/20"
                          : "border-primary/20 focus-within:border-primary focus-within:ring-1 focus-within:ring-primary/30"
                      }`}
                    >
                      <input
                        type="email"
                        name="email"
                        id="email"
                        value={formData.email}
                        onChange={handleEmailChange} // Use our new handler
                        className="block w-full px-3 sm:px-4 pt-6 pb-2 text-sm sm:text-base bg-transparent appearance-none focus:outline-none peer"
                        placeholder=" "
                        required
                      />
                      <label
                        htmlFor="email"
                        className={`absolute top-2 left-3 sm:left-4 text-xs transition-all duration-200 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-sm sm:peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-xs ${
                          isEmailValid === false
                            ? "text-red-500"
                            : isEmailValid === true
                            ? "text-green-500"
                            : "text-muted-foreground"
                        }`}
                      >
                        Email Address
                      </label>

                      {/* Email validation status icon */}
                      {formData.email && (
                        <div className="absolute right-3 top-1/2 -translate-y-1/2">
                          {isValidatingEmail && (
                            <Loader2 className="h-4 w-4 text-muted-foreground animate-spin" />
                          )}
                          {!isValidatingEmail && isEmailValid === true && (
                            <CheckCircle className="h-4 w-4 text-green-500" />
                          )}
                          {!isValidatingEmail && isEmailValid === false && (
                            <AlertCircle className="h-4 w-4 text-red-500" />
                          )}
                        </div>
                      )}

                      <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-primary transition-all duration-300 group-hover:w-full" />
                    </div>

                    {/* Show validation message if any */}
                    {emailValidationMessage && (
                      <p
                        className={`mt-1 text-xs ${
                          isEmailValid === false
                            ? "text-red-500"
                            : isEmailValid === true
                            ? "text-green-500"
                            : "text-muted-foreground"
                        }`}
                      >
                        {emailValidationMessage}
                      </p>
                    )}
                  </motion.div>
                  <motion.div variants={itemVariants} className="group">
                    <div className="relative border border-primary/20 rounded-lg focus-within:border-primary focus-within:ring-1 focus-within:ring-primary/30 transition-all duration-200 overflow-hidden">
                      <input
                        type="text"
                        name="name"
                        id="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="block w-full px-3 sm:px-4 pt-6 pb-2 text-sm sm:text-base bg-transparent appearance-none focus:outline-none peer"
                        placeholder=" "
                        required
                      />
                      <label
                        htmlFor="name"
                        className="absolute top-2 left-3 sm:left-4 text-xs text-muted-foreground peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-sm sm:peer-placeholder-shown:text-base transition-all duration-200 peer-focus:top-2 peer-focus:text-xs"
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
                        className="block w-full px-3 sm:px-4 pt-6 pb-2 text-sm sm:text-base bg-transparent appearance-none focus:outline-none resize-none peer"
                        placeholder=" "
                        required
                      />
                      <label
                        htmlFor="message"
                        className="absolute top-2 left-3 sm:left-4 text-xs text-muted-foreground peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm sm:peer-placeholder-shown:text-base transition-all duration-200 peer-focus:top-2 peer-focus:text-xs"
                      >
                        Your Message
                      </label>
                      <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-primary transition-all duration-300 group-hover:w-full" />
                    </div>
                  </motion.div>
                  {/* Email validation message */}
                  {emailValidationMessage && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`p-2 sm:p-3 rounded-lg text-xs sm:text-sm flex items-center gap-2 ${
                        isEmailValid === true
                          ? "bg-green-100 dark:bg-green-900/30 border border-green-200 dark:border-green-800 text-green-800 dark:text-green-300"
                          : "bg-red-100 dark:bg-red-900/30 border border-red-200 dark:border-red-800 text-red-800 dark:text-red-300"
                      }`}
                    >
                      {isValidatingEmail ? (
                        <Loader2 className="h-4 w-4 sm:h-5 sm:w-5 animate-spin" />
                      ) : isEmailValid === true ? (
                        <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
                      ) : (
                        <AlertCircle className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
                      )}
                      <span>{emailValidationMessage}</span>
                    </motion.div>
                  )}
                  {/* Form status feedback */}
                  {formStatus === "success" && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-2 sm:p-3 bg-green-100 dark:bg-green-900/30 border border-green-200 dark:border-green-800 rounded-lg text-green-800 dark:text-green-300 flex items-center gap-2 text-xs sm:text-sm"
                    >
                      <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
                      <span>
                        Message sent successfully! I'll get back to you soon.
                      </span>
                    </motion.div>
                  )}
                  {formStatus === "error" && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-2 sm:p-3 bg-red-100 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg text-red-800 dark:text-red-300 flex items-center gap-2 text-xs sm:text-sm"
                    >
                      <AlertCircle className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
                      <span>
                        There was an error sending your message. Please try
                        again.
                      </span>
                    </motion.div>
                  )}
                  {/* Submit button - Improved for touch */}
                  <motion.div variants={itemVariants}>
                    <Button
                      className="w-full bg-primary hover:bg-primary/90 text-white font-medium py-5 sm:py-6 rounded-lg transition-all duration-300 group overflow-hidden relative"
                      type="submit"
                      size="lg"
                      disabled={formStatus === "loading"}
                    >
                      <span className="relative z-10 flex items-center gap-2 text-sm sm:text-base">
                        {formStatus === "loading" ? (
                          <>
                            <Loader2 className="h-4 w-4 sm:h-5 sm:w-5 animate-spin" />
                            Sending...
                          </>
                        ) : (
                          <>
                            Send Message
                            <SendIcon className="h-3.5 w-3.5 sm:h-4 sm:w-4 group-hover:translate-x-1 transition-transform" />
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

export default ContactSection;
