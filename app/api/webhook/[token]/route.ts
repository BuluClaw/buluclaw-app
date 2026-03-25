import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
 process.env.SUPABASE_URL!,
 process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(
 req: Request,
 context: { params: { token: string } }
){

 try{

  const token =
   context.params.token

  const body =
   await req.json()

  const chatId =
   body?.message?.chat?.id

  const userMessage =
   body?.message?.text

  if(!chatId || !userMessage){

   return NextResponse.json({

    ok:true

   })

  }

  // CHECK USER EXISTS

  const { data } =
   await supabase
    .from("telegram_connections")
    .select("*")
    .eq("bot_token", token)
    .single()

  if(!data){

   console.log("user not found")

   return NextResponse.json({

    ok:true

   })

  }

  // AI RESPONSE (Gemini)

  const aiResponse =
   await fetch(

    "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=" +
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

  // SEND TELEGRAM MESSAGE

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

 }catch(err){

  console.log(err)

  return NextResponse.json(

   { ok:false },

   { status:500 }

  )

 }

}