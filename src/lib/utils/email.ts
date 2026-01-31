/**
 * Email validation utility functions
 */

import { API_ERROR_MESSAGES, QUOTA_KEYWORDS } from "@/config/constants";
import {
  AbstractAPIResponse,
  EmailValidationError,
  EmailValidationResult,
} from "@/data/data_types";

/**
 * Transforms AbstractAPI response to our application format
 */
export const transformAPIResponse = (
  data: AbstractAPIResponse,
): EmailValidationResult => {
  const isDeliverable = data.email_deliverability.status === "deliverable";
  const hasValidSMTP = data.email_deliverability.is_smtp_valid === true;
  const hasValidFormat = data.email_deliverability.is_format_valid === true;
  const hasValidMX = data.email_deliverability.is_mx_valid === true;

  return {
    status: isDeliverable && hasValidSMTP,
    checks: {
      smtp: hasValidSMTP,
      format: hasValidFormat,
      mx: hasValidMX,
    },
    details: {
      deliverability: data.email_deliverability.status,
      quality_score: data.email_quality.score,
      is_disposable: data.email_quality.is_disposable,
      risk_level: data.email_risk.address_risk_status,
    },
  };
};

/**
 * Checks if the API response indicates quota exhaustion
 */
export const isQuotaExhausted = (response: Response, data: any): boolean => {
  if (response.status === 429) return true;

  if (data?.error) {
    const errorMessage = String(data.error).toLowerCase();
    return QUOTA_KEYWORDS.some((keyword) => errorMessage.includes(keyword));
  }

  if (data && !data.email_address && !data.error) return true;

  return false;
};

/**
 * Verifies email using AbstractAPI
 */
export const verifyEmailWithAbstractAPI = async (
  email: string,
): Promise<EmailValidationResult> => {
  const apiKey = process.env.ABSTRACTAPI_KEY;
  const baseUrl = process.env.NEXT_PUBLIC_ABSTRACTAPI_BASE_URL;

  if (!apiKey) {
    throw new Error(API_ERROR_MESSAGES.API_KEY_NOT_CONFIGURED);
  }

  if (!baseUrl) {
    throw new Error(API_ERROR_MESSAGES.API_BASE_URL_NOT_CONFIGURED);
  }

  const url = new URL(baseUrl);
  url.searchParams.append("api_key", apiKey);
  url.searchParams.append("email", email);

  const response = await fetch(url.toString());
  const data = await response.json();

  // Check for quota exhaustion before processing
  if (isQuotaExhausted(response, data)) {
    const error: EmailValidationError = {
      error: API_ERROR_MESSAGES.API_QUOTA_EXHAUSTED,
      details: API_ERROR_MESSAGES.QUOTA_DETAILS,
      isQuotaExhausted: true,
    };
    throw error;
  }

  if (!response.ok) {
    throw new Error(API_ERROR_MESSAGES.API_STATUS_ERROR(response.status));
  }

  // Validate that we have the expected response structure
  if (!data.email_address || !data.email_deliverability) {
    throw new Error(API_ERROR_MESSAGES.INVALID_RESPONSE_STRUCTURE);
  }

  return transformAPIResponse(data);
};
