import { ThemeProvider } from "@/components/theme-provider";
import "./global.css";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { MetaData } from "@/data/data";
import Script from "next/script";

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
          src={`https://www.noupe.com/embed/${process.env.NEXT_PUBLIC_NOUPE_EMBED_KEY}.js`}
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
