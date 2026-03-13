"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function PaymentSuccess() {

  const router = useRouter();
  const params = useSearchParams();

  useEffect(() => {

    const verify = async () => {

      const razorpay_payment_id = params.get("razorpay_payment_id");
      const razorpay_order_id = params.get("razorpay_order_id");
      const razorpay_signature = params.get("razorpay_signature");

      const user_id = localStorage.getItem("user_id");

      await fetch("/api/verify-payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          razorpay_payment_id,
          razorpay_order_id,
          razorpay_signature,
          user_id
        })
      });

      router.push("/dashboard");

    };

    verify();

  }, []);

  return (
    <div className="text-white text-center mt-20">
      <h1 className="text-3xl">Payment Successful 🎉</h1>
      <p>Setting up your account...</p>
    </div>
  );
}