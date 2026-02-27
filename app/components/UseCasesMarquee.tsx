"use client";

import MarqueeRow from "./MarqueeRow";

export default function UseCasesMarquee() {
  const lines = [
    [
      { icon: "lucide:mail-open", text: "Read & summarize email" },
      { icon: "lucide:file-text", text: "Draft replies & follow-ups" },
      { icon: "lucide:languages", text: "Translate messages" },
      { icon: "lucide:inbox", text: "Organize your inbox" },
      { icon: "lucide:headphones", text: "Answer support tickets" },
    ],

    [
      { icon: "lucide:alarm-clock", text: "Notify before a meeting" },
      { icon: "lucide:calendar", text: "Schedule meetings" },
      { icon: "lucide:book-open", text: "Take meeting notes" },
      { icon: "lucide:globe", text: "Sync across time zones" },
      { icon: "lucide:receipt", text: "Do your taxes" },
    ],

    [
      { icon: "lucide:percent", text: "Find discount codes" },
      { icon: "lucide:shuffle", text: "Price-drop alerts" },
      { icon: "lucide:git-compare", text: "Compare product specs" },
      { icon: "lucide:badge-dollar-sign", text: "Negotiate deals" },
      { icon: "lucide:calculator", text: "Run payroll calculations" },
    ],

    [
      { icon: "lucide:utensils", text: "Find recipes" },
      { icon: "lucide:plane", text: "Book travel and hotels" },
      { icon: "lucide:pen-line", text: "Draft social posts" },
      { icon: "lucide:clipboard-list", text: "Write contracts & NDAs" },
      { icon: "lucide:bar-chart-2", text: "Track OKRs & KPIs" },
    ],

    [
      { icon: "lucide:megaphone", text: "Screen cold outreach" },
      { icon: "lucide:target", text: "Set and track goals" },
      { icon: "lucide:bell", text: "Monitor news and alerts" },
      { icon: "lucide:users", text: "Screen and prioritize leads" },
      { icon: "lucide:book", text: "Create presentations" },
    ],
  ];

  return (
    <section className="mt-10 mb-16">
      <h2 className="text-4xl font-bold text-center text-white">
        What can OpenClaw do for you?
      </h2>

      <p className="text-center text-neutral-400 mt-2 mb-10">
        One assistant, thousands of use cases
      </p>

      <div className="relative max-w-5xl mx-auto px-4">
        <div className="absolute left-0 top-0 h-full w-20 bg-gradient-to-r from-black to-transparent pointer-events-none"></div>
        <div className="absolute right-0 top-0 h-full w-20 bg-gradient-to-l from-black to-transparent pointer-events-none"></div>

        {lines.map((row, i) => (
          <MarqueeRow key={i} items={row} reverse={i % 2 === 0} speed={0.8} />
        ))}
      </div>

      <p className="text-center text-neutral-500 mt-10 italic">
        PS. You can add as many use cases as you want via natural language
      </p>
    </section>
  );
}