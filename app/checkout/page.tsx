"use client";

import { useState } from "react";
import Script from "next/script";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {

const [promo,setPromo] = useState("");
const [price,setPrice] = useState(1);
const router = useRouter();
const applyPromo = () => {

if(promo === "BULU10"){
setPrice(0);
alert("Promo Applied 🎉")
}
else{
alert("Invalid Code")
}

}

return(

<>
<div className="min-h-screen flex">

{/* LEFT PANEL */}

<div className="w-1/2 bg-black text-white p-16 flex flex-col justify-between">

<div>

<div
onClick={()=>router.back()}
className="flex items-center gap-2 text-gray-400 cursor-pointer hover:text-white mb-2"
>


<span className="text-lg">‹</span>
<span>Back</span>

</div>

<h1 className="text-3xl font-bold">
₹{price}
<span className="text-xs font-normal ml-2">
/per month
</span>
</h1>

<div className="flex gap-4 mt-10">

<div className="w-12 h-12 rounded-xl bg-gradient-to-r from-pink-500 to-purple-500"/>

<div>

<h3 className="text-lg font-semibold">
BuluClaw Pro
</h3>

<p className="text-gray-400 text-sm mt-1 max-w-md">
Avoid all technical complexity and one click deploy your own
24/7 active OpenClaw instance under 1 minute.
Billed monthly.
</p>

</div>

</div>

<hr className="border-gray-800 my-6"/>

<div className="flex justify-between text-lg">
<span>Subtotal</span>
<span>₹{price}</span>
</div>

{/* PROMO */}

<div className="flex gap-2 mt-2">

<input
value={promo}
onChange={(e)=>setPromo(e.target.value)}
placeholder="Add promotion code"
className="bg-transparent border border-gray-700 px-4 py-2 rounded-lg w-full"
/>

<button
onClick={applyPromo}
className="bg-indigo-600 px-4  rounded-lg "
>
Apply
</button>

</div>

<hr className="border-gray-800 my-2"/>

<div className="flex justify-between text-lg font-semibold">

<span>Total due today</span>
<span>₹{price}</span>

</div>

</div>

</div>


{/* RIGHT PAYMENT */}

<div className="w-1/2 bg-white flex items-center justify-center">

<div className="text-center w-[420px]">

<h2 className="text-2xl font-semibold mb-8">
Complete your subscription
</h2>

<form dangerouslySetInnerHTML={{__html:`<script src="https://cdn.razorpay.com/static/widget/subscription-button.js" data-subscription_button_id="pl_SNUJ9TF5weTC1g"></script>`}}></form>

<p className="text-gray-500 text-sm mt-6">
Secure payment powered by Razorpay
</p>

</div>

</div>
</div>

</>

);
}