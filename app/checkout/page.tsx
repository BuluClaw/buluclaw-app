"use client";

export default function CheckoutPage() {
  return (
    <div className="h-screen w-screen bg-black">
      
      <iframe
        src="https://buy.polar.sh/polar_cl_yLgMY3vkBYbBBnGsVQZH7urSahmg2GGfry12n8cRC"
        className="w-full h-full border-0"
        allow="payment"
      />

    </div>
  );
}