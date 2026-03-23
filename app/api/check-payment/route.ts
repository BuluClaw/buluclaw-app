import { NextResponse } from "next/server"

export async function GET(req: Request){

const url = new URL(req.url)

const paid = url.searchParams.get("paid")

if(paid==="true"){

return NextResponse.json({
paid:true
})

}

return NextResponse.json({
paid:false
})

}