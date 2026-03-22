"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function PaymentSuccess(){

const router = useRouter();

useEffect(() => {

localStorage.setItem("is_paid","true");

setTimeout(()=>{

router.push("/dashboard");

},1500);

},[]);

return (

<div className="text-white text-center mt-20">

<h1 className="text-3xl font-bold">
Payment Successful 🎉
</h1>

<p className="text-zinc-400 mt-3">
Activating your plan...
</p>

</div>

);
}