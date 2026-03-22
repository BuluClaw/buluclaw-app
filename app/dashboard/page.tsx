"use client"

import { useEffect, useState } from "react"

export default function Dashboard(){

const [step,setStep] = useState(1)
const [loading,setLoading] = useState(false)
const [success,setSuccess] = useState(false)

useEffect(()=>{

setTimeout(()=>{
setStep(2)
},2500)

setTimeout(()=>{
setStep(3)
},5000)

},[])


function handleConnect(){

setLoading(true)

setTimeout(()=>{
setLoading(false)
setSuccess(true)
},3000)

}


return(

<div className="h-screen w-screen flex items-center justify-center bg-[#040612] text-white">

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

I have sent a message ✓

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



{/* STEP 5 success */}
{success && (

<div className="bg-[#0c1220] p-10 rounded-2xl w-[420px] text-center">

<div className="text-green-400 text-5xl mb-4">
✓
</div>

<h2 className="text-xl mb-2">
Deployment success!
</h2>

<p className="text-gray-400 mb-6">
Your bot is live. Use your Telegram to chat; usage and credits are below.
</p>


<div className="text-4xl mb-2">
$10
</div>

<div className="text-gray-400 mb-6">
Remaining credits
</div>


<div className="text-sm text-gray-500 mb-4">

$0 used today • $0 used this month • $10 per month plan

</div>


<button className="bg-white text-black px-6 py-3 rounded-lg w-full">

Purchase credit →

</button>


<p className="text-xs text-gray-500 mt-6">

One time purchase. 10% is charged as processing fees.
<br /><br />
Too slow or memory issues? Contact

</p>

</div>

)}


</div>

)

}