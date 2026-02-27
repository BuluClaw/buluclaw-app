import "./globals.css";
import Providers from "./providers";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "BuluClaw",
  description: "Launch your AI bot in 60 seconds",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-[#0b1120] text-white`}>
        
        {/* BACKGROUND STARS */}
        <div className="fixed inset-0 -z-10 bg-stars opacity-40"></div>

        {/* SESSION PROVIDER WRAPPER */}
        <Providers>
          <div className="flex flex-col items-center w-full">
            {children}
          </div>
        </Providers>

      </body>
    </html>
  );
}