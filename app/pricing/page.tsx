export default function PricingPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-10 text-white">
      <h1 className="text-4xl font-bold mb-8">BuluClaw Pricing</h1>

      <div className="bg-[#111] p-8 rounded-2xl shadow-lg max-w-xl w-full border border-gray-700">
        <h2 className="text-2xl font-semibold">🚀 BuluClaw Pro – $49/month</h2>

        <ul className="list-disc mt-4 ml-5 space-y-2 text-lg">
          <li>Deploy your own 24/7 active OpenClaw instance</li>
          <li>Telegram, WhatsApp, Discord bot support</li>
          <li>Unlimited messages (fair use)</li>
          <li>Webhooks + API automation</li>
          <li>Priority support</li>
          <li>Hosted securely on global servers</li>
        </ul>

        <p className="mt-6 text-lg">
          🔥 <strong>7-Day Refund Policy:</strong> If there is any technical issue, your payment will be refunded.
        </p>

        <button className="mt-8 w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-xl text-lg font-semibold">
          Subscribe via Paddle
        </button>

        <p className="mt-4 text-sm text-gray-400">
          Payments are processed securely by <strong>Paddle</strong>.
        </p>
      </div>
    </div>
  );
}