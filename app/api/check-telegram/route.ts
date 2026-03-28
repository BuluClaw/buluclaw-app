import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
 process.env.SUPABASE_URL!,
 process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function GET(){

 try{

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

  // important log
  console.log("AUTO webhook for token:", data.bot_token)

  // direct telegram webhook call (no internal api call)
  const webhookUrl =
  `${process.env.NEXT_PUBLIC_SITE_URL}/api/webhook/${data.bot_token}`

  const tgRes = await fetch(

   `https://api.telegram.org/bot${data.bot_token}/setWebhook`,

   {
    method:"POST",
    headers:{
     "Content-Type":"application/json"
    },
    body:JSON.stringify({
     url:webhookUrl
    })
   }

  )

  const tgData = await tgRes.json()

  console.log("telegram webhook auto:", tgData)

  return NextResponse.json({

   connected:true,
   webhook:tgData

  })

 }catch(err){

  console.log("AUTO WEBHOOK ERROR:", err)

  return NextResponse.json({
   connected:false
  })

 }

}