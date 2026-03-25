import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
 process.env.NEXT_PUBLIC_SUPABASE_URL!,
 process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(req: Request) {

 try {

   const body = await req.json()

   const { token, email } = body

   if (!token || !email) {

     return Response.json(
       { success: false, error: "missing data" },
       { status: 400 }
     )

   }

   const { error } = await supabase
     .from("telegram_connections")
     .upsert({
       email: email,
       bot_token: token
     })

   if (error) {

     return Response.json(
       { success: false, error },
       { status: 500 }
     )

   }

   return Response.json({
     success: true
   })

 } catch (err) {

   return Response.json(
     { success: false },
     { status: 500 }
   )

 }

}