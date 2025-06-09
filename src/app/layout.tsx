import "./globals.css";
import "./style.css";
import "./fonts.css";
import { Metadata } from "next";
import { LenisProvider } from "@/lib/lenis";


export const metadata: Metadata = {
  title: "CarRental - Sewa Mobil Premium",
  description: "Website rental mobil premium dengan koleksi mobil terbaik dan layanan berkualitas tinggi",
};



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="scroll-smooth">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className="min-h-screen font-merriweather text-base bg-secondary-50 text-secondary-900 antialiased">
        <LenisProvider>
          {children}
        </LenisProvider>

      </body>
    </html>
  );
}
