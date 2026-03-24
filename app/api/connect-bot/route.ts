import { NextResponse } from "next/server"

export async function POST(req: Request){

  try{

    // token request se aayega
    const { token } = await req.json()

    if(!token){
      return NextResponse.json({
        success:false
      })
    }

    const webhookUrl =
      `https://buluclaw.com/api/webhook/${token}`

    await fetch(

      `https://api.telegram.org/bot${token}/setWebhook`,

      {
        method:"POST",

        headers:{
          "Content-Type":"application/json"
        },

        body: JSON.stringify({

          url: webhookUrl

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