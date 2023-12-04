import Link from "next/link";
import { PropsWithChildren } from "react";

type LinkButtonProps = {
  href: string;
};

const LinkButton = ({ href, children }: PropsWithChildren<LinkButtonProps>) => (
  <Link
    className="btn btn-primary btn-sm my-auto px-8 py-1 text-white"
    href={href}
  >
    {children}
  </Link>
);

export default LinkButton;
