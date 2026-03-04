"use client";

import { useState } from "react";
import Script from "next/script";

export default function CheckoutPage() {

const startPayment = async () => {

const res = await fetch("/api/create-order",{method:"POST"});
const order = await res.json();

const options = {
key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
amount: order.amount,
currency: order.currency,
order_id: order.id,

name:"BuluClaw",
description:"BuluClaw Pro",

handler:function(response:any){
alert("Payment Successful 🚀")
}
};

const rzp = new (window as any).Razorpay(options);
rzp.open();
};

return(

<>
<Script src="https://checkout.razorpay.com/v1/checkout.js"/>

<div className="min-h-screen flex">

{/* LEFT PANEL */}

<div className="w-1/2 bg-black text-white p-16">

<p className="text-gray-400 mb-3">
Subscribe to BuluClaw
</p>

<h1 className="text-5xl font-bold">
₹3999
<span className="text-lg font-normal ml-2">
per month
</span>
</h1>

<div className="flex gap-4 mt-10">

<div className="w-12 h-12 rounded-xl bg-gradient-to-r from-pink-500 to-purple-500"/>

<div>

<h3 className="text-lg font-semibold">
BuluClaw
</h3>

<p className="text-gray-400 text-sm mt-1 max-w-md">
Avoid all technical complexity and one click deploy your own
24/7 active OpenClaw instance under 1 minute.
Billed monthly
</p>

</div>

</div>

<hr className="border-gray-800 my-10"/>

<div className="flex justify-between text-lg">

<span>Subtotal</span>
<span>₹3999</span>

</div>

{/* PROMO */}

<div className="flex gap-3 mt-6">

<input
placeholder="Add promotion code"
className="bg-transparent border border-gray-700 px-4 py-3 rounded-lg w-full"
/>

<button className="bg-gray-700 px-5 rounded-lg">
Apply
</button>

</div>

<div className="flex justify-between mt-8 text-lg font-semibold">

<span>Total due today</span>
<span>₹3999</span>

</div>

</div>


{/* RIGHT PAYMENT */}

<div className="w-1/2 bg-[#0f172a] flex items-center justify-center">

<div className="bg-white rounded-xl p-10 w-[420px] text-center">

<button
onClick={startPayment}
className="w-full bg-indigo-600 text-white py-4 rounded-lg text-lg"
>
Pay ₹3999
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