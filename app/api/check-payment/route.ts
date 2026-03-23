import { NextResponse } from "next/server"

export async function GET(req: Request){

const url = new URL(req.url)

const paid = url.searchParams.get("paid")

return NextResponse.json({
paid: paid==="true"
})

}