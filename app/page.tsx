"use client";

import { useState, useEffect } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { LogOut } from "lucide-react";
import UseCasesMarquee from "./components/UseCasesMarquee";
async function subscribe() {
  const email = prompt("Enter your email");

  const res = await fetch("/api/create-subscription", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  });

  const data = await res.json();

  if (data.redirect_url) {
    window.location.href = data.redirect_url;
  } else {
    alert("Something went wrong");
  }
}

export default function Home() {
  const { data: session } = useSession();

  const [selectedModel, setSelectedModel] = useState("claude");
  const [selectedChannel, setSelectedChannel] = useState("");
  const [step, setStep] = useState<"select" | "telegram">("select");
  const [telegramConnected, setTelegramConnected] = useState(false);
  

  
  const [loading, setLoading] = useState(false);
  const [connectedMessage, setConnectedMessage] = useState(false);
const [status, setStatus] = useState<null | { type: "success" | "error"; message: string }>(null);

  const [botInfo, setBotInfo] = useState<any>(null);



const [token, setToken] = useState("");
useEffect(() => {
  const script = document.createElement("script");
  script.src = "https://checkout.razorpay.com/v1/checkout.js";
  script.async = true;
  document.body.appendChild(script);
}, []);

const handlePayment = async () => {
  // 1️⃣ Backend se order create karo
  const res = await fetch("/api/create-subscription", {
    method: "POST",
  });

  const order = await res.json();

  const options = {
    key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
    subscription_id: order.id,
name: "BuluClaw Pro",
description: "Monthly Subscription - $49",

    theme: {
      color: "#6366f1",
    },
    handler: async function (response: any) {
      console.log("Payment Success:", response);

      // Payment verify hone ke baad deploy
      deployBot();
    },
  };

  const rzp = new (window as any).Razorpay(options);
  rzp.open();
};


const connectTelegram = async () => {
  if (!token) {
    setStatus({
  type: "error",
  message: "Please enter bot token",
});

    return;
  }

  setLoading(true);

  try {
    const res = await fetch("/api/telegram", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token }),
    });

    const data = await res.json();

    if (data.success) {
      setTelegramConnected(true);
      setBotInfo(data.bot);
      setStep("select");
      setStatus({
  type: "success",
  message: "Telegram connected successfully 🚀",
});

setTimeout(() => {
  setStatus(null);
}, 4000);

    } else {
      
    }
  } catch (error) {
    setStatus({
  type: "error",
  message: "Server error. Please try again.",
});

  }

  setLoading(false);
};

const deployBot = async () => {
  if (!telegramConnected || !session) return;

  setLoading(true);

  try {
    const res = await fetch("/api/deploy", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: selectedModel,
        channel: selectedChannel,
        email: session.user?.email,
      }),
    });

    const data = await res.json();

    if (data.success) {
     setStatus({
  type: "success",
  message: "Bot deployed successfully 🚀",
});
setTimeout(() => {
  setStatus(null);
}, 4000);


    } else {
    setStatus({
  type: "error",
  message: "Deployment failed ❌",
});
setTimeout(() => {
  setStatus(null);
}, 4000);


    }
  } catch (error) {
   setStatus({
  type: "error",
  message: "Server error. Please try again.",
});
setTimeout(() => {
  setStatus(null);
}, 4000);


  }

  setLoading(false);
};

  return (

<div className="min-h-screen text-white px-6 pt-32 pb-20 flex flex-col items-center bg-gradient-to-b from-black via-[#0b1120] to-black">
      {/* HEADER */}
      <div className="w-full max-w-6xl flex justify-between items-center mb-20">
        <h1 className="text-xl font-semibold tracking-wide">
          BuluClaw<span className="text-zinc-500">.com</span>
        </h1>

        <a
          href="mailto:support@buluclaw.com"
          className="flex items-center gap-2 text-zinc-400 hover:text-white transition"
        >
          ✉ Contact Support
        </a>
      </div>
      {status && (
  <div
    className={`mb-6 px-6 py-4 rounded-2xl text-center font-medium ${
      status.type === "success"
        ? "bg-green-600/20 border border-green-500 text-green-400"
        : "bg-red-600/20 border border-red-500 text-red-400"
    }`}
  >
    {status.message}
  </div>
)}


      {step === "telegram" ? (

        <div className="w-full max-w-6xl bg-zinc-900/70 border border-zinc-800 rounded-3xl p-12 flex items-center justify-between gap-12">

          {/* LEFT SIDE */}
          <div className="flex-1 flex flex-col gap-6">

            <h2 className="flex items-center gap-3 text-2xl font-semibold text-white">
              <div className="w-10 h-10 rounded-full bg-[#229ED9] flex items-center justify-center">
                <svg viewBox="0 0 240 240" className="w-5 h-5 fill-white">
                  <path d="M120 0C53.7 0 0 53.7 0 120s53.7 120 120 120 120-53.7 120-120S186.3 0 120 0z"/>
                </svg>
              </div>
              Connect Telegram
            </h2>

            <div className="text-gray-400 text-sm space-y-4">
              <h3 className="text-white font-medium text-base">
                How to get your bot token?
              </h3>

              <p>1. Open Telegram and go to <span className="text-blue-400">@BotFather</span>.</p>
              <p>2. Start a chat and type <span className="bg-zinc-800 px-2 py-1 rounded-md text-gray-300">/newbot</span>.</p>
              <p>3. Follow the prompts to name your bot and choose a username.</p>
              <p>4. BotFather will send your bot token.</p>
              <p>5. Paste it below and click <span className="text-white">Save & Connect</span>.</p>
            </div>

            <input
  type="text"
  value={token}
  onChange={(e) => setToken(e.target.value)}
  placeholder="1234567890:ABC..."
  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-5 py-4 text-white"
/>


            
            <button
  onClick={connectTelegram}
  disabled={loading}
  className="bg-white text-black font-medium px-6 py-3 rounded-xl hover:opacity-90 transition disabled:opacity-50"
>
  {loading ? "Connecting..." : "Save & Connect"}
</button>

          </div>

          {/* RIGHT SIDE */}
          <div className="hidden lg:flex flex-1 justify-center items-start">
            <div className="relative rounded-3xl overflow-hidden border border-zinc-800 shadow-2xl bg-black">
              <video
                src="https://myfiles.simpleclaw.com/demo.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="w-[340px] h-auto object-cover"
              />
            </div>
          </div>

        </div>

      ) : (

        <>
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold mb-6">
              Launch Your Own AI Bot in 60 Seconds
            </h2>
            <p className="text-zinc-400 text-lg">
              No coding. No server setup. Deploy instantly.
            </p>
          </div>

          <div className="w-full max-w-5xl bg-zinc-900/70 backdrop-blur-xl border border-zinc-800 rounded-3xl p-12 shadow-2xl">

            {/* MODEL SECTION */}
            <h2 className="text-2xl font-semibold mb-8 text-center">
              Which model do you want as default?
            </h2>

            <div className="flex justify-center gap-6 flex-wrap mb-14">
              {[


                { id: "claude",
  label: "Claude Opus 4.5",
  icon: "/icons/icons8-claude-ai-32.png",
},
{
  id: "gpt",
  label: "GPT-5.2",
  icon: "/icons/icons8-chatgpt-32.png",
},
{
  id: "gemini",
  label: "Gemini 3 Flash",
  icon: "/icons/icons8-gemini-ai-32.png",
},

              ].map((model) => (
                <div
                  key={model.id}
           onClick={() => setSelectedModel(model.id)}
                  className={`px-6 py-3 rounded-full cursor-pointer flex items-center gap-3 transition ${
                    selectedModel === model.id
                      ? "bg-black border border-white shadow-lg"
                      : "bg-zinc-800 border border-zinc-700 hover:border-white"
                  }`}
                >
<img
  src={model.icon}
  alt={model.label}
  className="w-6 h-6"
/>
<span>{model.label}</span>
                {selectedModel === model.id && <span>✔</span>}
                </div>
              ))}
            </div>

            {/* CHANNEL SECTION */}
            <h2 className="text-2xl font-semibold mb-8 text-center">
              Which channel do you want to use for sending messages?
            </h2>

            <div className="flex justify-center gap-6 flex-wrap mb-12">
              {[

{
  id: "telegram",
  label: "Telegram",
  icon: "/icons/icons8-telegram-50.png",
},
{
  id: "discord",
  label: "Discord",
  icon: "/icons/icons8-discord-32.png",
},
{
  id: "whatsapp",
  label: "WhatsApp",
  icon: "/icons/icons8-whatsapp-logo-32.png",
},

              ].map((channel) => (
                <div
                  key={channel.id}
                  onClick={() => {
                    setSelectedChannel(channel.id);
                    if (channel.id === "telegram") {
                      setStep("telegram");
                    }
                  }}
                  className={`px-6 py-3 rounded-full cursor-pointer flex items-center gap-3 transition ${
                    selectedChannel === channel.id
                      ? "bg-black border border-white shadow-lg"
                      : "bg-zinc-800 border border-zinc-700 hover:border-white"
                  }`}
                >
<img
  src={channel.icon}
  alt={channel.label}
  className="w-6 h-6"
/>

                 


                  <span>{channel.label}</span>
                </div>
              ))}
            </div>

            {/* AUTH SECTION */}
            <div className="flex justify-center mt-10">
              {!session ? (
  <div className="flex flex-col items-center gap-4">

    <button
      onClick={() => signIn("google")}
      className="flex items-center gap-3 bg-white text-black px-8 py-4 rounded-full font-medium shadow-lg hover:scale-105 transition"
    >
      <img
        src="https://www.svgrepo.com/show/475656/google-color.svg"
        alt="google"
        className="w-5 h-5"
      />
      Sign in with Google
    </button>

    <p className="text-sm text-zinc-400 text-center">
      Sign in to deploy your AI assistant and connect your channels.
      <span className="text-blue-400">
        {" "}Limited cloud servers — only 11 left
      </span>
    </p>

  </div>


) : (

                <div className="w-full flex flex-col items-center">

                  {/* DEPLOY BUTTON */}
                  <div className="mb-6 text-center">
                   {status && (
  <div
    className={`mb-4 px-6 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
      status.type === "success"
        ? "bg-green-600/20 border border-green-500 text-green-400"
        : "bg-red-600/20 border border-red-500 text-red-400"
    }`}
  >
    {status.message}
  </div>
)}
 
                    <button

  
onClick={() => window.location.href = "/checkout"}

  disabled={!telegramConnected || loading}
  className={`px-8 py-4 rounded-2xl font-medium text-lg transition ${
    telegramConnected
      ? "bg-white text-black hover:scale-105"
      : "bg-zinc-700 text-zinc-400 cursor-not-allowed"
  }`}
>
  {loading ? "Deploying..." : "⚡ Deploy OpenClaw"}
</button>
{telegramConnected && (
  <p className="mt-4 text-sm text-zinc-400 text-center">
    $49 per month. Includes $15 in AI credits refreshed monthly.{" "}
    <span className="text-blue-400">
      Limited cloud servers — only 11 left
    </span>
  </p>
)}
</div>

                  {/* PROFILE CARD */}
                  <div className="w-full max-w-md flex items-center bg-zinc-900 rounded-2xl px-6 py-4 shadow-lg gap-4">

                    <img
                      src={session.user?.image || "/default-avatar.png"}
                      alt="profile"
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <p className="text-white font-medium">
                        {session.user?.name}
                      </p>
                      <p className="text-zinc-400 text-sm">
                        {session.user?.email}
                      </p>
                
                    </div>
                    <button
  onClick={() => signOut()}
  className="ml-auto p-2 rounded-lg hover:bg-zinc-800 text-zinc-500 hover:text-white transition"
>
  <LogOut size={18} />
</button>

                    

                  </div>

                </div>
              )}
            </div>

          </div>
        </>
      )}

    

  {/* TOP RED GLOW LINE */}
  <div className="w-full max-w-4xl mx-auto flex items-center justify-center relative">
      <div className="flex-1 h-px bg-red-900/40"></div>
      <span className="mx-6 text-red-500 text-sm tracking-widest uppercase font-semibold">
        Comparison
      </span>
      <div className="flex-1 h-px bg-red-900/40"></div>

      {/* RED TOP GLOW */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-10 bg-red-600/20 blur-2xl rounded-full"></div>
  </div>

 




 

{/* Comparison Section */}


<section className="w-full py-32">


  <h2 className="text-center text-4xl font-semibold mb-20 tracking-wide">
    Traditional Method vs <span className="text-white">BuluClaw</span>
  </h2>

  <div className="flex items-start justify-center gap-16 px-10">
    
    {/* Left — Traditional */}
    <div className="w-[480px]">
      <h3 className="text-xl italic text-neutral-300 mb-6">Traditional</h3>

      <div className="space-y-4 text-[1.05rem] leading-relaxed text-neutral-300">
        <div className="flex justify-between"><span>Purchasing local virtual machine</span><span>15 min</span></div>
        <div className="flex justify-between"><span>Creating SSH keys and storing securely</span><span>10 min</span></div>
        <div className="flex justify-between"><span>Connecting to the server via SSH</span><span>5 min</span></div>
        <div className="flex justify-between"><span>Installing Node.js and NPM</span><span>5 min</span></div>
        <div className="flex justify-between"><span>Installing OpenClaw</span><span>7 min</span></div>
        <div className="flex justify-between"><span>Setting up OpenClaw</span><span>10 min</span></div>
        <div className="flex justify-between"><span>Connecting to AI provider</span><span>4 min</span></div>
        <div className="flex justify-between"><span>Pairing with Telegram</span><span>4 min</span></div>
      </div>

      <div className="border-t border-neutral-700 my-8"></div>

      <div className="flex justify-between text-xl font-semibold text-neutral-200">
        <span>Total</span>
        <span>60 min</span>
      </div>

      <p className="text-sm text-neutral-400 mt-8 leading-relaxed">
        If you're <span className="bg-red-800 text-white px-2 py-0.5 rounded-md">non-technical</span>, 
        multiply these <span className="bg-red-800 text-white px-2 py-0.5 rounded-md">times by 10</span> — you have to
        learn each step before doing.
      </p>
    </div>


    

    {/* Middle Divider */}
    <div className="w-px h-[500px] bg-neutral-800"></div>

    {/* Right — BuluClaw */}
    <div className="w-[480px]">
      <h3 className="text-xl italic text-neutral-300 mb-6">BuluClaw</h3>

      <p className="text-6xl font-bold text-white mb-4">&lt; 1 min</p>

      <p className="text-neutral-300 text-[1.05rem] leading-relaxed mb-6">
        Pick a model, connect Telegram, deploy — done under 1 minute.
      </p>

      <p className="text-neutral-400 leading-relaxed text-[1.05rem]">
        Servers, SSH and OpenClaw Environment are already set up, 
        waiting to get assigned. Simple, secure and fast connection to 
        your bot.
      </p>
    </div>

  </div>
</section>


<UseCasesMarquee />



<footer className="flex items-center justify-center gap-2 py-10 text-sm text-zinc-500">
  <span>Built with ❤️ by</span>
  <a 
    href="https://x.com/sachingill48"
    target="_blank"
    className="underline underline-offset-4 hover:text-white"
  >
    Sachin Gill
  </a>
  <span>•</span>

<a
  href="mailto:support@buluclaw.com"
  className="underline underline-offset-4 hover:text-white pointer-events-auto"
>
  Contact Support
</a>


</footer>

    </div>

  );
}