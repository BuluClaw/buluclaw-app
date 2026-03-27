import { NextResponse } from "next/server"

export async function POST(req:Request){

 try{

  const { bot_token } = await req.json()

  const url = process.env.NEXT_PUBLIC_SITE_URL

  const webhookURL =
   `${url}/api/webhook/${bot_token}`

  const res = await fetch(

   `https://api.telegram.org/bot${bot_token}/setWebhook`,

   {

    method:"POST",

    headers:{
     "Content-Type":"application/json"
    },

    body:JSON.stringify({

     url:webhookURL

    })

   }

  )

  const data = await res.json()

  return NextResponse.json({

   success:data.ok

  })

 }catch(e){

  return NextResponse.json({

   success:false

  })

 }

}