const Razorpay = require("razorpay");

import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    // Razorpay client
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID!,
      key_secret: process.env.RAZORPAY_KEY_SECRET!,
    });

    // Razorpay customer create

let customer;

// try to find existing customer
try {
  const customers = await razorpay.customers.all({ email });
  if (customers.items.length > 0) {
    customer = customers.items[0];
  } else {
    customer = await razorpay.customers.create({ email });
  }
} catch (e) {
  customer = await razorpay.customers.create({ email });
}

    // Create subscription
    const subscription = await razorpay.subscriptions.create({
      plan_id: process.env.RAZORPAY_PLAN_ID!,
      customer_id: customer.id,
      total_count: 12,
      customer_notify: 1,
    });

    return NextResponse.json({
      success: true,
      sub_id: subscription.id,
      redirect_url: subscription.short_url,
    });
  } catch (error) {
    console.log("Subscription Error → ", error);
    return NextResponse.json({ success: false, error });
  }
}