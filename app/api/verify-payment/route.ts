import { NextResponse } from "next/server"
import crypto from "crypto"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
 process.env.NEXT_PUBLIC_SUPABASE_URL!,
 process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(req: Request){

 const body = await req.json()

 const {
  razorpay_order_id,
  razorpay_payment_id,
  razorpay_signature,
  user_id
 } = body

 const generated_signature = crypto
  .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
  .update(razorpay_order_id + "|" + razorpay_payment_id)
  .digest("hex")

 if(generated_signature !== razorpay_signature){
  return NextResponse.json({ success:false })
 }

 await supabase.from("subscriptions").insert({
  user_id:user_id,
  payment_id:razorpay_payment_id,
  status:"active"
 })

 return NextResponse.json({ success:true })

}