import { useState, useRef, useCallback } from 'react';
import { EmailValidationState } from '@/data/data_types';
import { API_ENDPOINTS, FORM_CONFIG, VALIDATION_MESSAGES } from '@/config/constants';
import { isValidEmailFormat, hasEmailStructure } from '@/lib/utils/form';

interface UseEmailValidationReturn {
  isEmailValid: EmailValidationState;
  emailValidationMessage: string;
  isValidatingEmail: boolean;
  validateEmail: (email: string) => Promise<void>;
  handleEmailChange: (email: string) => void;
  resetValidation: () => void;
}

export const useEmailValidation = (): UseEmailValidationReturn => {
  const [isEmailValid, setIsEmailValid] = useState<EmailValidationState>(null);
  const [emailValidationMessage, setEmailValidationMessage] = useState('');
  const [isValidatingEmail, setIsValidatingEmail] = useState(false);
  const emailTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const validateEmail = useCallback(async (email: string) => {
    if (!email || !hasEmailStructure(email) || !isValidEmailFormat(email)) {
      setIsEmailValid(false);
      setEmailValidationMessage(VALIDATION_MESSAGES.INVALID_EMAIL);
      return;
    }

    setIsValidatingEmail(true);
    setEmailValidationMessage(VALIDATION_MESSAGES.VERIFYING_EMAIL);

    try {
      const response = await fetch(API_ENDPOINTS.VERIFY_EMAIL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error(`Server responded with status: ${response.status}`);
      }

      const data = await response.json();

      if (data.status === true && data.checks?.smtp === true) {
        setIsEmailValid(true);
        setEmailValidationMessage(VALIDATION_MESSAGES.EMAIL_VERIFIED);
        setTimeout(() => setEmailValidationMessage(''), 2000);
      } else {
        setIsEmailValid(false);
        setEmailValidationMessage(VALIDATION_MESSAGES.EMAIL_INVALID);
      }
    } catch (error) {
      console.error('Email validation error:', error);
      setIsEmailValid(null);
      setEmailValidationMessage(VALIDATION_MESSAGES.EMAIL_VERIFICATION_FAILED);
    } finally {
      setIsValidatingEmail(false);
    }
  }, []);

  const handleEmailChange = useCallback((email: string) => {
    if (isEmailValid !== null) {
      setIsEmailValid(null);
      setEmailValidationMessage('');
    }

    if (emailTimeoutRef.current) {
      clearTimeout(emailTimeoutRef.current);
    }

    if (email && (hasEmailStructure(email) || !isValidEmailFormat(email))) {
      emailTimeoutRef.current = setTimeout(() => {
        validateEmail(email);
      }, FORM_CONFIG.EMAIL_VALIDATION_DELAY);
    }
  }, [isEmailValid, validateEmail]);

  const resetValidation = useCallback(() => {
    setIsEmailValid(null);
    setEmailValidationMessage('');
    setIsValidatingEmail(false);
    if (emailTimeoutRef.current) {
      clearTimeout(emailTimeoutRef.current);
    }
  }, []);

  return {
    isEmailValid,
    emailValidationMessage,
    isValidatingEmail,
    validateEmail,
    handleEmailChange,
    resetValidation,
  };
};