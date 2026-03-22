"use client"

import { useEffect, useState } from "react"

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

<div className="w-full max-w-xl">

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

<div className="bg-[#0b1220] p-10 rounded-xl border border-gray-800">

<h2 className="text-xl mb-6">
Connect your Telegram
</h2>

<p className="text-gray-400 mb-6">
Follow these steps
</p>

<div className="text-gray-300 space-y-3 mb-8">

<p>
1. Open BotFather
</p>

<p>
2. Click Start button
</p>

<p>
3. Come back and confirm
</p>

</div>

<button
onClick={()=>window.open("https://t.me/BotFather")}
className="w-full bg-white text-black py-3 rounded-lg mb-4"
>

Open BotFather

</button>

<button
onClick={()=>alert("Bot connected")}
className="w-full bg-[#1f2937] py-3 rounded-lg"
>

I have sent a message ✓

</button>

</div>

)}

</div>

</div>

)

}