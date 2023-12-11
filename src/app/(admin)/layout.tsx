import Link from "next/link";
import { Footer } from "../components/Footer";
import { redirect } from "next/navigation";
import { getServerAuthSession } from "@/server/auth";
import { Header } from "../components/Header";

export default async function BasicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const status = await getServerAuthSession();
  if (!status) {
    // User unauthenticated, redirect to home
    redirect("/login");
  }

  return (
    <>
      <Header />
      <main className="mb-auto">{children}</main>
      <Footer />
    </>
  );
}
