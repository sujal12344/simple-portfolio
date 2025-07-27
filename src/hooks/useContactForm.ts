import { useState, useCallback } from 'react';
import { ContactFormData, FormStatus } from '@/data/data_types';
import { API_ENDPOINTS, FORM_CONFIG } from '@/config/constants';

interface UseContactFormReturn {
  formData: ContactFormData;
  formStatus: FormStatus;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSubmit: (e: React.FormEvent, validateEmail: (email: string) => Promise<void>, isEmailValid: boolean | null) => Promise<void>;
  resetForm: () => void;
}

const initialFormData: ContactFormData = {
  email: '',
  name: '',
  message: '',
};

export const useContactForm = (): UseContactFormReturn => {
  const [formData, setFormData] = useState<ContactFormData>(initialFormData);
  const [formStatus, setFormStatus] = useState<FormStatus>('idle');

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }, []);

  const handleSubmit = useCallback(async (
    e: React.FormEvent,
    validateEmail: (email: string) => Promise<void>,
    isEmailValid: boolean | null
  ) => {
    e.preventDefault();

    // Validate email if not already validated
    if (formData.email && (isEmailValid === null || isEmailValid === false)) {
      setFormStatus('loading');
      await validateEmail(formData.email);
      
      if (!isEmailValid) {
        setFormStatus('idle');
        return;
      }
    }

    setFormStatus('loading');

    try {
      const formElement = document.getElementById('contact-form') as HTMLFormElement;
      const formDataObj = new FormData(formElement);
      const formValues = Object.fromEntries(formDataObj);

      const response = await fetch(API_ENDPOINTS.SUBMIT_FORM, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formValues),
      });

      if (!response.ok) {
        throw new Error(`Server responded with status: ${response.status}`);
      }

      const result = await response.json();

      if (result.success === 'true' || result.success === true) {
        setFormStatus('success');
        setFormData(initialFormData);
      } else {
        console.error('Form submission failed:', result);
        setFormStatus('error');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setFormStatus('error');
    }

    setTimeout(() => setFormStatus('idle'), FORM_CONFIG.STATUS_RESET_DELAY);
  }, [formData]);

  const resetForm = useCallback(() => {
    setFormData(initialFormData);
    setFormStatus('idle');
  }, []);

  return {
    formData,
    formStatus,
    handleInputChange,
    handleSubmit,
    resetForm,
  };
};