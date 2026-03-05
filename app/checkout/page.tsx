"use client";

import { useState } from "react";
import Script from "next/script";

export default function CheckoutPage() {

const [promo,setPromo] = useState("");
const [price,setPrice] = useState(1);

const applyPromo = () => {

if(promo === "BULU10"){
setPrice(0);
alert("Promo Applied 🎉")
}
else{
alert("Invalid Code")
}

}

const startPayment = async () => {

const res = await fetch("/api/create-order",{
method:"POST",
body:JSON.stringify({amount:price})
});

const order = await res.json();

const options = {

key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
amount: order.amount,
currency:"INR",
order_id: order.id,

name:"BuluClaw",
description:"BuluClaw Pro Subscription",

theme:{
color:"#4f46e5"
},

handler:function(response:any){
alert("Payment Successful 🚀")
}

};

const rzp = new (window as any).Razorpay(options);
rzp.open();

};

return(

<>

<form><script src="https://cdn.razorpay.com/static/widget/subscription-button.js" data-subscription_button_id="pl_SNQDsGCIwNv9vg" data-button_theme="brand-color" async> </script> </form>
<div className="min-h-screen flex">

{/* LEFT PANEL */}

<div className="w-1/2 bg-black text-white p-16">

<p className="text-gray-400 mb-3">
Subscribe to BuluClaw
</p>

<h1 className="text-5xl font-bold">
₹{price}
<span className="text-lg font-normal ml-2">
per month
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

<hr className="border-gray-800 my-10"/>

<div className="flex justify-between text-lg">
<span>Subtotal</span>
<span>₹{price}</span>
</div>

{/* PROMO CODE */}

<div className="flex gap-3 mt-6">

<input
value={promo}
onChange={(e)=>setPromo(e.target.value)}
placeholder="Add promotion code"
className="bg-transparent border border-gray-700 px-4 py-3 rounded-lg w-full"
/>

<button
onClick={applyPromo}
className="bg-sky-500 -700 px-5 rounded-lg"
>
Apply
</button>

</div>

<div className="flex justify-between mt-8 text-lg font-semibold">

<span>Total due today</span>
<span>₹{price}</span>

</div>

</div>


{/* RIGHT PAYMENT */}

<div className="w-1/2 bg-[#0f172a] flex items-center justify-center">

<div className="bg-white rounded-xl p-10 w-[420px] text-center shadow-lg">

<button
onClick={startPayment}
className="w-full bg-indigo-600 text-white py-4 rounded-lg text-lg hover:bg-indigo-700 transition"
>
Pay ₹{price}
</button>

<p className="text-gray-500 text-sm mt-4">
Secure payment powered by Razorpay
</p>

</div>

</div>

</div>

</>

);
}


