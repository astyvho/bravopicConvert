import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BravoPic Image Converter",
  description: "Convert PNG images to WebP or JPG for free, fast, and securely in your browser. No installation required. Batch upload, bulk conversion, privacy protected. The best online image converter for PNG, JPG, WebP, and more.",
  keywords: [
    "image converter",
    "free image converter",
    "online image converter",
    "PNG to WebP",
    "PNG to JPG",
    "JPG to WebP",
    "WebP to JPG",
    "batch image conversion",
    "bulk image converter",
    "privacy safe image tool",
    "BravoPic",
    "photo converter",
    "picture converter",
    "fast image converter",
    "browser image converter",
    "no install image converter",
    "convert images online",
    "image conversion tool"
  ],
  // viewport 제거
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-yellow-400">
      <head>
        {/* Google Search Console 도메인 소유 확인 */}
        <meta name="google-site-verification" content="f_yi04ke2AOQgKSmgW2C60LLIMow3yeWvahynPvZDzI" />
        
        {/* 네이버 서치 사이트 확인 */}
        <meta name="naver-site-verification" content="d6ff057d950b725e2fa3332f0d42c3b1d9546034" />
        
        {/* Google 애드센스 소유권 확인 */}
        <meta name="google-adsense-account" content="ca-pub-6552891879490275" />
        
        {/* Google tag (gtag.js) */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-FHSV190JZH"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-FHSV190JZH');
            `,
          }}
        />
      </head>
      <body
        className={`${inter.variable} antialiased bg-yellow-400 text-black`}
      >
        {/* 내비게이션 */}
        <nav className="w-full flex items-center justify-between px-4 py-3 border-b-0 bg-black">
          <Link href="/" className="font-bold text-lg text-yellow-400">BravoPic Image Converter</Link>
          <div className="flex items-center gap-4 text-sm">
            <a href="/how-to-use" className="hover:underline text-yellow-400">How to Use</a>
            <a href="/privacy-policy" className="hover:underline text-yellow-400">Privacy Policy</a>
            <a href="/terms" className="hover:underline text-yellow-400">Terms of Service</a>
          </div>
        </nav>
        <main className="min-h-screen bg-yellow-400 flex flex-col items-center justify-center">
          {children}
        </main>
        
        {/* 푸터 */}
        <footer className="w-full text-center text-xs text-yellow-400 py-8 mt-8 border-t-0 bg-black">
          <div className="mb-2">
            <a href="/how-to-use" className="hover:underline mx-2 text-yellow-400">How to Use</a>|
            <a href="/privacy-policy" className="hover:underline mx-2 text-yellow-400">Privacy Policy</a>|
            <a href="/terms" className="hover:underline mx-2 text-yellow-400">Terms of Service</a>
          </div>
          <div>© 2025 BravoPic Image Converter</div>
        </footer>
      </body>
    </html>
  );
}
