"use client";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { getHeaderByName, PersonalData } from "@/data/data";
import { useContactForm } from "@/hooks/useContactForm";
import { useEmailValidation } from "@/hooks/useEmailValidation";
import SectionHeader from "@/components/contact/SectionHeader";
import ContactInfo from "@/components/contact/ContactInfo";
import ContactForm from "@/components/contact/ContactForm";

const ContactSection = () => {
  const contactHeader = getHeaderByName("contact")!;
  
  // Custom hooks for form and email validation logic
  const { formData, formStatus, handleInputChange, handleSubmit, resetForm } = useContactForm();
  const { 
    isEmailValid, 
    emailValidationMessage, 
    isValidatingEmail, 
    validateEmail, 
    handleEmailChange, 
    resetValidation 
  } = useEmailValidation();

  // Enhanced email change handler that combines form and validation logic
  const handleEmailInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleInputChange(e);
    handleEmailChange(e.target.value);
  };

  // Enhanced form submit handler
  const handleFormSubmit = (e: React.FormEvent) => {
    handleSubmit(e, validateEmail, isEmailValid);
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      resetValidation();
    };
  }, [resetValidation]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
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
    <div
      className="relative py-12 sm:py-10 md:py-12 overflow-hidden bg-background"
      id={contactHeader.name}
    >
      {/* Background decorative elements */}
      <div className="absolute top-10 sm:top-20 left-0 opacity-5 text-2xl min-[500px]:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-mono">
        {contactHeader.background}
      </div>
      <div className="absolute bottom-10 sm:bottom-20 right-0 opacity-5 text-2xl min-[500px]:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-mono">
        {contactHeader.backgroundClosing}
      </div>
      <div className="absolute inset-0 bg-grid-small-white/[0.025] -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <SectionHeader header={contactHeader} />

        {/* Main Content */}
        <div className="container mx-auto max-w-5xl px-0">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="bg-card/50 backdrop-blur-sm rounded-xl shadow-lg border border-primary/10 p-4 sm:p-6 md:p-8 lg:p-10 mb-10 sm:mb-16 md:mb-20"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 lg:gap-16">
              {/* Contact Information */}
              <ContactInfo 
                socialLinks={PersonalData.links} 
                itemVariants={itemVariants} 
              />

              {/* Contact Form */}
              <ContactForm
                formData={formData}
                formStatus={formStatus}
                isEmailValid={isEmailValid}
                emailValidationMessage={emailValidationMessage}
                isValidatingEmail={isValidatingEmail}
                itemVariants={itemVariants}
                onInputChange={handleInputChange}
                onEmailChange={handleEmailInputChange}
                onSubmit={handleFormSubmit}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ContactSection;
