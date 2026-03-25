import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
 process.env.SUPABASE_URL!,
 process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(req: Request){

 try{

  const { token, email } =
   await req.json()

  await supabase
   .from("telegram_connections")
   .insert({
    email,
    bot_token: token
   })

  return NextResponse.json({

   success:true

  })

 }catch(e){

  return NextResponse.json({

   success:false

  })

 }

}