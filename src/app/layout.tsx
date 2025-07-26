import { ThemeProvider } from "@/components/theme-provider";
import "./global.css";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { MetaData } from "@/data/data";

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
      </body>
    </html>
  );
}
