import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../../node_modules/flag-icons/css/flag-icons.min.css";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Football Results App",
  description: "Application for viewing and managing football results.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="mytheme">
      <body className={inter.className}>
        <div className="flex min-h-screen flex-col">{children}</div>
      </body>
    </html>
  );
}
