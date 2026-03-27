import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
 process.env.SUPABASE_URL!,
 process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(req: Request){

 try{

  const { token,email } =
   await req.json()

  if(!token){

   return NextResponse.json({

    success:false,
    error:"token missing"

   })

  }


  // SAVE TELEGRAM TOKEN
  const { data, error } =
   await supabase
   .from("telegram_connections")
   .insert({

    email: email,
    bot_token: token

   })
   .select()
   .single()


  if(error){

   console.log(error)

   return NextResponse.json({

    success:false

   })

  }


  // AUTO CREATE AI SETTINGS
  await supabase
  .from("ai_settings")
  .insert({

   user_id: data.id,

   api_key:
    process.env.DEFAULT_AI_KEY,

   model:
    "gemini-2.5-flash",

   prompt:
    "You are helpful assistant"

  })
// AUTO SET WEBHOOK
await fetch(

 `${process.env.NEXT_PUBLIC_SITE_URL}/api/set-webhook`,

 {
  method:"POST",

  headers:{
   "Content-Type":"application/json"
  },

  body: JSON.stringify({

   bot_token: token

  })

 }
)
  return NextResponse.json({

   success:true

  })


 }catch(err){

  console.log(err)

  return NextResponse.json({

   success:false

  })

 }

}