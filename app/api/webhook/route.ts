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

    // call OpenAI
    const aiRes = await fetch(
      "https://api.openai.com/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [
            {
              role: "system",
              content:
                "You are Jarvis AI assistant. Reply short, smart and helpful.",
            },
            {
              role: "user",
              content: message,
            },
          ],
        }),
      }
    )

    const aiData = await aiRes.json()

    console.log("ai response:", aiData)

    const reply =
      aiData?.choices?.[0]?.message?.content ||
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