import { NextResponse } from "next/server"

export async function POST(
 req: Request,
 context: { params: { token: string } }
) {

 try {

  const { token } = context.params

  const body = await req.json()

  console.log("telegram message:", body)

  const chatId =
   body?.message?.chat?.id

  if (!chatId) {
   return NextResponse.json({ ok: true })
  }

  const text =
`OpenClaw connected ✅

Your chat id:
${chatId}

You can now send commands.`

  await fetch(
   `https://api.telegram.org/bot${token}/sendMessage`,
   {
    method: "POST",
    headers: {
     "Content-Type": "application/json"
    },
    body: JSON.stringify({
     chat_id: chatId,
     text
    })
   }
  )

  return NextResponse.json({ ok: true })

 } catch (err) {

  console.log(err)

  return NextResponse.json(
   { ok: false },
   { status: 500 }
  )

 }

}