import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
 process.env.SUPABASE_URL!,
 process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(
 req: NextRequest,
 context: any
) {

 try {

  const token =
   context.params.token


  const body =
   await req.json()


  const chatId =
   body?.message?.chat?.id


  const text =
   body?.message?.text


  if (!chatId || !text) {

   return NextResponse.json({ ok: true })

  }


  // user ai settings
  const { data } =
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


  const ai =
   data?.ai_settings?.[0]


  const apiKey =
   ai?.api_key


  const model =
   ai?.model || "gemini-2.5-flash"


  const prompt =
   ai?.prompt || "You are helpful assistant"



  // call gemini
  const aiRes =
   await fetch(

`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,

    {

     method: "POST",

     headers: {
      "Content-Type": "application/json"
     },

     body: JSON.stringify({

      contents: [
       {
        parts: [
         {
          text:
           prompt +
           "\nUser: " +
           text
         }
        ]
       }
      ]

     })

    }

   )


  const aiJson =
   await aiRes.json()


  const reply =
   aiJson?.candidates?.[0]?.content?.parts?.[0]?.text
   || "AI error"


  // telegram reply
  await fetch(

   `https://api.telegram.org/bot${token}/sendMessage`,

   {

    method: "POST",

    headers: {
     "Content-Type": "application/json"
    },

    body: JSON.stringify({

     chat_id: chatId,
     text: reply

    })

   }

  )


  return NextResponse.json({ ok: true })

 }

 catch (err) {

  console.log(err)

  return NextResponse.json(

   { ok: false },

   { status: 500 }

  )

 }

}