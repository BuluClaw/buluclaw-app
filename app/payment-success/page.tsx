"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function PaymentSuccess() {

  const router = useRouter();

  useEffect(() => {

    const verify = async () => {

      await fetch("/api/verify-payment", {
        method: "POST"
      });

      router.push("/dashboard");

    };

    verify();

  }, []);

  return (
    <div className="text-white text-center mt-20">
      <h1 className="text-3xl">Payment Successful</h1>
      <p>Setting up your account...</p>
    </div>
  );
}