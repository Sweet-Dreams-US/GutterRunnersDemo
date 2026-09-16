import type { Metadata } from "next";
import { Barlow_Condensed, Lexend } from "next/font/google";
import "./globals.css";

const barlow = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["700", "800"],
  variable: "--font-display",
});

const lexend = Lexend({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "Gutter Runners | Fort Wayne Gutter Service",
  description: "Gutter installation, repair, and seamless metal gutters in Fort Wayne and surrounding areas.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${barlow.variable} ${lexend.variable}`}>{children}</body>
    </html>
  );
}
