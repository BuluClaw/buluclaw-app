import { NextResponse } from "next/server"

export async function GET(){

// payment success hone par redirect dashboard
return NextResponse.redirect(
"http://localhost:3000/dashboard?paid=true"
)

}