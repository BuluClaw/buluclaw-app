import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
 process.env.SUPABASE_URL!,
 process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(req:Request){

 const body = await req.json()

 const token = body.token
 const email = body.email

 // user find
 const { data:user } =
  await supabase
   .from("users")
   .select("id")
   .eq("email", email)
   .single()

   if(!user){

 return NextResponse.json({
  error:"user not found"
 })

}

 // token save
 await supabase
  .from("telegram_connections")
  .upsert({

   user_id:user.id,
   email,
   bot_token:token

  })

 return NextResponse.json({
  success:true
 })

}