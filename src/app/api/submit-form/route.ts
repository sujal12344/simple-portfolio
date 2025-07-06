import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const formData = await request.json();

    if (!formData || !formData.email || !formData.name || !formData.message) {
      return NextResponse.json(
        {
          error: "Missing required fields",
        },
        { status: 400 }
      );
    }

    const formSubmitUrl = process.env.NEXT_PUBLIC_FORM_SUBMIT_URL;
    const formSubmitId = process.env.NEXT_PUBLIC_FORM_SUBMIT_ID;

    if (!formSubmitId || !formSubmitUrl) {
      return NextResponse.json(
        {
          error: "Server configuration error",
        },
        { status: 500 }
      );
    }

    const response = await fetch(`${formSubmitUrl}/${formSubmitId}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error(
        `FormSubmit API responded with status: ${response.status}`
      );
    }

    const result = await response.json();
    return NextResponse.json(result);
  } catch (error) {
    console.error("Form submission error:", error);
    return NextResponse.json(
      {
        error: "Failed to submit form",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
