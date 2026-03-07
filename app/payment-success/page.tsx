import { redirect } from "next/navigation";
import { createClient } from "@supabase/supabase-js";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function PaymentSuccess() {

const session = await getServerSession(authOptions);
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
    redirect("/dashboard");
  }

  redirect("/dashboard");
}