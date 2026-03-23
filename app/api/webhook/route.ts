import { NextResponse } from "next/server"

export async function POST(req: Request){

const body = await req.json()

const message = body.message?.text
const chatId = body.message?.chat?.id

if(!message || !chatId){
return NextResponse.json({ ok:true })
}


// AI response generate
const aiResponse = await fetch("https://api.openai.com/v1/chat/completions",{

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
content:"You are Jarvis AI assistant. Speak smart, short and helpful."
},
{
role:"user",
content:message
}
]

})

})

const aiData = await aiResponse.json()

const reply = aiData.choices?.[0]?.message?.content || "Working..."


// send message back to telegram

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