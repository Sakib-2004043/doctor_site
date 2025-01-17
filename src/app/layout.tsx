import type { Metadata } from "next";
import Link from "next/link";
import localFont from "next/font/local";
import "./global.css"

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Doctor",
  description: "Generated by create next app",
};

export default function RootLayout({children}: Readonly<{children: React.ReactNode}>) {
  return (
    <html lang="en">
      
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <div className="body">{children}</div>
        <br />
        <hr />
      
        <footer>
          <h3><Link href={"/"}>Back</Link></h3>
        </footer>
      
      </body>
      
    </html>
  );
}
