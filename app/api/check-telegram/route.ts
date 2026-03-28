import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
 process.env.SUPABASE_URL!,
 process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function GET(){

 try{

  // latest saved telegram bot token
  const { data, error } = await supabase
   .from("telegram_connections")
   .select("bot_token")
   .order("created_at",{ ascending:false })
   .limit(1)
   .single()

  if(error || !data){

   return NextResponse.json({
    connected:false
   })

  }

  // AUTO SET WEBHOOK
  const webhookRes = await fetch(
   `${process.env.NEXT_PUBLIC_SITE_URL}/api/set-webhook`,
   {
    method:"POST",
    headers:{
     "Content-Type":"application/json"
    },
    body:JSON.stringify({
     token:data.bot_token
    })
   }
  )

  const webhookData = await webhookRes.json()

  console.log("webhook auto result:", webhookData)

  return NextResponse.json({

   connected:true,
   token:data.bot_token,
   webhook:webhookData

  })

 }catch(err){

  console.log("check telegram error:", err)

  return NextResponse.json({
   connected:false
  })

 }

}