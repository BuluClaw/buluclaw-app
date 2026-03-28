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

  const voice =
body?.message?.voice

// voice message aaya
if(voice){

 const fileId =
 voice.file_id


 // telegram se file path lo
 const fileRes =
 await fetch(

  `https://api.telegram.org/bot${token}/getFile?file_id=${fileId}`

 )

 const fileData =
 await fileRes.json()


 const filePath =
 fileData?.result?.file_path


 const fileUrl =
 `https://api.telegram.org/file/bot${token}/${filePath}`


 // voice download
 const audioRes =
 await fetch(fileUrl)


 const audioBuffer =
 await audioRes.arrayBuffer()


 // Gemini speech to text
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
         data:Buffer
         .from(audioBuffer)
         .toString("base64")
        }

       },

       {

        text:"convert speech to text"

       }

      ]

     }

    ]

   })

  }

 )


 const speechJson =
 await speechRes.json()


 const speechText =
 speechJson
 ?.candidates?.[0]
 ?.content?.parts?.[0]
 ?.text


 // user text me convert
 body.message.text =
 speechText

}

/*
============================
IMAGE SUPPORT
============================
*/

const photo =
body?.message?.photo


if(photo){

 const fileId =
 photo[photo.length-1].file_id


 const fileRes =
 await fetch(

  `https://api.telegram.org/bot${token}/getFile?file_id=${fileId}`

 )


 const fileData =
 await fileRes.json()


 const filePath =
 fileData?.result?.file_path


 const fileUrl =
 `https://api.telegram.org/file/bot${token}/${filePath}`


 const imageRes =
 await fetch(fileUrl)


 const imageBuffer =
 await imageRes.arrayBuffer()


 const base64Image =
 Buffer.from(imageBuffer)
 .toString("base64")


 // image ko AI ko bhejne ke liye text set
 body.message.text =
 "Explain this image"


 body.message.inlineImage =
 base64Image

}
/*
============================
PDF SUPPORT
============================
*/

const document =
body?.message?.document


if(document?.mime_type === "application/pdf"){

 const fileId =
 document.file_id


 // telegram se file path lo
 const fileRes =
 await fetch(

  `https://api.telegram.org/bot${token}/getFile?file_id=${fileId}`

 )


 const fileData =
 await fileRes.json()


 const filePath =
 fileData?.result?.file_path


 const fileUrl =
 `https://api.telegram.org/file/bot${token}/${filePath}`


 // pdf download
 const pdfRes =
 await fetch(fileUrl)


 const pdfBuffer =
 await pdfRes.arrayBuffer()


 const base64Pdf =
 Buffer.from(pdfBuffer)
 .toString("base64")


 // AI ko instruction
 body.message.text =
 "Summarize this PDF clearly"


 body.message.inlinePdf =
 base64Pdf

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

    text:"Memory cleared ✅\n\nAb nayi conversation start ho gayi."

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
  .limit(30)



  const history =
  memory?.map(m=>({

   role: m.role === "assistant"
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
TYPING INDICATOR
============================
*/

await fetch(`https://api.telegram.org/bot${token}/sendChatAction`,{
 method:"POST",
 headers:{ "Content-Type":"application/json" },
 body:JSON.stringify({
  chat_id:chatId,
  action:"typing"
 })
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
      ...(body.message.inlinePdf
 ? [{
     inline_data:{
      mime_type:"application/pdf",
      data:body.message.inlinePdf
     }
   }]
 : []),
...(body.message.inlineImage
 ? [{
     inline_data:{
      mime_type:"image/jpeg",
      data:body.message.inlineImage
     }
   }]
 : []),

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