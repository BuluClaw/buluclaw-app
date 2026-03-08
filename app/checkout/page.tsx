"use client";


import { useState } from "react";


import { useRouter } from "next/navigation";

export default function CheckoutPage() {
    const router = useRouter();
    const [showPromo, setShowPromo] = useState(false);
const [promo, setPromo] = useState("");
const [price, setPrice] = useState(1);

const applyPromo = () => {
  if (promo === "SAVE50") {
    setPrice(0.5);
    alert("Promo Applied");
  } else {
    alert("Invalid Code");
  }
}

const handlePayment = async () => {

const res = await fetch("/api/create-order", {
  method: "POST",
});

const order = await res.json();

const options = {
  key: "rzp_live_SNPo910lRp0uS7",
  amount: order.amount,
  currency: "INR",
  name: "BuluClaw",
  description: "Monthly Subscription",
  order_id: order.id,

  handler: function (response:any) {
    alert("Payment Successful " + response.razorpay_payment_id);
    window.location.href = "/dashboard";
  },

  theme: {
    color: "#2563eb",
  },
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

<h1 className="text-1xl font-semibold  text-gray-500">Subscribe to BuluClaw</h1>

<div className="text-2xl font-bold mt-3">
₹1
<span className="text-sm font-normal text-gray-400 ml-2">
/per month
</span>
</div>

<div className="mt-8 flex gap-4">

<div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#ff3b3b] to-[#3b0a45] flex items-center justify-center shadow-lg">
<img src="/logo.png" className="w-7 h-7" />
</div>

<div>
<div className="font-semibold">BuluClaw</div>

<p className="text-gray-400 text-xs mt-1 max-w-md">
Avoid all technical complexity and one click deploy your own
24/7 active OpenClaw instance under 1 minute.<br /> Billed monthly.
</p>

</div>

<div className="ml-auto">₹1</div>

</div>

<hr className="border-gray-800 my-4" />

<div className="flex justify-between text-gray-100">
<span>Subtotal</span>
<span>₹1</span>
</div>

<div className="mt-5">

<div className="flex gap-3 mt-3">

<input
type="text"
placeholder="Enter promo code"
value={promo}
onChange={(e) => setPromo(e.target.value)}
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

<hr className="border-gray-800 my-6" />

<div className="flex justify-between text-xl font-semibold">
<span>Total due today</span>
<span>₹1</span>
</div>

</div>

{/* RIGHT SIDE */}

<div className="w-1/2 flex items-center justify-center">

<div className="w-[400px]">

<h2 className="text-xl mb-6">Complete your payment</h2>

<button
onClick={handlePayment}
className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl text-lg"
>
Pay ₹1
</button>

<p className="text-gray-400 text-sm mt-5 text-center">
Secure payment powered by Razorpay
</p>

</div>

</div>

</div>

);
}