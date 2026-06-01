import type { Metadata } from "next";
import { Playfair_Display, DM_Sans } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-display-custom",
  subsets: ["latin"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-sans-custom",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Am I Eating My Money's Worth? | AYCE Value Calculator",
  description:
    "Track what you order at all-you-can-eat restaurants and find out if you're beating the buffet price. KBBQ, Hot Pot, and Sushi calculators.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${dmSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#1a1a1a] text-[#f5f0eb]">
        {children}
      </body>
    </html>
  );
}
