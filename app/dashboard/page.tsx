"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Dashboard(){

const { data: session } = useSession();
const router = useRouter();

useEffect(()=>{

const paid =
localStorage.getItem("is_paid");

if(!paid){

router.push("/checkout");

}

},[]);

return (

<div className="min-h-screen text-white flex flex-col items-center justify-center">

<h1 className="text-4xl font-bold mb-2">
Dashboard 🚀
</h1>

<p className="text-zinc-400 mb-8">
Welcome to BuluClaw
</p>


<div className="bg-zinc-900 p-6 rounded-xl w-[350px] space-y-4">

<div>
<p className="text-sm text-zinc-400">
Email
</p>

<p className="font-medium">
{session?.user?.email}
</p>
</div>


<div>
<p className="text-sm text-zinc-400">
Plan
</p>

<p className="text-green-400">
Active ✅
</p>
</div>


<button
onClick={()=>{
window.location.href="/deploy"
}}
className="w-full bg-white text-black py-2 rounded-lg"
>

Deploy AI Agent ⚡

</button>


<button
onClick={()=>{

localStorage.removeItem("is_paid");

signOut();

}}
className="w-full border border-zinc-700 py-2 rounded-lg"
>

Logout

</button>

</div>

</div>

);

}