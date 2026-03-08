import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

export async function GET() {

 const supabase = createClient(
   process.env.SUPABASE_URL!,
   process.env.SUPABASE_SERVICE_KEY!
 );

 const { data } = await supabase
   .from("subscriptions")
   .select("*")
   .eq("status","active")
   .limit(1)
   .single();

 return NextResponse.json({
   active: !!data
 });

}