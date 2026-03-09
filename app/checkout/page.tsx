"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {

const router = useRouter();

const [promo, setPromo] = useState("");
const [price, setPrice] = useState(1);

const applyPromo = () => {

  if(promo === "SAVE50"){
    setPrice(0.5);
    alert("Promo Applied");
  } else {
    alert("Invalid Code");
  }

};


// 🔥 START PAYMENT
const startPayment = async () => {

  const res = await fetch("/api/create-order");
  const order = await res.json();

  const options = {
    key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
    amount: order.amount,
    currency: "INR",
    order_id: order.id,
    name: "BuluClaw",

    handler: function () {

      // PAYMENT SUCCESS → REDIRECT
      window.location.href = "/dashboard";

    }
  };

  const rzp = new (window as any).Razorpay(options);
  rzp.open();

};


return (

<div className="min-h-screen bg-black text-white flex">


{/* LEFT SIDE */}

<div className="w-1/2 p-8 border-r border-gray-800">

<button
onClick={() => router.back()}
className="mb-8 text-gray-400 hover:text-white"
>
← Back
</button>


<h1 className="text-1xl font-semibold text-gray-500">
Subscribe to BuluClaw
</h1>


<div className="text-2xl font-bold mt-3">

₹{price}

<span className="text-sm font-normal text-gray-400 ml-2">
/per month
</span>

</div>


<div className="mt-8 flex gap-4">

<div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#0a0101] to-[#0b020d] flex items-center justify-center shadow-lg">
<img src="/icons/Buluclaw.png" className="w-10 h-10 rounded-xl"/>
</div>


<div>

<div className="font-semibold">BuluClaw</div>

<p className="text-gray-400 text-xs mt-1 max-w-md">

Avoid all technical complexity and one click deploy your own
24/7 active OpenClaw instance under 1 minute.

<br/>

Billed monthly.

</p>

</div>


<div className="ml-auto">
₹{price}
</div>

</div>


<hr className="border-gray-800 my-4"/>


<div className="flex justify-between text-gray-100">

<span>Subtotal</span>

<span>₹{price}</span>

</div>


<div className="mt-5">


<div className="flex gap-3 mt-3">

<input
type="text"
placeholder="Enter promo code"
value={promo}
onChange={(e)=>setPromo(e.target.value)}
className="bg-black border border-gray-700 px-3 py-2 rounded-md"
/>


<button
onClick={applyPromo}
className="bg-blue-600 px-4 py-2 rounded-md"
>

Apply

</button>

</div>

</div>


<hr className="border-gray-800 my-6"/>



<div className="flex justify-between text-xl font-semibold">

<span>Total due today</span>

<span>₹{price}</span>

</div>


</div>



</div>
)}
