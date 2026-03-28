import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
 process.env.SUPABASE_URL!,
 process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(
 req: NextRequest,
 context: any
){

 try{

  const token = context.params.token

  const body = await req.json()

  const chatId =
  body?.message?.chat?.id?.toString()

  const text =
  body?.message?.text


  if(!chatId || !text){

   return NextResponse.json({ ok:true })

  }


  /*
  ============================
  START MESSAGE
  ============================
  */

  if(text === "/start"){

   const pairingCode =
   Math.random()
   .toString(36)
   .substring(2,8)
   .toUpperCase()

   const startMessage =

`OpenClaw: access not configured.

Your Telegram user id: ${chatId}

Pairing code: ${pairingCode}

Ask the bot owner to approve with:
openclaw pairing approve telegram ${pairingCode}`


   await fetch(

    `https://api.telegram.org/bot${token}/sendMessage`,

    {

     method:"POST",

     headers:{
      "Content-Type":"application/json"
     },

     body:JSON.stringify({

      chat_id:chatId,
      text:startMessage

     })

    }

   )


   return NextResponse.json({ ok:true })

  }



  /*
  ============================
  AI RESPONSE
  ============================
  */


  // get connection
  const { data: connection } =
  await supabase
  .from("telegram_connections")
  .select("id")
  .eq("bot_token", token)
  .single()


  // get ai settings
  const { data: ai } =
  await supabase
  .from("ai_settings")
  .select("api_key, model, prompt")
  .eq("user_id", connection?.id)
  .single()


  const apiKey =
  ai?.api_key


  const model =
  ai?.model ||
  "gemini-2.5-flash"


  const prompt =
  ai?.prompt ||
  "You are helpful assistant"



  /*
  ============================
  CHECK AI CONFIG
  ============================
  */


  if(!apiKey){

   await fetch(

    `https://api.telegram.org/bot${token}/sendMessage`,

    {

     method:"POST",

     headers:{
      "Content-Type":"application/json"
     },

     body:JSON.stringify({

      chat_id:chatId,
      text:"AI not configured"

     })

    }

   )

   return NextResponse.json({ ok:true })

  }



  /*
  ============================
  LOAD MEMORY
  ============================
  */


  const { data: memory } =
  await supabase
  .from("ai_memory")
  .select("role, content")
  .eq("telegram_id", chatId)
  .order("created_at",{ ascending:true })
  .limit(10)



  const history =
  memory?.map(m=>({

   role:m.role,
   parts:[
    { text:m.content }
   ]

  })) || []



  /*
  ============================
  SAVE USER MESSAGE
  ============================
  */


  await supabase
  .from("ai_memory")
  .insert({

   telegram_id:chatId,
   role:"user",
   content:text

  })



  /*
  ============================
  AI REQUEST
  ============================
  */


  const aiRes =
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
       role:"user",
       parts:[
        {
         text:prompt
        }
       ]
      },

      ...history,

      {
       role:"user",
       parts:[
        {
         text:text
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

  ||

  "AI error"



  /*
  ============================
  SAVE AI REPLY
  ============================
  */


  await supabase
  .from("ai_memory")
  .insert({

   telegram_id:chatId,
   role:"assistant",
   content:reply

  })



  /*
  ============================
  SEND MESSAGE
  ============================
  */


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



 }catch(err){

  console.log(err)

  return NextResponse.json(

   { ok:false },

   { status:500 }

  )

 }

}