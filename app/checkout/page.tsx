"use client";

import { useEffect } from "react";

export default function CheckoutPage() {
  useEffect(() => {
    // Load Paddle Script
    const script = document.createElement("script");
    script.src = "https://cdn.paddle.com/paddle/v2/paddle.js";
    script.onload = () => {
      // @ts-ignore
      Paddle.Initialize({
        token: process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN,
      });
    };
    document.body.appendChild(script);
  }, []);

  // Open Paddle Checkout
  const openCheckout = () => {
    // @ts-ignore
    Paddle.Checkout.open({
      items: [
        {
          priceId: "pri_01kjmzyprbfcqqbekwzvyvv6hm1", // Your Paddle Price ID
          quantity: 1,
        },
      ],
    });
  };

  return (
    <div className="min-h-screen flex">

      {/* LEFT SIDE (PRODUCT INFO) */}
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
            <h3 className="text-xl font-semibold mb-1">BuluClaw Pro</h3>
            <p className="text-gray-400 w-[80%]">
              Deploy your own 24/7 active OpenClaw instance in under 1 minute.
              <br />Billed monthly.
            </p>
          </div>
        </div>

        <div className="mt-10">
          <label className="block text-gray-300 mb-2">Promotion code</label>
          <div className="flex gap-3">
            <input
              className="bg-[#111] border border-gray-700 px-4 py-3 rounded-lg w-64"
              placeholder="Add promotion code"
            />
            <button className="bg-gray-700 px-6 rounded-lg">Apply</button>
          </div>
        </div>

        <div className="mt-10">
          <p className="text-gray-300">Subtotal</p>
          <p className="text-xl font-bold">$49.00</p>
        </div>

        <div className="mt-5">
          <p className="text-gray-300">Total due today</p>
          <p className="text-xl font-bold">$49.00</p>
        </div>
      </div>

      {/* RIGHT SIDE (PADDLE CHECKOUT BUTTON) */}
      <div className="w-1/2 bg-[#0b1120] text-white p-16 flex flex-col justify-center">

        <div className="border border-gray-600 rounded-xl p-10 bg-[#111827] w-[80%] mx-auto">
          <h2 className="text-2xl font-semibold mb-5 text-center">
            Complete Your Payment
          </h2>

          <button
            onClick={openCheckout}
            className="w-full bg-purple-600 hover:bg-purple-700 transition text-white font-semibold py-4 rounded-lg text-lg"
          >
            Continue to Payment
          </button>

          <p className="text-center text-gray-400 text-sm mt-4">
            Payments are securely processed by Paddle
          </p>
        </div>
      </div>
    </div>
  );
}