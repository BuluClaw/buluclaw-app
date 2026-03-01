"use client";

export default function Footer() {
  return (
    <footer className="w-full py-8 border-t border-gray-800 text-gray-300 mt-10">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center px-5 gap-4">
        
        <p className="text-sm">
          © {new Date().getFullYear()} BuluClaw. All rights reserved.
        </p>

        <div className="flex gap-6 text-sm">
          <a href="/pricing" className="hover:text-white">Pricing</a>
          <a href="/terms" className="hover:text-white">Terms of Service</a>
          <a href="/privacy" className="hover:text-white">Privacy Policy</a>
          <a href="/refund" className="hover:text-white">Refund Policy</a>
        </div>

      </div>
    </footer>
  );
}