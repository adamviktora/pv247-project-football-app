import { getServerAuthSession } from "@/server/auth";
import { redirect } from "next/navigation";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";

export default async function BasicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const status = await getServerAuthSession();
  if (!status) {
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
