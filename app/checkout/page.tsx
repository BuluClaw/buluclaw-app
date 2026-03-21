"use client";

export default function CheckoutPage() {
  return (
    <div className="min-h-screen bg-black text-white flex">

    
      {/* RIGHT SIDE */}
      <div className="w-1/2 flex items-center justify-center">

        <div className="w-full max-w-lg">

          <iframe
            src="https://buy.polar.sh/polar_cl_yLgMYY3vkBYybBBnGsVQZH7urSahmg2GGfryl2n8cRC"
            className="w-full h-[750px] rounded-xl border border-neutral-800"
            allow="payment"
          />

        </div>

      </div>

    </div>
  );
}