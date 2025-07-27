/**
 * Utility functions for form handling
 */

export const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

/**
 * Validates email format using regex
 */
export const isValidEmailFormat = (email: string): boolean => {
  return EMAIL_REGEX.test(email);
};

/**
 * Checks if email has basic structure (contains @)
 */
export const hasEmailStructure = (email: string): boolean => {
  return email.includes('@');
};

/**
 * Sanitizes form data by trimming whitespace
 */
export const sanitizeFormData = (data: Record<string, any>): Record<string, any> => {
  const sanitized: Record<string, any> = {};
  
  for (const [key, value] of Object.entries(data)) {
    if (typeof value === 'string') {
      sanitized[key] = value.trim();
    } else {
      sanitized[key] = value;
    }
  }
  
  return sanitized;
};

/**
 * Validates required form fields
 */
export const validateRequiredFields = (
  data: Record<string, any>, 
  requiredFields: string[]
): { isValid: boolean; missingFields: string[] } => {
  const missingFields = requiredFields.filter(field => !data[field] || data[field].trim() === '');
  
  return {
    isValid: missingFields.length === 0,
    missingFields,
  };
};