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




{/* SUCCESS */}

{success && (

<div className="w-[460px] bg-[#070d1f] rounded-2xl p-10 text-center border border-[#0f1629]">


<div className="flex justify-center mb-5">

<div className="w-14 h-14 rounded-full bg-green-500/20 flex items-center justify-center">

<span className="text-green-400 text-2xl">

✓

</span>

</div>

</div>


<h2 className="text-xl font-medium mb-2">

Deployment success!

</h2>


<p className="text-gray-400 text-sm mb-8">

Your bot is live. Use your Telegram to chat; usage and credits are below.

</p>



<div className="text-4xl mb-1 font-semibold">

$10

</div>


<div className="text-gray-400 text-sm mb-4">

Remaining credits

</div>


<div className="text-gray-500 text-sm mb-8">

$0 used today • $0 used this month • $10 per month plan

</div>



<button className="w-full bg-white text-black py-3 rounded-lg font-medium hover:bg-gray-200 transition">

Purchase credit →

</button>



<p className="text-gray-500 text-xs mt-6 leading-6">

One time purchase. 10% is charged as processing fees.

<br/><br/>

Too slow or memory issues? Contact

</p>


</div>

)}



</div>

)

}