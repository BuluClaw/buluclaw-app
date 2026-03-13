import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {

  const body = await req.json();

  const { razorpay_payment_id, user_id } = body;

  if (!razorpay_payment_id) {
    return Response.json({ error: "payment failed" });
  }

  // activate user
  await supabase
    .from("users")
    .update({ active: true })
    .eq("id", user_id);

  // create subscription
  await supabase
    .from("subscriptions")
    .insert({
      user_id: user_id,
      status: "active",
      current_period_end: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
    });

  return Response.json({ success: true });
}