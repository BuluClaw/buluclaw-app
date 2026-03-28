import { NextResponse } from "next/server"

export async function POST(req:Request){

 const { message } = await req.json()

 const res =
 await fetch(

  `${process.env.NEXT_PUBLIC_SITE_URL}/api/ai`,

  {

   method:"POST",

   headers:{
    "Content-Type":"application/json"
   },

   body:JSON.stringify({

    message

   })

  }

 )

 const data =
 await res.json()

 return NextResponse.json(data)

}