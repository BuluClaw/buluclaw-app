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

  let text =
  body?.message?.text || ""


  /*
  ============================
  VOICE SUPPORT
  ============================
  */

  const voice =
  body?.message?.voice

  if(voice){

   const fileRes =
   await fetch(
    `https://api.telegram.org/bot${token}/getFile?file_id=${voice.file_id}`
   )

   const fileData =
   await fileRes.json()

   const fileUrl =
   `https://api.telegram.org/file/bot${token}/${fileData.result.file_path}`

   const audioRes =
   await fetch(fileUrl)

   const audioBuffer =
   await audioRes.arrayBuffer()

   const speechRes =
   await fetch(

    `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,

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

          inline_data:{
           mime_type:"audio/ogg",
           data:Buffer.from(audioBuffer).toString("base64")
          }

         },

         {
          text:"Convert this speech to text"
         }

        ]

       }

      ]

     })

    }

   )

   const speechJson =
   await speechRes.json()

   text =
   speechJson?.candidates?.[0]?.content?.parts?.[0]?.text
   || ""

  }


  /*
  ============================
  IMAGE SUPPORT
  ============================
  */

  let inlineImage:any = null

  const photo =
  body?.message?.photo

  if(photo){

   const fileRes =
   await fetch(

    `https://api.telegram.org/bot${token}/getFile?file_id=${photo[photo.length-1].file_id}`

   )

   const fileData =
   await fileRes.json()

   const fileUrl =
   `https://api.telegram.org/file/bot${token}/${fileData.result.file_path}`

   const imageRes =
   await fetch(fileUrl)

   const imageBuffer =
   await imageRes.arrayBuffer()

   inlineImage =
   Buffer.from(imageBuffer).toString("base64")

   text =
   "Explain this image"

  }


  /*
  ============================
  PDF SUPPORT
  ============================
  */

  let inlinePdf:any = null

  const document =
  body?.message?.document

  if(document?.mime_type === "application/pdf"){

   const fileRes =
   await fetch(

    `https://api.telegram.org/bot${token}/getFile?file_id=${document.file_id}`

   )

   const fileData =
   await fileRes.json()

   const fileUrl =
   `https://api.telegram.org/file/bot${token}/${fileData.result.file_path}`

   const pdfRes =
   await fetch(fileUrl)

   const pdfBuffer =
   await pdfRes.arrayBuffer()

   inlinePdf =
   Buffer.from(pdfBuffer).toString("base64")

   text =
   "Summarize this PDF"

  }


  if(!chatId){

   return NextResponse.json({ ok:true })

  }


  /*
  ============================
  START COMMAND
  ============================
  */

  if(text === "/start"){

   await fetch(

    `https://api.telegram.org/bot${token}/sendMessage`,

    {

     method:"POST",

     headers:{
      "Content-Type":"application/json"
     },

     body:JSON.stringify({

      chat_id:chatId,

      text:"AI connected successfully ✅"

     })

    }

   )

   return NextResponse.json({ ok:true })

  }


  /*
  ============================
  RESET MEMORY
  ============================
  */

  if(text === "/reset"){

   await supabase
   .from("ai_memory")
   .delete()
   .eq("telegram_id", chatId)

   await fetch(

    `https://api.telegram.org/bot${token}/sendMessage`,

    {

     method:"POST",

     headers:{
      "Content-Type":"application/json"
     },

     body:JSON.stringify({

      chat_id:chatId,

      text:"Memory cleared ✅"

     })

    }

   )

   return NextResponse.json({ ok:true })

  }


  /*
  ============================
  LOAD AI SETTINGS
  ============================
  */

  const { data: connection } =
  await supabase
  .from("telegram_connections")
  .select("id")
  .eq("bot_token", token)
  .single()


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
  "gemini-1.5-flash"

  const prompt =
  ai?.prompt ||
  "You are helpful assistant"


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
  .limit(20)


  const history =
  memory?.map(m=>({

   role:
   m.role === "assistant"
   ? "model"
   : "user",

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
  TYPING
  ============================
  */

  await fetch(

   `https://api.telegram.org/bot${token}/sendChatAction`,

   {

    method:"POST",

    headers:{
     "Content-Type":"application/json"
    },

    body:JSON.stringify({

     chat_id:chatId,

     action:"typing"

    })

   }

  )


  /*
  ============================
  AI REQUEST
  ============================
  */

  const parts:any[] = [

   {
    text:
    prompt +
    "\nUser: " +
    text
   }

  ]


  if(inlineImage){

   parts.push({

    inline_data:{

     mime_type:"image/jpeg",

     data:inlineImage

    }

   })

  }


  if(inlinePdf){

   parts.push({

    inline_data:{

     mime_type:"application/pdf",

     data:inlinePdf

    }

   })

  }


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

      ...history,

      {

       role:"user",

       parts

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