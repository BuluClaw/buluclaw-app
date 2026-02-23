import { NextResponse } from "next/server";
const crypto = require("crypto");
const Razorpay = require("razorpay");

const { createClient } = require("@supabase/supabase-js");

export async function POST(req: Request) {
  const body = await req.text();

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_WEBHOOK_SECRET!)
    .update(body)
    .digest("hex");

  const razorpaySignature = req.headers.get("x-razorpay-signature");

  if (expectedSignature !== razorpaySignature) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  const event = JSON.parse(body);

  const supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_KEY!
  );

  if (event.event === "subscription.activated") {
    const subId = event.payload.subscription.entity.id;
    const email = event.payload.customer.entity.email;

    // Find user
    let { data: user } = await supabase
      .from("users")
      .select("*")
      .eq("email", email)
      .single();

    if (!user) {
      const { data: newUser } = await supabase
        .from("users")
        .insert({
          email,
          active: true,
          model: "gemini",
        })
        .select()
        .single();

      user = newUser;
    }

    // Save subscription
    await supabase.from("subscriptions").insert({
      user_id: user.id,
      razorpay_sub_id: subId,
    });

    // Activate user
    await supabase
      .from("users")
      .update({ active: true })
      .eq("id", user.id);
  }

  return NextResponse.json({ success: true });
}