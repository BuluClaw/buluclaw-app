"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Dashboard(){

const router = useRouter();

useEffect(()=>{

const paid =
localStorage.getItem("is_paid");

if(!paid){

router.push("/checkout");

}

},[]);

return (

<div className="text-white text-center mt-20">

<h1 className="text-3xl font-bold">
Dashboard 🚀
</h1>

<p className="mt-4">
Welcome to BuluClaw
</p>

</div>

);

}