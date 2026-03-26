import { NextResponse } from "next/server"

export async function POST(req:Request){

 const body =
  await req.json()

 const token =
  body.bot_token

 await fetch(

  `https://api.telegram.org/bot${token}/setWebhook?url=${process.env.NEXT_PUBLIC_APP_URL}/api/webhook/${token}`

 )

 return NextResponse.json({

  success:true

 })

}