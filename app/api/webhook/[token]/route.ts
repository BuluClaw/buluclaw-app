import { NextResponse } from "next/server"

export async function POST(
 req: Request,
 context: any
) {

 try {

  const token =
   context.params.token

  const body =
   await req.json()

  const chatId =
   body?.message?.chat?.id

  const userMessage =
   body?.message?.text

  if (!chatId || !userMessage) {

   return NextResponse.json({
    ok:true
   })

  }

  // GEMINI AI CALL

  const aiResponse =
   await fetch(
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=" +
     process.env.GEMINI_API_KEY,
    {
     method:"POST",
     headers:{
      "Content-Type":"application/json"
     },
     body:JSON.stringify({

      contents:[
       {
        parts:[
         {
          text:userMessage
         }
        ]
       }
      ]

     })
    }
   )

  const aiData =
   await aiResponse.json()

  const reply =
   aiData?.candidates?.[0]?.content?.parts?.[0]?.text
   || "AI error"

  // SEND BACK TO TELEGRAM

  await fetch(

   `https://api.telegram.org/bot${token}/sendMessage`,

   {
    method:"POST",

    headers:{
     "Content-Type":"application/json"
    },

    body:JSON.stringify({

     chat_id:chatId,
     text:reply

    })

   }

  )

  return NextResponse.json({

   ok:true

  })

 } catch (err) {

  console.log(err)

  return NextResponse.json(

   { ok:false },

   { status:500 }

  )

 }

}