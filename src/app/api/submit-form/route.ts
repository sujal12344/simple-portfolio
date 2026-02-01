import { ContactFormData } from "@/data/data_types";
import { sendEmail } from "@/lib/utils/resend";
import { EMAIL_MESSAGES } from "@/config/constants";
import { NextResponse } from "next/server";

/**
 * POST handler for form submission
 * @route POST /api/submit-form
 * @body ContactFormData
 */
export async function POST(request: Request) {
  try {
    const formData: ContactFormData = await request.json();

    // Validate required fields
    if (!formData.email || !formData.name || !formData.message) {
      return NextResponse.json(
        { error: EMAIL_MESSAGES.MISSING_FIELDS },
        { status: 400 },
      );
    }

    // Send email using Resend
    const emailData = await sendEmail(formData);

    return NextResponse.json(
      {
        success: true,
        message: EMAIL_MESSAGES.SUCCESS,
        emailId: emailData?.id,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Email sending error:", error);

    return NextResponse.json(
      {
        success: false,
        error: EMAIL_MESSAGES.FAILED,
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
