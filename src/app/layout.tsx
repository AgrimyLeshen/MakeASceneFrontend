import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import "./oldJsVersion/index.css";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist" });

export const metadata: Metadata = {
  title: {
    default: "MakeAScene",
    template: "%s | MakeAScene",
  },
  description: "Beschreibung deiner App",
};

export default function RootLayout({children}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="de" className={geist.variable}>
      <body>
          {children}   
      </body>
    </html>
  );
}
