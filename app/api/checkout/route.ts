import { NextResponse } from "next/server"

export async function GET() {

const res = await fetch("https://api.polar.sh/v1/checkouts", {
method: "POST",
headers: {
Authorization: `Bearer ${process.env.POLAR_ACCESS_TOKEN}`,
"Content-Type": "application/json",
},
body: JSON.stringify({
product_id: "ed144c7c-d2ca-4b88-8767-20a27c54e53f",
success_url: process.env.POLAR_SUCCESS_URL,
})
})

const data = await res.json()

return NextResponse.redirect(data.url)

}