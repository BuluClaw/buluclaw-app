import Razorpay from "razorpay";
import { NextResponse } from "next/server";

export async function POST(req:Request){

const body = await req.json();

const razorpay = new Razorpay({
key_id: process.env.RAZORPAY_KEY_ID!,
key_secret: process.env.RAZORPAY_KEY_SECRET!
});

const order = await razorpay.orders.create({

amount: body.amount * 100,
currency:"INR",
receipt:"buluclaw_order"

});

return NextResponse.json(order)

}