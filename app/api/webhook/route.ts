import { NextResponse } from "next/server"

export async function POST(req: Request){

const body = await req.json()

const message = body.message?.text
const chatId = body.message?.chat?.id

if(!message) return NextResponse.json({ ok:true })

// OpenAI call
const ai = await fetch("https://api.openai.com/v1/chat/completions",{
method:"POST",
headers:{
"Content-Type":"application/json",
"Authorization":`Bearer ${process.env.OPENAI_API_KEY}`
},
body:JSON.stringify({

model:"gpt-4o-mini",

messages:[

{
role:"system",
content:"You are Jarvis, a smart AI assistant. Reply short, helpful, slightly futuristic."
},

{
role:"user",
content:message
}

]

})
})

const data = await ai.json()

const reply =
data?.choices?.[0]?.message?.content ||
"System online. How may I assist?"

// send back to telegram
await fetch(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`,{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({

chat_id:chatId,
text:reply

})

})

return NextResponse.json({ ok:true })

}