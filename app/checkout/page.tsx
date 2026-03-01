"use client";

import { useEffect } from "react";

export default function CheckoutPage() {
  // Load Paddle.js SDK
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://cdn.paddle.com/paddle/v2/paddle.js";
    script.async = true;
    script.onload = () => {
      // Initialize Paddle
      // @ts-ignore
      Paddle.Initialize({
        token: process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN,
      });
    };
    document.body.appendChild(script);
  }, []);

  // Open Paddle Checkout (Right Panel)
  const openCheckout = () => {
    // @ts-ignore
    Paddle.Checkout.open({
      items: [
        {
          priceId: "pri_01kjmzyprbfcqqbekwzvyvv6hm1", // YOUR PRICE ID
          quantity: 1,
        },
      ],
      settings: {
        displayMode: "overlay", // right side panel
        theme: "dark",
      },
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <button
        onClick={openCheckout}
        className="px-8 py-4 bg-purple-600 hover:bg-purple-700 rounded-xl text-lg font-semibold"
      >
        Subscribe Now – $49/mo
      </button>
    </div>
  );
}