import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { createClient } from "@supabase/supabase-js";

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

  if (!user || !user.active) {
    redirect("/checkout");
  }

  return (
    <div>
      <h1>Welcome to BuluClaw Dashboard</h1>
    </div>
  );
}