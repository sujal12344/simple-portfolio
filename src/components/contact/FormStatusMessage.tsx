"use client";
import { motion } from "framer-motion";
import { CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { FormStatus, EmailValidationState } from "@/data/data_types";
import { VALIDATION_MESSAGES } from "@/config/constants";

interface FormStatusMessageProps {
  status: FormStatus;
  emailValidationMessage: string;
  isEmailValid: EmailValidationState;
  isValidatingEmail: boolean;
}

const FormStatusMessage = ({
  status,
  emailValidationMessage,
  isEmailValid,
  isValidatingEmail,
}: FormStatusMessageProps) => {
  // Email validation message
  if (emailValidationMessage) {
    return (
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
    );
  }

  // Form submission success message
  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-2 sm:p-3 bg-green-100 dark:bg-green-900/30 border border-green-200 dark:border-green-800 rounded-lg text-green-800 dark:text-green-300 flex items-center gap-2 text-xs sm:text-sm"
      >
        <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
        <span>{VALIDATION_MESSAGES.FORM_SUCCESS}</span>
      </motion.div>
    );
  }

  // Form submission error message
  if (status === "error") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-2 sm:p-3 bg-red-100 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg text-red-800 dark:text-red-300 flex items-center gap-2 text-xs sm:text-sm"
      >
        <AlertCircle className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
        <span>{VALIDATION_MESSAGES.FORM_ERROR}</span>
      </motion.div>
    );
  }

  return null;
};

export default FormStatusMessage;