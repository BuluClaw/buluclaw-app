import "./globals.css";
import Providers from "./providers";
import { Inter } from "next/font/google";
import Footer from "./components/Footer";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "BuluClaw",
  description: "Launch your AI bot in 60 seconds",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Paddle Script */}
        <Script
          src="https://cdn.paddle.com/paddle/v2/paddle.js"
          strategy="beforeInteractive"
        />

        <Script
          id="paddle-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              Paddle.Initialize({
                token: "${process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN}"
              });
            `,
          }}
        />
      </head>

      <body className={`${inter.className} bg-[#0b1120] text-white`}>
        {/* Stars Background */}
        <div className="fixed inset-0 -z-10 bg-stars opacity-40"></div>

        {/* Page Content */}
        <Providers>
          <div className="flex flex-col items-center w-full">
            {children}
          </div>
        </Providers>

        <Footer />
      </body>
    </html>
  );
}