import { NextResponse } from "next/server"

export async function POST(req: Request){

 try{

  const { token } = await req.json()

  if(!token){

   return NextResponse.json({
    success:false
   })

  }

  const webhookUrl =
  `${process.env.NEXT_PUBLIC_SITE_URL}/api/webhook/${token}`

  const tgRes = await fetch(

   `https://api.telegram.org/bot${token}/setWebhook`,

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

  const data = await tgRes.json()

  console.log("telegram webhook:", data)

  return NextResponse.json({

   success:data.ok,
   webhook:webhookUrl

  })

 }catch(e){

  console.log(e)

  return NextResponse.json({
   success:false
  })

 }

}