import crypto from "crypto";
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { getServerSession } from "next-auth";


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

const session = await getServerSession();

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!
);

if (!session?.user?.email) {
  return NextResponse.json({ error: "Not logged in" }, { status: 401 });
}

const { data: user } = await supabase
  .from("users")
  .select("id")
  .eq("email", session.user.email)
  .single();

if (!user) {
  return NextResponse.json({ error: "User not found" }, { status: 404 });
}

await supabase.from("subscriptions").insert({
  user_id: user.id,
  status: "active",
  razorpay_sub_id: razorpay_payment_id
});

return NextResponse.json({ success:true });

}