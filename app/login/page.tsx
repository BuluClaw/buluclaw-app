"use client"

import { signIn } from "next-auth/react"

export default function LoginPage() {

  const handleLogin = () => {
    signIn("google", {
      callbackUrl: "/dashboard"
    })
  }

  return (
    <div style={{color:"white",textAlign:"center",marginTop:"100px"}}>

      <h1>Login</h1>
      <p>Please login to continue</p>

      <button
        onClick={handleLogin}
        style={{
          marginTop:"20px",
          padding:"12px 24px",
          background:"#2563eb",
          borderRadius:"8px",
          border:"none",
          color:"white",
          fontSize:"16px",
          cursor:"pointer"
        }}
      >
        Login with Google
      </button>

    </div>
  )
}