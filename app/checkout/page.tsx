"use client";

import { useRouter } from "next/navigation";

export default function CheckoutPage() {

const router = useRouter();

const handlePayment = () => {

const options = {
key: "RAZORPAY_KEY_ID", // apni key daalna
amount: 100, // ₹1 = 100 paise
currency: "INR",
name: "SimpleClaw",
description: "Monthly Subscription",
handler: function (response: any) {
alert("Payment Successful " + response.razorpay_payment_id);
window.location.href = "/dashboard";
},
prefill: {
email: "customer@email.com",
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

<div className="w-1/2 p-12 border-r border-gray-800">

<button
onClick={() => router.back()}
className="mb-10 text-gray-400 hover:text-white"
>
← Back
</button>

<h1 className="text-3xl font-semibold">Subscribe to SimpleClaw</h1>

<div className="text-5xl font-bold mt-3">
₹1
<span className="text-lg font-normal text-gray-400 ml-2">
per month
</span>
</div>

<div className="mt-10 flex gap-4">

<div className="w-12 h-12 bg-red-500 rounded-xl"></div>

<div>
<div className="font-semibold">SimpleClaw</div>

<p className="text-gray-400 text-sm mt-1 max-w-md">
Avoid all technical complexity and one click deploy your own
24/7 active OpenClaw instance under 1 minute.
</p>

<div className="text-gray-400 text-sm mt-2">
Billed monthly
</div>
</div>

<div className="ml-auto">₹1</div>

</div>

<hr className="border-gray-800 my-8" />

<div className="flex justify-between text-gray-400">
<span>Subtotal</span>
<span>₹1</span>
</div>

<button className="mt-5 border border-gray-700 px-4 py-2 rounded-md">
Add promotion code
</button>

<hr className="border-gray-800 my-8" />

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