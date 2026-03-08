"use client";
export const dynamic = "force-dynamic";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@supabase/supabase-js";


const supabase = createClient(
process.env.NEXT_PUBLIC_SUPABASE_URL!,
process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function Dashboard() {

const router = useRouter();

useEffect(() => {

const checkSubscription = async () => {

const { data: { user } } = await supabase.auth.getUser();

if(!user){
router.push("/login");
return;
}

const { data } = await supabase
.from("subscriptions")
.select("*")
.eq("user_id", user.id)
.eq("status","active")
.maybeSingle();

if(!data){
router.push("/checkout");
}

};

checkSubscription();

},[]);

return (
<div className="text-white p-10">
<h1 className="text-3xl">Dashboard</h1>
</div>
);

}