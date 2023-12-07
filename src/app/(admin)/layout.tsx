import Link from "next/link";

export default function BasicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <header className="flex h-24 items-center justify-between bg-black px-12 text-white">
        <Link className="text-3xl font-bold hover:text-gray-300" href="/">
          Football Results
        </Link>
        <span className="text-3xl font-semibold italic">Admin mode</span>
      </header>
      <main className="mb-auto">{children}</main>
      <footer className="flex h-12 w-full justify-end gap-12 bg-black px-4 text-white">
        <Link className="btn btn-secondary btn-sm my-auto px-8 py-1" href="/">
          Logout
        </Link>
        <span className="my-auto">© 2023 Football Results</span>
      </footer>
    </>
  );
}
