"use client";

import { useEffect } from "react";

export default function CheckoutPage() {

  useEffect(() => {
    window.location.href =
      "https://buy.polar.sh/polar_cl_yLgMY3vkBYbBBnGsVQZH7urSahmg2GGfry12n8cRC";
  }, []);

  return (
    <div className="h-screen flex items-center justify-center bg-black text-white">
      Redirecting to secure checkout...
    </div>
  );
}