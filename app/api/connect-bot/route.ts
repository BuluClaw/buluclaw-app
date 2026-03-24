import { NextResponse } from "next/server"

export async function POST(req: Request) {

  try {

    const { token } = await req.json()


 const webhookUrl =
`https://www.buluclaw.com/api/webhook/${token}`

    await fetch(
      `https://api.telegram.org/bot${token}/setWebhook`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          url: webhookUrl,
        }),
      }
    )

    return NextResponse.json({
      success: true,
    })

  } catch (error) {

    return NextResponse.json({
      success: false,
    })

  }

}