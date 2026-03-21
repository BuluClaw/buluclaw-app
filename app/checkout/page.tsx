"use client";

export default function CheckoutPage() {
  return (
    <div className="min-h-screen bg-black text-white flex">

      {/* LEFT SIDE */}
      <div className="w-1/2 p-12 border-r border-neutral-800">

        <a href="/" className="text-gray-400">← Back</a>

        <h1 className="text-3xl font-semibold mt-6">
          Subscribe to BuluClaw
        </h1>

        <p className="text-4xl mt-2 font-bold">
          ₹1 <span className="text-lg text-gray-400">/ per month</span>
        </p>

        <div className="mt-8 flex gap-4 items-start">
          <img
            src="/logo.png"
            className="w-12 h-12 rounded-xl"
          />

          <div>
            <p className="font-semibold">BuluClaw</p>

            <p className="text-gray-400 text-sm mt-1">
              Avoid all technical complexity and deploy your own 24/7
              OpenClaw instance in 1 minute.
            </p>

            <p className="text-gray-500 text-sm mt-2">
              Billed monthly
            </p>
          </div>

          <p className="ml-auto">₹1</p>
        </div>


        <div className="mt-10 border-t border-neutral-800 pt-6">

          <p className="flex justify-between">
            <span>Subtotal</span>
            <span>₹1</span>
          </p>

          <div className="mt-4 flex gap-3">
            <input
              placeholder="Enter promo code"
              className="bg-neutral-900 border border-neutral-700 rounded-lg px-4 py-2 w-full"
            />

            <button className="bg-blue-600 px-4 rounded-lg">
              Apply
            </button>
          </div>

          <p className="flex justify-between mt-8 text-lg font-semibold">
            <span>Total due today</span>
            <span>₹1</span>
          </p>

        </div>

      </div>



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