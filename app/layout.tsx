
import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import "./globals.css";
// import Nav from "@/components/nav";

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap'
})

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap'
})

export const metadata: Metadata = {
  title: "Junker",
  description: "Compra y vende todos los repuestos que quieras.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${montserrat.variable} antialiased`}>
      <body>
        {/* <Nav /> */}
        {children}
      </body>
    </html>
  );
}