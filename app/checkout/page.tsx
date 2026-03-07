"use client";

export default function CheckoutPage() {

const pay = async () => {

const order = await fetch("/api/create-order",{method:"POST"});
const data = await order.json();

const options = {
key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
amount: data.amount,
currency: "INR",
order_id: data.id,

handler: async function (response:any) {

const verify = await fetch("/api/verify-payment",{
method:"POST",
headers:{ "Content-Type":"application/json" },
body: JSON.stringify(response)
});

const result = await verify.json();

if(result.success){

window.location.replace("/dashboard");
}

}

};

const rzp = new (window as any).Razorpay(options);
rzp.open();

};

return(

<div className="h-screen flex items-center justify-center bg-black">

<button
onClick={pay}
className="bg-blue-600 px-8 py-4 rounded-xl text-white"
>

Subscribe ₹1

</button>

</div>

);

}