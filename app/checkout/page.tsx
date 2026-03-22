"use client";

export default function CheckoutPage() {
  return (
    <div className="min-h-screen bg-[#070707] flex justify-center pt-16">
      
      <div className="w-[420px] max-w-[95%]">
        
        <div className="bg-black border border-neutral-800 rounded-2xl p-3 shadow-2xl">
          
          <iframe
            src="https://buy.polar.sh/polar_cl_yLgMY3vkBYbBBnGsVQZH7urSahmg2GGfry12n8cRC"
            className="w-full rounded-xl"
            style={{
              height: "760px",
              border: "none"
            }}
            allow="payment"
          />

        </div>

      </div>

    </div>
  );
}