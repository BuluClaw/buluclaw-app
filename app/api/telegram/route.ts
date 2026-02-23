import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const token = body?.token;

    if (!token || token.trim() === "") {
      return NextResponse.json(
        { success: false, message: "Please enter bot token" },
        { status: 400 }
      );
    }

    // Telegram API request
    const response = await fetch(`https://api.telegram.org/bot${token}/getMe`, {
      method: "GET",
    });

    if (!response.ok) {
      return NextResponse.json(
        { success: false, message: "Invalid Telegram API response" },
        { status: 500 }
      );
    }

    const data = await response.json();

    if (data.ok === true) {
      // SUCCESS
      return NextResponse.json(
        {
          success: true,
          bot: data.result,
        },
        { status: 200 }
      );
    } else {
      // INVALID TOKEN
      return NextResponse.json(
        {
          success: false,
          message: "Invalid bot token",
        },
        { status: 401 }
      );
    }
  } catch (err) {
    console.error("Telegram Route Error:", err);

    return NextResponse.json(
      {
        success: false,
        message: "Server error. Try again.",
      },
      { status: 500 }
    );
  }
}
