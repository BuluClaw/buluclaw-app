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


  // save token only
  const { error } =
   await supabase
    .from("telegram_connections")
    .insert({

     email: email || "user",
     bot_token: token

    })


  if(error){

   console.log(error)

   return NextResponse.json({

    success:false

   })

  }


  return NextResponse.json({

   success:true

  })


 }

 catch(err){

  console.log(err)

  return NextResponse.json({

   success:false

  })

 }

}