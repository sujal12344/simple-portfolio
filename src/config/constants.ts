// API Configuration
export const API_ENDPOINTS = {
  VERIFY_EMAIL: "/api/verify-email",
  SUBMIT_FORM: "/api/submit-form",
} as const;

// Form Configuration
export const FORM_CONFIG = {
  EMAIL_VALIDATION_DELAY: 800, // ms
  STATUS_RESET_DELAY: 5000, // ms
  AUTO_RESPONSE:
    "Thank you for contacting Sujal! I've received your message and will get back to you as soon as possible.",
} as const;

// Contact Information
export const CONTACT_INFO = {
  EMAIL: "sujalkesharwani220@gmail.com",
  CALENDAR_URL: "https://cal.com/childish",
} as const;

// Animation Configuration
export const ANIMATION_CONFIG = {
  STAGGER_DELAY: 0.1,
  SPRING_CONFIG: { type: "spring", stiffness: 100 },
  HOVER_SPRING: { type: "spring", stiffness: 400, damping: 10 },
} as const;

// Validation Messages
export const VALIDATION_MESSAGES = {
  INVALID_EMAIL: "Please enter a valid email address",
  VERIFYING_EMAIL: "Verifying email...",
  EMAIL_VERIFIED: "Email verified!",
  EMAIL_INVALID: "This email address appears to be invalid",
  EMAIL_VERIFICATION_FAILED: "Could not verify email",
  DISPOSABLE_EMAIL: "Disposable email addresses are not allowed",
  QUOTA_EXHAUSTED: "Email verification temporarily unavailable",
  FORM_SUCCESS: "Message sent successfully! I'll get back to you soon.",
  FORM_ERROR: "There was an error sending your message. Please try again.",
} as const;

// API Error Messages
export const API_ERROR_MESSAGES = {
  API_KEY_NOT_CONFIGURED: "AbstractAPI key is not configured",
  API_BASE_URL_NOT_CONFIGURED: "ABSTRACTAPI_BASE_URL is not configured",
  API_QUOTA_EXHAUSTED: "API quota exhausted",
  QUOTA_DETAILS: "Email verification service has reached its usage limit",
  INVALID_RESPONSE_STRUCTURE: "Invalid API response structure",
  EMAIL_REQUIRED: "Email is required",
  INVALID_EMAIL_FORMAT: "Invalid email format",
  API_STATUS_ERROR: (status: number) => `API responded with status: ${status}`,
} as const;

// API Quota Keywords
export const QUOTA_KEYWORDS = [
  "quota",
  "limit",
  "exceeded",
  "exhausted",
  "usage limit",
] as const;

// Email Configuration
export const EMAIL_CONFIG = {
  FROM_NAME: "Portfolio Contact Form",
  FROM_EMAIL: "contact@resend.dev",
  SUBJECT_PREFIX: "New Contact Form Submission from",
} as const;

// Email Messages
export const EMAIL_MESSAGES = {
  SUCCESS: "Email sent successfully",
  FAILED: "Failed to send email",
  MISSING_FIELDS: "Missing required fields",
  RESEND_KEY_NOT_CONFIGURED: "RESEND_API_KEY is not configured",
} as const;

// Email Template Content
export const EMAIL_TEMPLATE = {
  HEADER_TITLE: "New Contact Form Submission",
  HEADER_SUBTITLE: "You have received a new message from your portfolio",
  LABEL_FROM: "FROM",
  LABEL_EMAIL: "EMAIL",
  LABEL_MESSAGE: "MESSAGE",
  FOOTER_TEXT: "This email was sent from your portfolio contact form",
  FOOTER_TIMESTAMP: "Sent on",
} as const;
