import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
 process.env.SUPABASE_URL!,
 process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(
 request: Request,
 context: { params: { token: string } }
){

 try{

  // telegram bot token from url
  const token =
   context.params.token


  // telegram message data
  const body =
   await request.json()

  const chatId =
   body?.message?.chat?.id

  const userMessage =
   body?.message?.text


  if(!chatId || !userMessage){

   return NextResponse.json({ ok:true })

  }


  // get user AI settings from database
  const { data:user } =
   await supabase
    .from("telegram_connections")
    .select(`
     user_id,
     ai_settings(
      api_key,
      model,
      prompt
     )
    `)
    .eq("bot_token", token)
    .single()



  if(!user){

   console.log("user not found")

   return NextResponse.json({ ok:true })

  }


  // ai settings (relation array hota hai)
  const ai =
   user.ai_settings?.[0]


  const apiKey =
   ai?.api_key


  const model =
   ai?.model || "gemini-1.5-flash"


  const systemPrompt =
   ai?.prompt || "You are helpful assistant"



  // call gemini ai
  const aiResponse =
   await fetch(

`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,

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
          text:
           systemPrompt +
           "\nUser: " +
           userMessage
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



  // send reply to telegram
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


  return NextResponse.json({ ok:true })


 }
 catch(err){

  console.log(err)

  return NextResponse.json(

   { ok:false },

   { status:500 }

  )

 }

}