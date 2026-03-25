import { NextResponse } from "next/server"

export async function POST(req: Request){

 try{

  const { bot_token } =
   await req.json()

  const webhookUrl =
   `https://www.buluclaw.com/api/webhook/${bot_token}`

  const tg =
   await fetch(

    `https://api.telegram.org/bot${bot_token}/setWebhook?url=${webhookUrl}`

   )

  const data =
   await tg.json()

  return NextResponse.json({

   ok:true,
   telegram:data

  })

 }catch(err){

  return NextResponse.json({

   ok:false

  })

 }

}