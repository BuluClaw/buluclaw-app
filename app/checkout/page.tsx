"use client";

import { useState } from "react";
import Script from "next/script";

export default function CheckoutPage() {

  const [loading,setLoading] = useState(false);

  const startPayment = async () => {

    setLoading(true);

    const res = await fetch("/api/create-order", {
      method: "POST"
    });

    const order = await res.json();

    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      order_id: order.id,

      name: "BuluClaw",
      description: "BuluClaw Pro",

      theme: {
        color: "#4F46E5"
      },

      handler: async function (response:any){

        await fetch("/api/verify-payment",{
          method:"POST",
          body:JSON.stringify(response)
        })

        alert("Payment Success 🚀");
      }
    };

    const rzp = new (window as any).Razorpay(options);
    rzp.open();

    setLoading(false);
  };

  return (

    <>
    <Script src="https://checkout.razorpay.com/v1/checkout.js" />

    <div className="min-h-screen flex">

      {/* LEFT SIDE */}
      <div className="w-1/2 bg-black text-white p-16">

        <p className="text-gray-400 mb-2">
          Subscribe to BuluClaw
        </p>

        <h1 className="text-5xl font-bold mb-10">
          $49.00
          <span className="text-lg font-normal ml-2">
            per month
          </span>
        </h1>

        <div className="flex gap-4 items-start mb-8">

          <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-pink-500 to-purple-500"/>

          <div>
            <h3 className="font-semibold text-lg">
              BuluClaw Pro
            </h3>

            <p className="text-gray-400 text-sm mt-1">
              Deploy your own 24/7 active OpenClaw instance
              in under 1 minute. Billed monthly.
            </p>
          </div>

        </div>

        <div className="border-t border-gray-800 pt-6 flex justify-between">

          <span>Subtotal</span>
          <span>$49.00</span>

        </div>

      </div>


      {/* RIGHT SIDE PAYMENT */}
      <div className="w-1/2 bg-[#0f172a] flex items-center justify-center">

        <div className="bg-white rounded-xl p-10 w-[420px]">

          <h2 className="text-xl font-semibold mb-6">
            Payment
          </h2>

          <button
            onClick={startPayment}
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-4 rounded-lg text-lg"
          >
            {loading ? "Processing..." : "Pay $49"}
          </button>

          <p className="text-sm text-gray-500 mt-4 text-center">
            Secure payment powered by Razorpay
          </p>

        </div>

      </div>

    </div>

    </>
  );
}