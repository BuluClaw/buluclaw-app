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

if (!user) {
  redirect("/checkout");
}

const { data: subscription } = await supabase
  .from("subscriptions")
  .select("*")
  .eq("user_id", user.id)
  .single();

if (!subscription) {
  redirect("/checkout");
}
  return (
    <div className="min-h-screen bg-black text-white p-10">

      {/* Header */}
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-4xl font-bold">BuluClaw Dashboard</h1>
        <p className="text-gray-400">{session.user?.email}</p>
      </div>

      {/* Info Cards */}
      <div className="grid grid-cols-3 gap-6">

        <div className="bg-zinc-900 p-6 rounded-xl">
          <h2 className="text-xl font-semibold mb-2">AI Model</h2>
          <p>Claude Opus 4.5</p>
        </div>

        <div className="bg-zinc-900 p-6 rounded-xl">
          <h2 className="text-xl font-semibold mb-2">Channel</h2>
          <p>Telegram</p>
        </div>

        <div className="bg-zinc-900 p-6 rounded-xl">
          <h2 className="text-xl font-semibold mb-2">Subscription</h2>
          <p className="text-green-400">Active</p>
        </div>

      </div>

      {/* Deploy Section */}
      <div className="mt-12 bg-zinc-900 p-8 rounded-xl">

        <h2 className="text-2xl font-semibold mb-4">
          Deploy Your OpenClaw Instance
        </h2>

        <p className="text-gray-400 mb-6">
          Start your AI automation instance and connect it with Telegram or Discord.
        </p>

        <button
          className="bg-purple-600 hover:bg-purple-700 px-8 py-4 rounded-xl text-lg"
        >
          ⚡ Deploy OpenClaw
        </button>

      </div>

    </div>
  );
}