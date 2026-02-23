import Razorpay from "razorpay";
import { NextRequest, NextResponse } from "next/server";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export async function POST(req: NextRequest) {
  try {
    let currency = "INR";
    let amount = 4900; // ₹49 in paise

    // 🌍 Detect country via IP API
    const geoRes = await fetch("https://ipapi.co/json/");
    const geoData = await geoRes.json();

    if (geoData.country !== "IN") {
      currency = "USD";
      amount = 4900; // $49 in cents
    }

    const order = await razorpay.orders.create({
      amount,
      currency,
      receipt: "receipt_" + Date.now(),
    });

    return NextResponse.json(order);

  } catch (error) {
    console.error("Order Error:", error);
    return NextResponse.json(
      { error: "Order creation failed" },
      { status: 500 }
    );
  }
}
