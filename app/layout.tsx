import "./globals.css";
import Providers from "./providers";

export const metadata = {
  title: "BuluClaw",
  description: "Launch your AI bot instantly",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#020617] text-white">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
