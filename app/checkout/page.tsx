"use client";

import { useEffect } from "react";

export default function CheckoutPage() {
 

  
  return (
    <div className="min-h-screen flex">

      {/* LEFT SIDE */}
      <div className="w-1/2 bg-black text-white p-16">
        <p className="text-gray-400 mb-2">Subscribe to BuluClaw</p>

        <h1 className="text-2xl font-bold mb-8">
          $49.00 <span className="text-lg font-normal">per month</span>
        </h1>

        <div className="flex items-start gap-4 mb-8">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-500 to-purple-600 flex items-center justify-center">
            ✨
          </div>

          <div>
            <div className="font-semibold text-lg">BuluClaw Pro</div>
            <p className="text-zinc-400 text-sm mt-2">
              Deploy your own 24/7 active OpenClaw instance in under 1 minute.Billed monthly
            </p>
            
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
      <div className="w-1/2 bg-blue flex items-center justify-center p-1">
        <div className="w-full max-w-md shadow-xl border rounded-2xl p-8">

          
        </div>
      </div>


    </div>
  );
}