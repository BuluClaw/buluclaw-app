"use client";

import { useState } from "react";

export default function CheckoutPage() {
  const [loading, setLoading] = useState(false);

  const startPaddleCheckout = () => {
    setLoading(true);

    // Replace with your Paddle price ID
    const priceId = "pri_01kjmzyybprfcqqbekwzyvv6hm1"; 

    // Paddle Checkout
    const checkoutUrl = `https://pay.paddle.com/checkout/${priceId}?customer_email=test@gmail.com`;

    window.location.href = checkoutUrl;
  };

  return (
    <div className="min-h-screen flex">

      {/* LEFT SIDE */}
      <div className="w-1/2 bg-black text-white p-16">

        <p className="text-gray-400 mb-2">Subscribe to BuluClaw</p>

        <h1 className="text-5xl font-bold mb-8">
          $49.00 <span className="text-lg font-normal">per month</span>
        </h1>

        <div className="flex items-start gap-4 mb-8">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-500 to-purple-600 flex items-center justify-center">
            ✨
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">BuluClaw Pro</h2>
            <p className="text-gray-400 text-sm">
              Deploy your own 24/7 active OpenClaw instance in under 1 minute.
              Billed monthly.
            </p>
          </div>
        </div>

        <div className="mt-12">
          <p className="text-xl mb-2">Subtotal</p>
          <p className="text-3xl font-bold">$49.00</p>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="w-1/2 bg-neutral-900 flex items-center justify-center">
        <button
          onClick={startPaddleCheckout}
          className="bg-purple-600 text-white px-10 py-4 rounded-xl text-xl font-semibold hover:bg-purple-700 transition"
        >
          {loading ? "Redirecting..." : "Subscribe via Paddle"}
        </button>
      </div>

    </div>
  );
}