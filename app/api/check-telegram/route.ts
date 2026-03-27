import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
 process.env.SUPABASE_URL!,
 process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function GET(){

 try{

  // latest saved telegram bot
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

  return NextResponse.json({

   connected:true,
   token:data.bot_token

  })

 }catch(err){

  return NextResponse.json({
   connected:false
  })

 }

}