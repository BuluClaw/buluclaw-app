"use client"

import { useEffect } from "react";

export default function Checkout(){

async function pay(){

const order = await fetch("/api/create-order",{method:"POST"});
const data = await order.json();

const options = {
key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
amount: data.amount,
currency: "INR",
order_id: data.id,

handler: async function(response:any){

const verify = await fetch("/api/verify-payment",{
method:"POST",
headers:{ "Content-Type":"application/json" },
body:JSON.stringify(response)
});

const result = await verify.json();

if(result.success){
window.location.replace("/dashboard");
}

}
};

const rzp = new (window as any).Razorpay(options);
rzp.open();

}

return(

<div className="flex items-center justify-center h-screen">

<button
onClick={pay}
className="bg-blue-600 text-white px-8 py-4 rounded-xl"
>

Subscribe ₹1

</button>

</div>

)

}