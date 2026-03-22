"use client";

import { useState } from "react";

export default function Dashboard() {

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  function handleConnect() {

    setLoading(true);

    // 3 sec loader
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
    }, 3000);

  }

  return (

    <div className="min-h-screen flex items-center justify-center bg-[#070b14]">

      {!loading && !success && (

        <div className="bg-[#0c1220] p-8 rounded-2xl w-[420px] text-center shadow-xl">

          <h2 className="text-white text-xl mb-4">
            Connect your Telegram
          </h2>

          <p className="text-gray-400 text-sm mb-6">

            Follow these steps

            <br /><br />

           1. Open the bot by clicking on the BotFather message.
            <br />
          2. Click the Start button to send a message to your bot.
            <br />
            3. Click the button below to confirm you sent the first message.
          </p>

          <button
            onClick={handleConnect}
            className="w-full bg-white text-black py-3 rounded-lg font-medium"
          >
            I have sent a message ✓
          </button>

        </div>

      )}

      {loading && (

        <div className="bg-[#0c1220] p-10 rounded-2xl w-[420px] text-center">

          <div className="animate-spin rounded-full h-10 w-10 border-2 border-white border-t-transparent mx-auto mb-4" />

          <h2 className="text-white text-lg">
            Pairing Telegram
          </h2>

          <p className="text-gray-400 text-sm mt-2">
            Connecting your bot. Hang tight...
          </p>

        </div>

      )}

      {success && (

        <div className="bg-[#0c1220] p-10 rounded-2xl w-[420px] text-center">

          <div className="text-green-400 text-4xl mb-3">
            ✓
          </div>

          <h2 className="text-white text-lg mb-2">
            Deployment success!
          </h2>

          <p className="text-gray-400 text-sm mb-6">
            Your bot is live. Use Telegram to chat.
          </p>

          <div className="text-white text-3xl mb-1">
            $10
          </div>

          <div className="text-gray-400 text-sm mb-6">
            Remaining credits
          </div>

          <button className="bg-white text-black px-6 py-2 rounded-lg">
            Purchase credit →
          </button>

          <p className="text-gray-500 text-xs mt-6">
            One time purchase. 10% fee.
          </p>

        </div>

      )}

    </div>

  );

}