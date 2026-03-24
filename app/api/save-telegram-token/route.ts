import { NextResponse } from "next/server"
import { createClient } from "@/utils/supabase/server"

export async function POST(req: Request) {

  try {

    const { token } = await req.json()

 const supabase = await createClient()

    const { data:{ user } } = await supabase.auth.getUser()

    if(!user){
      return NextResponse.json({ ok:false })
    }

    // UPSERT = create if not exist
    await supabase
      .from("users")
      .upsert({
        id: user.id,
        email: user.email,
        telegram_token: token
      })

    return NextResponse.json({ ok:true })

  } catch (err) {

    console.log(err)

    return NextResponse.json({ ok:false })

  }

}