"use client";

import { useEffect } from "react";

export default function CheckoutPage() {

  // Load Razorpay script
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const startPayment = async () => {
    try {
      // Send Email to Backend
      const res = await fetch("/api/create-subscription", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: "test@gmail.com",
        }),
      });

      const sub = await res.json();
      console.log("SUB RESPONSE →", sub);

      // Check Subscription ID
      if (!sub.sub_id) {
        alert("Subscription error: No ID received!");
        console.log(sub);
        return;
      }

      // Razorpay Subscription Popup
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        subscription_id: sub.sub_id,
        name: "BuluClaw Pro",
        description: "Monthly Subscription",
        theme: {
          color: "#6366f1",
        },

        handler: function (response: any) {
          alert("Payment Successful!");
          console.log(response);
        },

        modal: {
          ondismiss: function () {
            alert("Payment Cancelled");
          },
        },
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.open();

    } catch (err) {
      console.error("Payment Error:", err);
      alert("Something went wrong!");
    }
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
            <div className="font-semibold text-lg">BuluClaw Pro</div>
            <p className="text-zinc-400 text-sm mt-2">
              Deploy your own 24/7 active OpenClaw instance in under 1 minute.
            </p>
            <div className="text-zinc-400 text-sm mt-2">Billed monthly</div>
          </div>

          <div className="ml-auto font-semibold">$49.00</div>
        </div>

        <div className="flex gap-2 mb-6">
          <input
            type="text"
            placeholder="Add promotion code"
            className="flex-1 bg-zinc-900 border border-zinc-700 rounded-md px-3 py-2 text-sm text-white"
          />
          <button className="bg-zinc-800 px-4 py-2 rounded-md text-sm hover:bg-zinc-700">
            Apply
          </button>
        </div>

        <div className="flex justify-between mb-2">
          <span className="text-zinc-400">Subtotal</span>
          <span>$49.00</span>
        </div>

        <div className="flex justify-between font-semibold text-lg">
          <span>Total due today</span>
          <span>$49.00</span>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="w-1/2 bg-white flex items-center justify-center p-16">
        <div className="w-full max-w-md shadow-xl border rounded-2xl p-8">

          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            You will be charged $49.00
          </h2>

          <p className="text-gray-500 text-sm mb-6">
            Secure payment powered by Razorpay
          </p>

          <button
            onClick={startPayment}
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition"
          >
            Continue to Payment
          </button>

          <p className="text-gray-400 text-xs text-center mt-4">
            Payments are encrypted & secured
          </p>

        </div>
      </div>
    </div>
  );
}