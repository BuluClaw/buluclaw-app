"use client";

import { useState } from "react";

export default function CheckoutPage() {

  const startPayment = async () => {

    const res = await fetch("/api/create-order", {
      method: "POST",
    });

    const data = await res.json();

    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      amount: data.amount,
      currency: "USD",
      name: "BuluClaw",
      description: "BuluClaw Pro Subscription",
      order_id: data.id,

      handler: function (response: any) {
        alert("Payment successful!");
      }
    };

    const rzp = new (window as any).Razorpay(options);
    rzp.open();
  };

  return (

    <div className="min-h-screen flex">

      {/* LEFT SIDE */}
      <div className="w-1/2 bg-black text-white p-16">

        <p className="text-gray-400 mb-2">
          Subscribe to BuluClaw
        </p>

        <h1 className="text-5xl font-bold mb-8">
          $49.00 <span className="text-lg font-normal">per month</span>
        </h1>

        <div className="flex gap-4 items-start mb-6">
          <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-purple-500 rounded-xl"></div>

          <div>
            <h3 className="font-semibold text-lg">
              BuluClaw Pro
            </h3>

            <p className="text-gray-400 text-sm mt-1">
              Deploy your own 24/7 active OpenClaw instance in under 1 minute.
              Billed monthly.
            </p>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-6 mt-10 flex justify-between">
          <span>Subtotal</span>
          <span>$49.00</span>
        </div>

      </div>


      {/* RIGHT SIDE */}
      <div className="w-1/2 bg-[#0b1730] flex items-center justify-center">

        <button
          onClick={startPayment}
          className="bg-blue-600 text-white px-10 py-4 rounded-xl text-lg"
        >
          Pay $49
        </button>

      </div>

    </div>

  );
}