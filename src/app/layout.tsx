import { BackgroundGradientAnimation } from "@/components/ui/BackgroundGradientAnimation";
import Footer from "@/components/Footer";
import Providers from "@/components/Providers";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Calistoga, Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const calistoga = Calistoga({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["400"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://jacobkly.com"),
  title: "Jacob Klymenko",
  description: "Software engineer building backend and cloud systems",
  openGraph: {
    title: "Jacob Klymenko",
    description: "Software engineer building backend and cloud systems",
    url: "https://jacobkly.com",
    siteName: "Jacob Klymenko",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Jacob Klymenko — Software Engineer",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jacob Klymenko",
    description: "Software engineer building backend and cloud systems",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "mx-auto flex min-h-screen w-full max-w-3xl flex-col px-6 pt-12 font-sans antialiased sm:px-8 lg:max-w-4xl lg:px-12 2xl:max-w-5xl 2xl:px-16 3xl:max-w-6xl",
          inter.variable,
          calistoga.variable,
        )}
      >
        <Providers>
          <div className="pointer-events-none fixed inset-0 -z-10 hidden dark:block">
            <BackgroundGradientAnimation containerClassName="fixed inset-0" />
          </div>
          <main className="grow">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}