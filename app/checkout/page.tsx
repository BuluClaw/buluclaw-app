"use client";

export default function CheckoutPage() {
  return (
    <div className="h-screen bg-[#05070d] grid md:grid-cols-2">
      
      {/* LEFT SIDE */}
      <div className="hidden md:flex flex-col justify-center px-20 text-white bg-black">
        
        <div className="max-w-md">
          
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-500 to-red-500 flex items-center justify-center">
              ✦
            </div>

            <h1 className="text-xl font-semibold">
              BuluClaw
            </h1>
          </div>

          <h2 className="text-4xl font-bold mb-6">
            $29
            <span className="text-neutral-400 text-lg"> / month</span>
          </h2>

          <p className="text-neutral-400 mb-8">
            Avoid all technical complexity and deploy your AI tool instantly.
          </p>

          <div className="space-y-3 border-t border-neutral-800 pt-6">
            
            <div className="flex justify-between">
              <span className="text-neutral-400">Subtotal</span>
              <span>$29</span>
            </div>

            <div className="flex justify-between">
              <span className="text-neutral-400">Tax</span>
              <span>$0</span>
            </div>

            <div className="flex justify-between text-lg font-semibold pt-2">
              <span>Total</span>
              <span>$29</span>
            </div>

          </div>

        </div>

      </div>


      {/* RIGHT SIDE FULL HEIGHT CHECKOUT */}
      <div className="bg-white">

        <iframe
          src="https://buy.polar.sh/polar_cl_yLgMY3vkBYbBBnGsVQZH7urSahmg2GGfry12n8cRC"
          className="w-full h-screen border-0"
          allow="payment"
        />

      </div>

    </div>
  );
}