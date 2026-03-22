"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function PaymentSuccess(){

const router = useRouter();

useEffect(() => {

setTimeout(()=>{

router.push("/dashboard");

},2000);

},[]);

return (

<div className="text-white text-center mt-20">

<h1 className="text-3xl font-bold">
Payment Successful 🎉
</h1>

<p className="text-zinc-400 mt-3">
Redirecting to dashboard...
</p>

</div>

);
}