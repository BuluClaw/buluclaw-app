"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function PaymentSuccess(){

 const router = useRouter()

 useEffect(()=>{
   setTimeout(()=>{
     router.push("/dashboard")
   },2000)
 },[])

 return (
   <div className="text-white p-10">
     <h1 className="text-3xl">Payment Successful 🎉</h1>
     <p>Redirecting to dashboard...</p>
   </div>
 )

}