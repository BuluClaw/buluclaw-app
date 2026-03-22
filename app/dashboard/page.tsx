"use client"

import { useEffect, useState } from "react"

export default function Dashboard(){

const [step,setStep] = useState(1)

useEffect(()=>{

// step 1 → step 2
setTimeout(()=>{
setStep(2)
},2500)

// step 2 → success
setTimeout(()=>{
setStep(3)
},5000)

},[])

return(

<div className="h-screen w-screen flex items-center justify-center bg-[#040612] text-white">

<div className="w-full h-full flex flex-col items-center justify-center">

{/* LOADER */}
{step !== 3 && (

<>
<div className="mb-8">

<div className="w-20 h-20 border-4 border-gray-700 border-t-white rounded-full animate-spin"/>

</div>

{step===1 && (

<div className="text-center">

<h1 className="text-3xl font-semibold mb-3">
Starting your deployment
</h1>

<p className="text-gray-400 text-lg">
Do not switch other tabs. This only takes a few seconds.
</p>

</div>

)}

{step===2 && (

<div className="text-center">

<h1 className="text-3xl font-semibold mb-3">
Pairing Telegram
</h1>

<p className="text-gray-400 text-lg">
Connecting your bot. Hang tight...
</p>

</div>

)}

</>

)}

{/* SUCCESS SCREEN */}

{step===3 && (

<div className="text-center">

<div className="text-green-400 text-5xl mb-6">
✓
</div>

<h1 className="text-3xl font-semibold mb-2">
Deployment success!
</h1>

<p className="text-gray-400 mb-8">
Your bot is live. Use your Telegram to chat; usage and credits are below.
</p>

<div className="text-5xl font-semibold mb-2">
$10
</div>

<p className="text-gray-400 mb-8">
Remaining credits
</p>

<div className="bg-[#0b0f1d] px-6 py-3 rounded-lg mb-4">
$0 used today • $0 used this month • $10 per month plan
</div>

<button className="bg-white text-black px-6 py-3 rounded-lg font-medium">
Purchase credit →
</button>

<p className="text-gray-500 text-sm mt-6">
One time purchase. 10% is charged as processing fees.
</p>

<p className="text-gray-500 text-sm mt-2">
Too slow or memory issues? Contact
</p>

</div>

)}

</div>

</div>

)

}