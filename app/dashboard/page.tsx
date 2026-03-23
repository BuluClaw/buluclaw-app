"use client"

import { useEffect, useState } from "react"

export default function Dashboard(){

const [step,setStep] = useState(1)
const [loading,setLoading] = useState(false)
const [success,setSuccess] = useState(false)
const [checking,setChecking] = useState(false) // NEW

useEffect(()=>{

setTimeout(()=>{
setStep(2)
},2500)

setTimeout(()=>{
setStep(3)
},5000)

},[])



// UPDATED FUNCTION
async function handleConnect(){

setChecking(true)

try{

// backend check karega telegram message aaya ya nahi
const res = await fetch("/api/check-telegram")

const data = await res.json()

if(data.connected){

setChecking(false)
setLoading(true)

setTimeout(()=>{
setLoading(false)
setSuccess(true)
},3000)

}else{

setChecking(false)
alert("Telegram bot ko message bhejo pehle")

}

}catch(e){

setChecking(false)
alert("Server error")

}

}



return(

<div className="h-screen w-screen flex items-center justify-center bg-black text-white">

{/* STEP 1 */}
{step===1 && (

<div className="text-center">

<div className="mb-8 flex justify-center">
<div className="w-20 h-20 border-4 border-gray-700 border-t-white rounded-full animate-spin"/>
</div>

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

<div className="text-center">

<div className="mb-8 flex justify-center">
<div className="w-20 h-20 border-4 border-gray-700 border-t-white rounded-full animate-spin"/>
</div>

<h1 className="text-3xl font-semibold mb-3">
Purchasing local virtual machine
</h1>

<p className="text-gray-400 text-lg">
Do not switch other tabs. This only takes a few seconds.
</p>

</div>

)}



{/* STEP 3 connect screen */}
{step===3 && !loading && !success && (

<div className="bg-[#0c1220] p-8 rounded-2xl w-[420px] text-center shadow-xl">

<h2 className="text-white text-xl mb-4">
Connect your Telegram
</h2>

<p className="text-gray-400 text-sm mb-6">

Follow these steps

<br /><br />

1. Open the bot by clicking on the BotFather message.
<br />

2. Click the Start button to send a message to your bot.
<br />

3. Click the button below to confirm you sent the first message.

</p>

<button
onClick={handleConnect}
className="w-full bg-white text-black py-3 rounded-lg font-medium"
>

{checking ? "Checking..." : "I have sent a message ✓"}

</button>

</div>

)}



{/* STEP 4 pairing loader */}
{loading && (

<div className="text-center">

<div className="mb-8 flex justify-center">
<div className="w-20 h-20 border-4 border-gray-700 border-t-white rounded-full animate-spin"/>
</div>

<h2 className="text-xl mb-2">
Pairing Telegram
</h2>

<p className="text-gray-400">
Connecting your bot. Hang tight...
</p>

</div>

)}




{/* SUCCESS */}

{success && (

<div className="w-[520px] bg-[#02050d] rounded-2xl p-12 text-center border border-[#0e1628] shadow-2xl">

<div className="flex justify-center mb-6">

<div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center">

<span className="text-green-400 text-2xl">

✓

</span>

</div>

</div>

<h2 className="text-xl font-medium mb-2">

Deployment success!

</h2>

<p className="text-gray-300 text-sm mb-10">

Your bot is live. Use your Telegram to chat; usage and credits are below.

</p>

<div className="text-5xl font-semibold mb-2">

$10

</div>

<div className="text-gray-300 text-sm mb-3">

Remaining credits

</div>

<div className="text-white text-sm mb-10">

$0 used today • $0 used this month • $10 per month plan

</div>

<div className="flex gap-3 mb-6">

<input

value="$10"

readOnly

className="bg-[#060b18] border border-[#121a30] text-white px-4 py-3 rounded-lg w-full"

/>

<button className="bg-white text-black px-6 py-3 rounded-lg font-medium whitespace-nowrap">

Purchase credit →

</button>

</div>

<p className="text-white text-xs mb-6">

One time purchase. 10% is charged as processing fees.

</p>

<p className="text-white text-xs">

Too slow or memory issues?

{" "}

<a

href="mailto:support@buluclaw.com"

className="underline"

>

support@buluclaw.com

</a>

</p>

</div>

)}

</div>

)

}