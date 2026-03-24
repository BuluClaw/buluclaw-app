import { NextResponse } from "next/server"
import { createClient } from "@/utils/supabase/server"

export async function POST(req: Request) {

  try {

    const body = await req.json()
    const token = body.token

    if(!token){
      return NextResponse.json({ ok:false, error:"no token" })
    }

    const supabase = await createClient()

    const {
      data: { user },
      error: userError
    } = await supabase.auth.getUser()

    if(userError || !user){
      console.log("no user", userError)
      return NextResponse.json({ ok:false })
    }

    const { error } = await supabase
      .from("users")
      .upsert({
        id: user.id,
        email: user.email,
        telegram_token: token
      })

    if(error){
      console.log("db error", error)
      return NextResponse.json({ ok:false })
    }

    return NextResponse.json({ ok:true })

  } catch (err) {

    console.log("server error", err)

    return NextResponse.json({ ok:false })

  }

}