"use client";
import { motion } from "framer-motion";
import { SendIcon, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ContactFormData, FormStatus, EmailValidationState } from "@/data/data_types";
import { FORM_CONFIG } from "@/config/constants";
import FormInput from "./FormInput";
import FormTextarea from "./FormTextarea";
import FormStatusMessage from "./FormStatusMessage";

interface ContactFormProps {
  formData: ContactFormData;
  formStatus: FormStatus;
  isEmailValid: EmailValidationState;
  emailValidationMessage: string;
  isValidatingEmail: boolean;
  itemVariants: any;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onEmailChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
}

const ContactForm = ({
  formData,
  formStatus,
  isEmailValid,
  emailValidationMessage,
  isValidatingEmail,
  itemVariants,
  onInputChange,
  onEmailChange,
  onSubmit,
}: ContactFormProps) => {
  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';

  return (
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
        onSubmit={onSubmit}
        className="space-y-4 sm:space-y-6"
        action={`${process.env.NEXT_PUBLIC_FORM_SUBMIT_URL}/${process.env.NEXT_PUBLIC_FORM_SUBMIT_ID}`}
      >
        {/* Hidden FormSubmit fields */}
        <input type="hidden" name="_captcha" value="false" />
        <input type="hidden" name="_next" value={currentUrl} />
        <input type="hidden" name="_subject" value="New contact from portfolio" />
        <input type="hidden" name="_cc" value={process.env.NEXT_PUBLIC_SECONDARY_EMAIL} />
        <input type="hidden" name="_autoresponse" value={FORM_CONFIG.AUTO_RESPONSE} />

        {/* Form Fields */}
        <motion.div variants={itemVariants}>
          <FormInput
            id="email"
            name="email"
            type="email"
            label="Email Address"
            value={formData.email}
            onChange={onEmailChange}
            isEmailValid={isEmailValid}
            isValidatingEmail={isValidatingEmail}
            required
          />
          {emailValidationMessage && (
            <p className={`mt-1 text-xs ${
              isEmailValid === false ? "text-red-500" : 
              isEmailValid === true ? "text-green-500" : "text-muted-foreground"
            }`}>
              {emailValidationMessage}
            </p>
          )}
        </motion.div>

        <motion.div variants={itemVariants}>
          <FormInput
            id="name"
            name="name"
            type="text"
            label="Your Name"
            value={formData.name}
            onChange={onInputChange}
            required
          />
        </motion.div>

        <motion.div variants={itemVariants}>
          <FormTextarea
            id="message"
            name="message"
            label="Your Message"
            value={formData.message}
            onChange={onInputChange}
            rows={4}
            required
          />
        </motion.div>

        {/* Status Messages */}
        <FormStatusMessage 
          status={formStatus} 
          emailValidationMessage={emailValidationMessage}
          isEmailValid={isEmailValid}
          isValidatingEmail={isValidatingEmail}
        />

        {/* Submit Button */}
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
  );
};

export default ContactForm;