import { API_ERROR_MESSAGES } from "@/config/constants";
import { EmailValidationError } from "@/data/data_types";
import { verifyEmailWithAbstractAPI } from "@/lib/utils/email";
import { isValidEmailFormat } from "@/lib/utils/form";
import { NextResponse } from "next/server";

/**
 * POST handler for email verification
 * @route POST /api/verify-email
 * @body { email: string }
 * @returns EmailValidationResult | EmailValidationError
 */
export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    // Validate input
    if (!email) {
      return NextResponse.json(
        { error: API_ERROR_MESSAGES.EMAIL_REQUIRED },
        { status: 400 },
      );
    }

    if (!isValidEmailFormat(email)) {
      return NextResponse.json(
        { error: API_ERROR_MESSAGES.INVALID_EMAIL_FORMAT },
        { status: 400 },
      );
    }

    // Verify email with AbstractAPI
    const validationResult = await verifyEmailWithAbstractAPI(email);

    return NextResponse.json(validationResult, { status: 200 });
  } catch (error) {
    console.error("Email verification error:", error);

    // Handle quota exhaustion specifically
    if (
      typeof error === "object" &&
      error !== null &&
      "isQuotaExhausted" in error &&
      (error as EmailValidationError).isQuotaExhausted
    ) {
      return NextResponse.json(
        {
          error: API_ERROR_MESSAGES.API_QUOTA_EXHAUSTED,
          details: API_ERROR_MESSAGES.QUOTA_DETAILS,
          isQuotaExhausted: true,
        },
        { status: 429 },
      );
    }

    // Handle general errors
    return NextResponse.json(
      {
        error: API_ERROR_MESSAGES.API_STATUS_ERROR(500),
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
