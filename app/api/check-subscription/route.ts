import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

export async function GET() {

 const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!
 );

 const { data: { user } } = await supabase.auth.getUser();

 if(!user){
  return NextResponse.json({ active:false });
 }

 const { data } = await supabase
  .from("subscriptions")
  .select("*")
  .eq("user_id", user.id)
  .eq("status","active")
  .maybeSingle();

 return NextResponse.json({
  active: !!data
 });

}