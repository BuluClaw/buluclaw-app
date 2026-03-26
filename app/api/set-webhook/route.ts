import { NextResponse } from "next/server"

export async function POST(req: Request){

 try{

  const body =
   await req.json()

  const token =
   body.bot_token

  const webhookUrl =
   process.env.NEXT_PUBLIC_BASE_URL +
   "/api/webhook/" +
   token

  const res =
   await fetch(

    `https://api.telegram.org/bot${token}/setWebhook?url=${webhookUrl}`

   )

  const data =
   await res.json()

  return NextResponse.json({

   success:data.ok

  })

 }catch(err){

  return NextResponse.json({

   success:false

  })

 }

}