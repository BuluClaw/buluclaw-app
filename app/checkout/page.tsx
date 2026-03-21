"use client";

export default function CheckoutPage() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center">

      <div className="w-full max-w-2xl p-6">

        <iframe
          src="https://buy.polar.sh/polar_cl_yLgMYY3vkBYybBBnGsVQZH7urSahmg2GGfryl2n8cRC"
          className="w-full h-[780px] rounded-2xl border border-neutral-800"
          allow="payment"
        />

      </div>

    </div>
  );
}