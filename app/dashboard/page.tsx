import { redirect } from "next/navigation";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default async function Dashboard() {

  const { data: { user } } = await supabase.auth.getUser();

  // Agar login nahi hai
  if (!user) {
    redirect("/login");
  }

  // Subscription check
  const { data } = await supabase
    .from("subscriptions")
    .select("*")
    .eq("user_id", user.id)
    .eq("status", "active")
    .maybeSingle();

  // Agar subscription nahi hai
  if (!data) {
    redirect("/checkout");
  }

  return (
    <div className="text-white p-10">
      <h1 className="text-3xl">Dashboard</h1>
      <p className="mt-4">Welcome to BuluClaw</p>
    </div>
  );
}