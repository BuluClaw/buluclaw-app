"use client"

import { useState } from "react"

export default function Dashboard(){

const [loading,setLoading] = useState(false)
const [step,setStep] = useState(1)

const startDeploy = () => {

setLoading(true)

setTimeout(()=>{
setStep(2)
},2000)

setTimeout(()=>{
window.location.href="/deploy"
},6000)

}

return(

<div className="min-h-screen flex items-center justify-center bg-[#05070f] text-white">

{/* normal state */}
{!loading && (

<div className="text-center space-y-6">

<h1 className="text-4xl font-semibold">
Dashboard 🚀
</h1>

<button
onClick={startDeploy}
className="bg-white text-black px-8 py-3 rounded-xl"
>

Deploy AI Agent ⚡

</button>

</div>

)}

{/* loading state */}
{loading && (

<div className="bg-[#0b0f19] p-10 rounded-xl w-[420px] text-center space-y-6 border border-gray-800">

<div className="flex justify-center">

<div className="w-10 h-10 border-4 border-gray-600 border-t-white rounded-full animate-spin"/>

</div>

{step===1 && (
<>
<h2 className="text-lg">
Starting your deployment
</h2>

<p className="text-gray-400 text-sm">
Do not switch other tabs.
This only takes a few seconds.
</p>
</>
)}

{step===2 && (
<>
<h2 className="text-lg">
Purchasing local virtual machine
</h2>

<p className="text-gray-400 text-sm">
Do not switch other tabs.
This only takes a few seconds.
</p>
</>
)}

</div>

)}

</div>

)

}