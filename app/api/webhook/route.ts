import { NextResponse } from "next/server"

const SYSTEM_PROMPT = `
You are Jarvis AI, business assistant for BuluClaw users.

Help users earn money online.
Give practical ideas.
Reply short.
Use Hindi + English mix.

Suggest:
- freelancing
- affiliate marketing
- digital products
- AI services
- dropshipping
- youtube automation
`

export async function POST(req: Request) {

  try {

    const body = await req.json()

    const message = body?.message?.text
    const chatId = body?.message?.chat?.id

    console.log("msg:", message)

    if (!message) {
      return NextResponse.json({ ok: true })
    }

    const aiRes = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `${SYSTEM_PROMPT}

User message: ${message}`
                }
              ]
            }
          ]
        }),
      }
    )

    const aiData = await aiRes.json()

    let reply = "Jarvis online 🤖"

    if (aiData?.candidates?.[0]?.content?.parts?.[0]?.text) {
      reply = aiData.candidates[0].content.parts[0].text
    }

    await fetch(
      `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chat_id: chatId,
          text: reply,
        }),
      }
    )

    return NextResponse.json({ ok: true })

  } catch (error) {

    console.log(error)

    return NextResponse.json({ ok: false })

  }

}