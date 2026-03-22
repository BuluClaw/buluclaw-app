"use client"

import { useEffect, useState } from "react"

export default function Dashboard(){

const [step,setStep] = useState(1)

useEffect(()=>{

setTimeout(()=>{
setStep(2)
},2500)

},[])

return(

<div className="h-screen w-screen flex items-center justify-center bg-[#040612] text-white">

<div className="w-full h-full flex flex-col items-center justify-center">

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
Purchasing local virtual machine
</h1>

<p className="text-gray-400 text-lg">
Do not switch other tabs. This only takes a few seconds.
</p>

</div>

)}

</div>

</div>

)

}