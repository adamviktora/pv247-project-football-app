import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
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
  // Replace with SeasonSelect component
  return (
    <html lang="en" data-theme="mytheme">
      <body className={inter.className}>
        <div className="flex h-screen flex-col justify-between">
          <header className="flex h-24 w-full items-center bg-primary-color text-white">
            <Link
              className="pl-8 text-3xl font-bold hover:text-gray-300"
              href="/"
            >
              Football Results
            </Link>
          </header>
          <main className="m-full mb-auto">{children}</main>
          <footer className="flex h-12 w-full flex-shrink-0 items-end justify-end space-x-12 bg-primary-color px-4 text-white">
            <Link
              className="btn btn-secondary btn-sm my-auto px-8 py-1"
              href="/login"
            >
              Admin
            </Link>
            <span className="my-auto">© 2023 Football Results</span>
          </footer>
        </div>
      </body>
    </html>
  );
}
