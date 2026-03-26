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

  const token =
   context.params.token

  const body =
   await request.json()

  const chatId =
   body?.message?.chat?.id

  const userMessage =
   body?.message?.text


  if(!chatId || !userMessage){

   return NextResponse.json({
    ok:true
   })

  }


  // find connection
  const { data:connection } =
   await supabase
    .from("telegram_connections")
    .select("user_id")
    .eq("bot_token", token)
    .single()


  if(!connection){

   return NextResponse.json({
    ok:true
   })

  }


  // find AI settings
  const { data:ai } =
   await supabase
    .from("ai_settings")
    .select("*")
    .eq("user_id", connection.user_id)
    .single()


  const apiKey =
   ai?.api_key ||
   process.env.GEMINI_API_KEY


  const model =
   ai?.model ||
   "gemini-2.5-flash"


  const prompt =
   ai?.prompt ||
   "You are helpful assistant"



  // AI call
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
prompt +
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



  // send reply
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