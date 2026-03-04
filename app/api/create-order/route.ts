import Razorpay from "razorpay";
import { NextResponse } from "next/server";

export async function POST() {
  const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID!,
    key_secret: process.env.RAZORPAY_KEY_SECRET!,
  });

  const order = await razorpay.orders.create({
    amount: 49 * 100,
    currency: "USD",   // <— USD allow hai
    receipt: "order_rcptid_11",
  });

  return NextResponse.json(order);
}