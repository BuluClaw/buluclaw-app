import Razorpay from "razorpay";
import { NextResponse } from "next/server";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!
});

export async function POST() {

const order = await razorpay.orders.create({
  amount: 100, 
  currency: "INR",
  receipt: "buluclaw_order"
});

return NextResponse.json(order);

}