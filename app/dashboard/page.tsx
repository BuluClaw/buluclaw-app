import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

export default async function Dashboard() {

  const session = await getServerSession(authOptions);

  // Agar login nahi hai
  if (!session) {
    redirect("/login");
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  // Subscription check
  const { data } = await supabase
    .from("subscriptions")
    .select("*")
    .eq("status", "active")
    .eq("email", session.user?.email)
    .maybeSingle();

  if (!data) {
    redirect("/checkout");
  }

  return (
    <div className="text-white p-10">
      <h1 className="text-3xl">Dashboard</h1>
      <p className="mt-4">Welcome to BuluClaw 🚀</p>
    </div>
  );
}