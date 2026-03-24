import { NextResponse } from "next/server"
import { createClient } from "@/utils/supabase/server"

export async function POST(req: Request) {

  try {

    const { token } = await req.json()

    if (!token) {
      return NextResponse.json({ ok:false, error:"token missing" })
    }

    // IMPORTANT
    const supabase = await createClient()

    // get logged user
    const { data, error: authError } = await supabase.auth.getUser()

    if (authError || !data?.user) {
      console.log("auth error", authError)
      return NextResponse.json({ ok:false })
    }

    const user = data.user

    // save token
    const { error } = await supabase
      .from("users")
      .upsert({
        id: user.id,
        email: user.email,
        telegram_token: token
      })

    if (error) {
      console.log("DB ERROR", error)
      return NextResponse.json({ ok:false })
    }

    return NextResponse.json({ ok:true })

  } catch (err) {

    console.log("SERVER ERROR", err)

    return NextResponse.json({ ok:false })

  }

}