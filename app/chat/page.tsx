"use client"

import { useState } from "react"

export default function Chat(){

 const [msg,setMsg]=useState("")
 const [chat,setChat]=useState<string[]>([])

 const send = async()=>{

  const res =
  await fetch("/api/chat",{

   method:"POST",

   headers:{
    "Content-Type":"application/json"
   },

   body:JSON.stringify({

    message:msg

   })

  })

  const data =
  await res.json()

  setChat([

   ...chat,

   "You: "+msg,
   "AI: "+data.reply

  ])

  setMsg("")

 }

 return(

  <div style={{padding:40}}>

   <h1>AI Chat</h1>

   <div>

    {chat.map((c,i)=>(
     <div key={i}>{c}</div>
    ))}

   </div>

   <input

    value={msg}

    onChange={e=>setMsg(e.target.value)}

   />

   <button onClick={send}>
    send
   </button>

  </div>

 )

}