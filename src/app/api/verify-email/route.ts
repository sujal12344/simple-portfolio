import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const verifyEmailUrl = process.env.NEXT_PUBLIC_VERIFY_EMAIL_URL;
    const verifyEmailToken = process.env.NEXT_PUBLIC_VERIFY_EMAIL_TOKEN;

    if (!verifyEmailToken || !verifyEmailUrl) {
      return NextResponse.json(
        {
          error: "Server configuration error",
        },
        { status: 500 }
      );
    }

    const verifyUrl = `${verifyEmailUrl}/${email}?token=${verifyEmailToken}`;

    const response = await fetch(verifyUrl);

    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error verifying email:", error);
    return NextResponse.json(
      {
        error: "Failed to verify email",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
