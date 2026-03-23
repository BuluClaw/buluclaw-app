"use client"

import { useEffect } from "react"

export default function PaymentSuccess(){

useEffect(()=>{

localStorage.setItem("paid","true")

window.location.href="/dashboard"

},[])

return <div>Payment success...</div>

}