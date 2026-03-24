import { NextResponse } from "next/server"
import { createClient } from "@/utils/supabase/server"

export async function POST(req: Request) {

const { token } = await req.json()

const supabase = await createClient()

const { data:{user} } = await supabase.auth.getUser()

if(!user) return NextResponse.json({ok:false})

await supabase
.from("users")
.update({ telegram_token: token })
.eq("id",user.id)

return NextResponse.json({ok:true})

}