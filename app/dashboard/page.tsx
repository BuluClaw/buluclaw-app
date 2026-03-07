import { redirect } from "next/navigation";
import { createClient } from "@supabase/supabase-js";
import { getServerSession } from "next-auth";

export default async function Dashboard() {

const session = await getServerSession();

if (!session) {
redirect("/login");
}

const supabase = createClient(
process.env.SUPABASE_URL!,
process.env.SUPABASE_SERVICE_KEY!
);

const { data: user } = await supabase
.from("users")
.select("*")
.eq("email", session.user?.email)
.single();

if (!user) {
redirect("/checkout");
}

const { data: sub } = await supabase
.from("subscriptions")
.select("*")
.eq("user_id", user.id)
.eq("status", "active")
.maybeSingle();

if (!sub) {
redirect("/checkout");
}

return (

<div className="text-white text-center mt-40">

<h1 className="text-4xl font-bold">
Welcome to BuluClaw Dashboard 🚀
</h1>

<p className="mt-4 text-gray-400">
Your subscription is active.
</p>

</div>

);

}