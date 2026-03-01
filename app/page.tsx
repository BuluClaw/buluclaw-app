

"use client";

import { useState, useEffect } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import UseCasesMarquee from "./components/UseCasesMarquee";
import { LogOut } from "lucide-react";

export default function Home() {
  const { data: session } = useSession();

  const [selectedModel, setSelectedModel] = useState("claude");
  const [selectedChannel, setSelectedChannel] = useState("");
  const [step, setStep] = useState<"select" | "telegram" | null>("select");
  const [telegramConnected, setTelegramConnected] = useState(false);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<null | { type: "success" | "error"; message: string }>(null);
  const [botInfo, setBotInfo] = useState<any>(null);
  const [token, setToken] = useState("");

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

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
        headers: { "Content-Type": "application/json" },
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

        setTimeout(() => setStatus(null), 4000);
      } else {
        setStatus({
          type: "error",
          message: "Invalid token, please try again.",
        });
      }
    } catch (error) {
      setStatus({
        type: "error",
        message: "Server error. Please try again.",
      });
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen text-white px-4 md:px-6 py-10 flex flex-col items-center bg-gradient-to-b from-black via-[#0b1120] to-black">
      
      {/* HEADER */}
      <div className="w-full max-w-6xl flex justify-between items-center mb-16">
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

      {/* TELEGRAM MODAL */}
      {step === "telegram" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">

          <div className="max-w-4xl w-full bg-zinc-900 border border-zinc-800 rounded-2xl p-6 md:p-10 shadow-2xl flex flex-col md:flex-row gap-10 relative">

            {/* BACK BUTTON */}
            <button
              onClick={() => setStep(null)}
              className="absolute left-4 top-4 p-2 rounded-full hover:bg-zinc-800 transition"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="white"
                className="w-6 h-6"
              >
                <path
                  fillRule="evenodd"
                  d="M15.78 3.22a.75.75 0 010 1.06L9.06 11l6.72 6.72a.75.75 0 11-1.06 1.06l-7.25-7.25a.75.75 0 010-1.06l7.25-7.25a.75.75 0 011.06 0z"
                  clipRule="evenodd"
                />
              </svg>
            </button>

            {/* LEFT */}
            <div className="flex-1 flex flex-col gap-4 md:gap-6 justify-center">

              <h2 className="flex items-center gap-3 text-xl md:text-2xl font-semibold text-white">
                <div className="w-10 h-10 rounded-full bg-[#229ED9] flex items-center justify-center">
                  <img src="/icons/icons8-telegram-50.png" className="w-6 h-6" />
                </div>
                Connect Telegram
              </h2>

              <div className="text-gray-300 text-sm leading-relaxed space-y-2 md:text-base">
                <h3 className="text-white font-semibold text-[16px] md:text-[17px]">How to get your bot token?</h3>

                <p>1. Open Telegram & go to <span className="text-blue-400 font-medium">@BotFather</span>.</p>

                <p>2. Type <span className="bg-zinc-800 px-2 py-1 rounded-md text-gray-200">/newbot</span>.</p>

                <p>3. Follow the steps to create your bot.</p>

                <p>4. Copy your bot token from BotFather.</p>

                <p>5. Paste the token below & press <b>Save & Connect</b>.</p>
              </div>

              <input
                type="text"
                value={token}
                onChange={(e) => setToken(e.target.value)}
                placeholder="1234567890:ABCdefGHI..."
                className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-5 py-4 text-white"
              />

              <button
                onClick={connectTelegram}
                disabled={loading}
                className="bg-white text-black font-medium px-6 py-3 rounded-xl hover:opacity-90 transition"
              >
                {loading ? "Connecting..." : "Save & Connect"}
              </button>
            </div>

            {/* RIGHT (VIDEO) */}
            <div className="hidden md:flex flex-1 justify-center items-start">
              <div className="relative rounded-2xl overflow-hidden border border-zinc-800 shadow-2xl bg-black">
                <video
                  src="/demo.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-[280px] md:w-[300px] h-auto object-cover"
                />
              </div>
            </div>

          </div>
        </div>
      )}

      {/* MAIN TITLE */}
      <h1 className="text-[30px] md:text-[45px] font-semibold text-neutral-200 text-center leading-tight mt-4">
        Deploy OpenClaw under 60 Seconds
      </h1>

      <p className="text-[14px] md:text-[16px] text-neutral-400 text-center mt-4 mb-10 leading-relaxed">
        Avoid all technical complexity and one-click deploy your own 24/7 active <br className="hidden md:block" />
        OpenClaw instance under 60 Seconds.
      </p>

      {/* MAIN CARD */}
      <div className="w-full max-w-[95%] md:max-w-5xl bg-zinc-900/70 backdrop-blur-xl border border-zinc-800 rounded-2xl p-4 md:p-6 shadow-2xl">

        {/* MODEL SECTION */}
        <h2 className="text-xl md:text-2xl font-semibold mb-6 text-center">
          Which model do you want as default?
        </h2>

        <div className="flex justify-center gap-4 md:gap-6 flex-wrap mb-10">
          {[
            { id: "claude", label: "Claude Opus 4.5", icon: "/icons/icons8-claude-ai-32.png" },
            { id: "gpt", label: "GPT-5.2", icon: "/icons/icons8-chatgpt-32.png" },
            { id: "gemini", label: "Gemini 3 Flash", icon: "/icons/icons8-gemini-ai-32.png" },
          ].map((model) => (
            <div
              key={model.id}
              onClick={() => setSelectedModel(model.id)}
              className={`px-4 py-2 md:px-6 md:py-3 rounded-full cursor-pointer flex items-center gap-3 transition ${
                selectedModel === model.id
                  ? "bg-black border border-white shadow-lg"
                  : "bg-zinc-800 border border-zinc-700 hover:border-white"
              }`}
            >
              <img src={model.icon} alt={model.label} className="w-6 h-6" />
              <span className="text-sm md:text-base">{model.label}</span>
              {selectedModel === model.id && <span>✔</span>}
            </div>
          ))}
        </div>

        {/* CHANNEL SECTION */}
        <h2 className="text-xl md:text-2xl font-semibold mb-8 text-center">
          Which channel do you want to use for sending messages?
        </h2>

        <div className="flex justify-center gap-4 md:gap-6 flex-wrap mb-12">
          {[
            { id: "telegram", label: "Telegram", icon: "/icons/icons8-telegram-50.png" },
            { id: "discord", label: "Discord", icon: "/icons/icons8-discord-32.png" },
            { id: "whatsapp", label: "WhatsApp", icon: "/icons/icons8-whatsapp-logo-32.png" },
          ].map((channel) => (
            <div
              key={channel.id}
              onClick={() => {
                setSelectedChannel(channel.id);
                if (channel.id === "telegram") setStep("telegram");
              }}
              className={`px-4 py-2 md:px-6 md:py-3 rounded-full cursor-pointer flex items-center gap-3 transition ${
                selectedChannel === channel.id
                  ? "bg-black border border-white shadow-lg"
                  : "bg-zinc-800 border border-zinc-700 hover:border-white"
              }`}
            >
              <img src={channel.icon} alt={channel.label} className="w-6 h-6" />
              <span className="text-sm md:text-base">{channel.label}</span>
            </div>
          ))}
        </div>

        {/* LOGIN + DEPLOY */}
        <div className="flex justify-center mt-10">
          {!session ? (
            <div className="flex flex-col items-center gap-4">

              {/* LOGIN BUTTON */}
              <button
                onClick={() => signIn("google")}
                className="flex items-center gap-3 bg-white text-black px-6 md:px-8 py-3 md:py-4 rounded-full font-medium shadow-lg hover:scale-105 transition text-sm md:text-base"
              >
                <img
                  src="https://www.svgrepo.com/show/475656/google-color.svg"
                  alt="google"
                  className="w-5 h-5"
                />
                Sign in with Google
              </button>

              <p className="text-xs md:text-sm text-zinc-400 text-center max-w-[280px] md:max-w-full leading-relaxed">
                Sign in to deploy your AI assistant and connect your channels.
                <span className="text-blue-400"> Limited cloud servers — only 11 left</span>
              </p>
            </div>
          ) : (
            <div className="w-full flex flex-col items-center">

              {/* STATUS */}
              {status && (
                <div
                  className={`mb-4 px-4 md:px-6 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                    status.type === "success"
                      ? "bg-green-600/20 border border-green-500 text-green-400"
                      : "bg-red-600/20 border border-red-500 text-red-400"
                  }`}
                >
                  {status.message}
                </div>
              )}

              {/* DEPLOY BUTTON */}
              <button
                onClick={() => window.location.href = "/checkout"}
                disabled={!telegramConnected || loading}
                className={`px-6 md:px-8 py-3 md:py-4 rounded-2xl font-medium text-base md:text-lg transition ${
                  telegramConnected
                    ? "bg-white text-black hover:scale-105"
                    : "bg-zinc-700 text-zinc-400 cursor-not-allowed"
                }`}
              >
                {loading ? "Deploying..." : "⚡ Deploy OpenClaw"}
              </button>

              {telegramConnected && (
                <p className="mt-4 text-xs md:text-sm text-zinc-400 text-center">
                  $49/month. Includes $15 in AI credits monthly.
                  <span className="text-blue-400"> Only 11 left</span>
                </p>
              )}

              {/* USER CARD */}
              <div className="w-full max-w-md flex items-center bg-zinc-900 rounded-2xl px-4 md:px-6 py-3 md:py-4 shadow-lg gap-4 mt-6">
                <img
                  src={session.user?.image || "/default-avatar.png"}
                  alt="profile"
                  className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover"
                />

                <div>
                  <p className="text-white font-medium text-sm md:text-base">{session.user?.name}</p>
                  <p className="text-zinc-400 text-xs md:text-sm">{session.user?.email}</p>
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

      {/* COMPARISON SECTION */}
      <div className="w-full flex items-center justify-center my-10">
        <div className="w-[120px] md:w-[180px] h-[3px] bg-gradient-to-r from-white/10 via-orange-500 to-transparent"></div>

        <p className="mx-3 md:mx-5 text-orange-400 font-semibold tracking-wide text-[16px] md:text-[18px]">
          Comparison
        </p>

        <div className="w-[120px] md:w-[180px] h-[3px] bg-gradient-to-l from-white/10 via-orange-500 to-transparent"></div>
      </div>

      <section className="w-full py-2 px-4 md:px-0">
        <h2 className="text-center text-3xl md:text-4xl font-semibold mb-8 md:mb-10 tracking-wide">
          Traditional Method vs <span className="text-white">BuluClaw</span>
        </h2>

        <div className="flex flex-col md:flex-row justify-between items-start gap-10 md:gap-20 px-2 md:px-10">
          
          {/* TRADITIONAL */}
          <div className="w-full md:w-[480px]">
            <h3 className="text-base md:text-lg italic text-neutral-300 mb-4 md:mb-6">Traditional</h3>

            <div className="space-y-3 md:space-y-4 text-[0.90rem] md:text-[0.95rem] leading-relaxed text-neutral-300">
              <div className="flex justify-between"><span>Purchasing local virtual machine</span><span>15 min</span></div>
              <div className="flex justify-between"><span>Creating SSH keys and storing securely</span><span>10 min</span></div>
              <div className="flex justify-between"><span>Connecting to the server via SSH</span><span>5 min</span></div>
              <div className="flex justify-between"><span>Installing Node.js and NPM</span><span>5 min</span></div>
              <div className="flex justify-between"><span>Installing OpenClaw</span><span>7 min</span></div>
              <div className="flex justify-between"><span>Setting up OpenClaw</span><span>10 min</span></div>
              <div className="flex justify-between"><span>Connecting to AI provider</span><span>4 min</span></div>
              <div className="flex justify-between"><span>Pairing with Telegram</span><span>4 min</span></div>
            </div>

            <div className="border-t border-neutral-700 my-6 md:my-8"></div>

            <div className="flex justify-between text-lg font-semibold text-neutral-200">
              <span>Total</span>
              <span>60 min</span>
            </div>

            <p className="text-xs md:text-sm text-neutral-400 mt-3 md:mt-4 leading-relaxed">
              If you're <span className="bg-orange-800 text-white px-2 py-0.5 rounded-md">non-technical</span>, 
              multiply these <span className="bg-orange-800 text-white px-2 py-0.5 rounded-md">times by 10</span>
            </p>
          </div>

          {/* DIVIDER */}
          <div className="w-full h-px bg-neutral-800 md:hidden"></div>
          <div className="hidden md:block w-px h-[500px] bg-neutral-800"></div>

          {/* BULUCLAW */}
          <div className="w-full md:w-[420px] text-left mt-6 md:mt-24">
            <h3 className="text-base md:text-lg italic text-neutral-300 mb-2 md:mb-3">BuluClaw</h3>

            <p className="text-2xl md:text-3xl font-bold text-white mb-3 md:mb-4">&lt; 1 min</p>

            <p className="text-neutral-400 leading-relaxed text-sm md:text-[15px] mb-3 md:mb-4">
              Pick a model, connect Telegram, deploy — done under 1 minute.
            </p>

            <p className="text-neutral-500 leading-relaxed text-sm md:text-[15px]">
              Servers & OpenClaw environment already set up.
              Simple, secure & fast connection to your bot.
            </p>
          </div>

        </div>
      </section>

      {/* MARQUEE */}
      <UseCasesMarquee />

      {/* FOOTER */}
      <footer className="flex flex-col md:flex-row items-center justify-center gap-2 py-10 text-xs md:text-sm text-zinc-500">
        <span>Built with ❤️ by</span>
        <a 
          href="https://x.com/sachingill48"
          target="_blank"
          className="underline underline-offset-4 hover:text-white"
        >
          Sachin Gill
        </a>

        <span className="hidden md:block">•</span>

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