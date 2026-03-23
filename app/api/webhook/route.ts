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

    // call Gemini AI (FREE)
    const aiRes = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=" + process.env.GEMINI_API_KEY,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [
                {
                  text: `You are Jarvis AI assistant. Reply short, smart and helpful.

User message: ${message}`
                }
              ]
            }
          ]
        }),
      }
    )

    const aiData = await aiRes.json()

    console.log("ai response:", aiData)

    const reply =
      aiData?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "Jarvis online 🤖"

    // send message back to telegram
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

  } catch (err) {

    console.log("ERROR:", err)

    return NextResponse.json({ ok: false })

  }

}