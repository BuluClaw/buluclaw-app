"use client"

import { useEffect } from "react"

export default function PaymentSuccess() {

useEffect(() => {

// payment save
localStorage.setItem("paid","true")

// dashboard open
window.location.href="/dashboard"

}, [])

return (

<div style={{ padding: "40px" }}>

Payment success...

</div>

)

}