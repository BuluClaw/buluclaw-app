"use client";

export default function CheckoutPage() {
  return (
    <div className="min-h-screen bg-[#070707] flex items-center justify-center">

      <div className="w-full max-w-md">

        <div className="bg-black border border-neutral-800 rounded-2xl p-4 shadow-2xl">

          <iframe
            src="https://buy.polar.sh/polar_cl_yLgMYY3vkBYybBBnGsVQZH7urSahmg2GGfryl2n8cRC"
            className="w-full h-[720px] rounded-xl"
            allow="payment"
          />

        </div>

      </div>

    </div>
  );
}