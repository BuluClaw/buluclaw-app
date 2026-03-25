import { NextResponse } from "next/server"

export async function POST(req: Request) {

 try {

  const { bot_token } =
   await req.json()

  if (!bot_token) {

   return NextResponse.json({
    ok:false,
    error:"token missing"
   })

  }

  const webhookUrl =
   `https://www.buluclaw.com/api/webhook/${bot_token}`

  const telegram =
   await fetch(

    `https://api.telegram.org/bot${bot_token}/setWebhook?url=${webhookUrl}`

   )

  const data =
   await telegram.json()

  return NextResponse.json({

   ok:true,
   telegram:data

  })

 } catch (err) {

  console.log(err)

  return NextResponse.json(

   { ok:false },

   { status:500 }

  )

 }

}