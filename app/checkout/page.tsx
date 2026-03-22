"use client";

import { useEffect } from "react";

export default function CheckoutPage() {

  useEffect(() => {
    

    const email =
      localStorage.getItem("user_email");
      
    window.location.href =
      "https://buy.polar.sh/polar_cl_yLgMYY3vkBYybBBnGsVQZH7urSahmg2GGfryl2n8cRC";
  }, []);

  return (
    <div className="h-screen flex items-center justify-center bg-black text-white">
      Redirecting to secure checkout...
    </div>
  );
}