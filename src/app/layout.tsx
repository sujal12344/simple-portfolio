import { ThemeProvider } from "@/components/theme-provider";
import { MetaData } from "@/data/data";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import Script from "next/script";
import "./global.css";

const poppins = Poppins({ subsets: ["latin"], weight: ["500"] });

export const metadata: Metadata = MetaData;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${poppins.className} bg-primary-foreground w-screen overflow-x-hidden`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>

        {/* External Script */}
        <Script
          src={`https://www.noupe.com/embed/${process.env.NOUPE_EMBED_KEY}.js`}
          strategy="afterInteractive"
        />
        {/* <Script
          src={`https://cdn.jotfor.ms/agent/embedjs/${process.env.JOTFORM_AGENT_ID}/embed.js?skipWelcome=1&maximizable=1`}
          strategy="afterInteractive"
        /> */}
      </body>
    </html>
  );
}
