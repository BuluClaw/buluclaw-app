import crypto from "crypto";
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(req: Request){

const body = await req.json();

const { razorpay_order_id, razorpay_payment_id, razorpay_signature, user_id } = body;

const sign = razorpay_order_id + "|" + razorpay_payment_id;

const expected = crypto
.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
.update(sign)
.digest("hex");

if(expected !== razorpay_signature){

return NextResponse.json({ success:false });
}

const supabase = createClient(
process.env.SUPABASE_URL!,
process.env.SUPABASE_SERVICE_KEY!
);

await supabase.from("subscriptions").insert({
user_id:user_id,
status:"active",
razorpay_sub_id:razorpay_payment_id
});

return NextResponse.json({ success:true });

}