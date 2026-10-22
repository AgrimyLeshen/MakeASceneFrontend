import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], weight: ["400", "700"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: {
    default: "MakeAScene",
    template: "%s | MakeAScene",
  },
  description: "Beschreibung deiner App",
};

export default function RootLayout({children}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="de" className={inter.variable}>
      <body>
          {children}   
      </body>
    </html>
  );
}
