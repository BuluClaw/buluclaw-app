import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();

  const { model, channel, email } = body;

  console.log("Deploy Request:");
  console.log("Model:", model);
  console.log("Channel:", channel);
  console.log("User:", email);

  return NextResponse.json({
    success: true,
    message: "Bot deployed successfully 🚀",
  });
}
