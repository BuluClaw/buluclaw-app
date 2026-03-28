import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
 process.env.SUPABASE_URL!,
 process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(req: Request){

 try{

  const { message } = await req.json()

  if(!message){

   return NextResponse.json({
    reply:"Empty message"
   })

  }

  // get ai settings from database
  const { data, error } = await supabase
   .from("ai_settings")
   .select("*")
   .limit(1)
   .single()

  if(error || !data){

   return NextResponse.json({
    reply:"AI not configured"
   })

  }

  const res = await fetch(

   `https://generativelanguage.googleapis.com/v1beta/models/${data.model}:generateContent?key=${data.api_key}`,

   {

    method:"POST",

    headers:{
     "Content-Type":"application/json"
    },

    body:JSON.stringify({

     contents:[

      {
       parts:[
        { text: message }
       ]
      }

     ]

    })

   }

  )

  const aiData = await res.json()

  const reply =
   aiData?.candidates?.[0]?.content?.parts?.[0]?.text
   || "AI error"

  return NextResponse.json({
   reply
  })

 }catch(err){

  console.log("AI ERROR:", err)

  return NextResponse.json({
   reply:"AI error"
  })

 }

}