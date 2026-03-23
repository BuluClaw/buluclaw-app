"use client"

import { useState, useEffect } from "react"
export default function DeployPage(){

const [step,setStep] = useState(1)
useEffect(()=>{

if(step===2){

setTimeout(()=>{

setStep(3)

},2000)

}

},[step])

return(

<div className="min-h-screen flex items-center justify-center bg-[#0b0f19] text-white">

<div className="bg-[#111827] p-10 rounded-xl w-[420px] text-center space-y-6">

{step===1 && (
<>
<h2 className="text-xl font-semibold">
Select Model
</h2>

<p className="text-gray-400">
BuluClaw style deploy
</p>

<button
onClick={()=>setStep(2)}
className="w-full bg-white text-black py-2 rounded-lg"
>

Deploy

</button>

</>
)}
{step===2 && (
<>
<h2>Starting deployment...</h2>

<button
onClick={()=>setStep(3)}
className="w-full bg-white text-black py-2 rounded-lg"
>

Next

</button>

</>
)}

{step===3 && (
<>
<h2>
Connect Telegram
</h2>

<p className="text-gray-400">
send any message to bot
</p>

<button
onClick={()=>setStep(4)}
className="w-full bg-white text-black py-2 rounded-lg"
>

I sent message

</button>

</>
)}

{step===4 && (
<>
<h2 className="text-green-400">
Success ✅
</h2>

<p>
AI agent ready
</p>

<button
onClick={()=>window.location.href="/dashboard"}
className="w-full bg-white text-black py-2 rounded-lg"
>

Back to dashboard

</button>

</>
)}

</div>

</div>

)

}