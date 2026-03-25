import { NextResponse } from "next/server"
import { createClient } from "@/utils/supabase/server"

export async function POST(req: Request) {

  try {

    const { token } = await req.json()

    if (!token) {
      return NextResponse.json({ ok:false, error:"token missing" })
    }

    const supabase = await createClient()

    const {
      data: { user },
      error: authError
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({
        ok:false,
        error:"not logged in"
      })
    }

    const { error } = await supabase
      .from("users")
      .upsert({
        id: user.id,
        email: user.email,
        telegram_token: token
      })

    if (error) {
      console.log(error)
      return NextResponse.json({ ok:false })
    }

    return NextResponse.json({ ok:true })

  } catch (err) {

    console.log(err)

    return NextResponse.json({ ok:false })

  }

}