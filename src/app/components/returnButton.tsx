"use client";

import Link from "next/link";

const ReturnButton = () => {
  return (
    <Link
      className="text-primary-color  rounded-full bg-secondary-color w-12 h-12 flex flex-row m-2"
      href="/"
    >
      <svg
        className="w-6 h-6 text-primary-color m-auto"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 14 10"
      >
        <path
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M13 5H1m0 0 4 4M1 5l4-4"
        />
      </svg>
    </Link>
  );
};

export default ReturnButton;
