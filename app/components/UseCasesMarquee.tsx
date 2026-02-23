"use client";
import { useRef, useEffect } from "react";

export default function UseCasesMarquee() {
  const rows = [
    [
      "Notify before a meeting",
      "Schedule meetings from chat",
      "Read & summarize email",
      "Draft replies and follow-ups",
      "Translate messages in real time",
    ],
    [
      "Organize your inbox",
      "Answer support tickets",
      "Summarize long documents",
      "Sync across time zones",
      "Do your taxes",
    ],
    [
      "Track expenses and receipts",
      "Compare insurance quotes",
      "Manage subscriptions",
      "Remind you of deadlines",
      "Plan your week",
    ],
    [
      "Negotiate deals",
      "Run payroll calculations",
      "Find best prices online",
      "Find coupons",
      "Find discount codes",
    ],
    [
      "Draft job descriptions",
      "Generate invoices",
      "Screen cold outreach",
      "Track OKRs and KPIs",
      "Monitor news and alerts",
    ],
  ];

  return (
    <div className="w-full py-6 mt-0 overflow-hidden">
      <h2 className="text-center text-4xl font-bold mb-3">
        What can BuluClaw do for you?
      </h2>
      <p className="text-center text-xl text-gray-400 mb-12">
        One assistant, thousands of use cases
      </p>

      <div className="space-y-6">
        {rows.map((items, i) => (
          <MarqueeRow key={i} items={items} reverse={i % 2 !== 0} />
        ))}
      </div>

      <p className="text-center text-gray-400 mt-12 italic">
        PS. You can add as many use cases as you want via natural language
      </p>
    </div>
  );
}

function MarqueeRow({ items, reverse }: any) {
  return (
    <div
      className={`flex space-x-4 whitespace-nowrap overflow-hidden group relative`}
    >
      <div
        className={`flex space-x-4 animate-marquee ${
          reverse ? "direction-reverse" : ""
        } group-hover:pause`}
      >
        {items.map((text: string, idx: number) => (
          <Chip key={idx} text={text} />
        ))}
      </div>

      <div
        className={`flex space-x-4 animate-marquee ${
          reverse ? "direction-reverse" : ""
        } group-hover:pause`}
      >
        {items.map((text: string, idx: number) => (
          <Chip key={idx} text={text} />
        ))}
      </div>
    </div>
  );
}

function Chip({ text }: any) {
  return (
    <div className="px-6 py-3 bg-[#0f0f0f] border border-gray-700 rounded-xl text-gray-200 text-lg
        shadow-[0_0_30px_rgba(0,0,0,0.4)] hover:scale-105 transition-all duration-300 cursor-pointer">
      {text}
    </div>
  );
}