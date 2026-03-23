import { NextResponse } from "next/server"

export async function POST(req: Request) {

  try {

    const body = await req.json()

    const message = body?.message?.text
    const chatId = body?.message?.chat?.id

    console.log("incoming msg:", message)

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
                  text: `You are Jarvis AI assistant. Reply short and helpful.

User message: ${message}`
                }
              ]
            }
          ]
        }),
      }
    )

    const aiData = await aiRes.json()

    console.log("Gemini response:", aiData)

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

    console.log("ERROR:", error)

    return NextResponse.json({ ok: false })

  }

}