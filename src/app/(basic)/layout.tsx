import Link from "next/link";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";

export default function BasicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main className="mb-auto">{children}</main>
      <Footer />
    </>
  );
}
