"use client"

import { useEffect, useState } from "react"
import Image from "next/image"

export default function DeployPage(){

const [step,setStep] = useState(1)

useEffect(()=>{

setTimeout(()=>{
setStep(2)
},2500)

setTimeout(()=>{
setStep(3)
},6000)

},[])

return(

<div className="h-screen w-screen flex items-center justify-center bg-[#040612] text-white">

<div className="w-full max-w-2xl px-6">

{/* STEP 1 */}
{step===1 && (

<div className="flex flex-col items-center text-center">

<div className="w-20 h-20 border-4 border-gray-700 border-t-white rounded-full animate-spin mb-8"/>

<h1 className="text-3xl font-semibold mb-3">
Starting your deployment
</h1>

<p className="text-gray-400 text-lg">
Do not switch other tabs. This only takes a few seconds.
</p>

</div>

)}

{/* STEP 2 */}
{step===2 && (

<div className="flex flex-col items-center text-center">

<div className="w-20 h-20 border-4 border-gray-700 border-t-white rounded-full animate-spin mb-8"/>

<h1 className="text-3xl font-semibold mb-3">
Purchasing local virtual machine
</h1>

<p className="text-gray-400 text-lg">
Do not switch other tabs. This only takes a few seconds.
</p>

</div>

)}

{/* STEP 3 TELEGRAM */}
{step===3 && (

<div className="bg-[#0b1220] border border-gray-800 rounded-2xl p-10">

<div className="flex items-center gap-3 mb-6">

<Image
src="/icons/icons8-telegram-50.png"
alt="telegram"
width={28}
height={28}
/>

<h2 className="text-xl font-semibold">
Connect your Telegram
</h2>

</div>

<p className="text-gray-50 mb-6">
Follow these steps
</p>

<div className="space-y-4 text-gray-300 mb-8">

<p>
1. Open the bot by clicking on the BotFather message.
</p>

<p>
2. Click the Start button to send a message to your bot.
</p>

<p>
3. Click the button below to confirm you sent the first message.
</p>

</div>


<button
onClick={()=>alert("Message confirmed")}
className="w-full bg-neutral-950 border-x-gray-50 py-3 rounded-lg"
>

I have sent a message ✓

</button>

</div>

)}

</div>

</div>

)

}