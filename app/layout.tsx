import type { Metadata } from "next";
import { Urbanist } from "next/font/google";
import Footer from "@/components/footer";

import "./globals.css";
import ModalProvider from "@/providers/modalProvider";
import { ToastProvider } from "@/providers/toastProvider";

const font = Urbanist({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Market place",
  description: "Ecommerce Marketplace",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={font.className}>
        <ModalProvider />
        <ToastProvider />
        {children}
        <Footer />
      </body>
    </html>
  );
}
