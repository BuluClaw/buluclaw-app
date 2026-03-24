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

const url = new URL(req.url)

// token url se ayega
const botToken = url.searchParams.get("token")

const body = await req.json()

const message = body?.message?.text
const chatId = body?.message?.chat?.id

if(!message) return NextResponse.json({ ok:true })


// AI call
const aiRes = await fetch(
`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({

contents:[
{
parts:[
{
text: `${SYSTEM_PROMPT}

User message: ${message}`
}
]
}
]

})
}
)

const aiData = await aiRes.json()

let reply = "Jarvis online 🤖"

if(aiData?.candidates?.[0]?.content?.parts?.[0]?.text){

reply = aiData.candidates[0].content.parts[0].text

}


// reply user bot par jayega
await fetch(

`https://api.telegram.org/bot${botToken}/sendMessage`,

{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({

chat_id: chatId,
text: reply

})
}

)

return NextResponse.json({ ok:true })

}catch(err){

console.log(err)

return NextResponse.json({ ok:false })

}

}