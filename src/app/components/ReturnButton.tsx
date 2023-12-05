"use client";

import { useRouter } from "next/navigation";

type ReturnButtonProps = {
  standalone?: boolean;
};

const ReturnButton = ({ standalone }: ReturnButtonProps) => {
  const router = useRouter();

  const goBack = () => {
    router.back();
  };

  return (
    <div
      className={`m-2 ${
        standalone ? "absolute left-2 top-2" : ""
      } flex h-12 w-12 flex-row rounded-full bg-secondary-color text-primary-color hover:cursor-pointer hover:bg-secondary-color-hover max-sm:hidden`}
      onClick={goBack}
    >
      <svg
        className="m-auto h-6 w-6 text-primary-color"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 14 10"
      >
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M13 5H1m0 0 4 4M1 5l4-4"
        />
      </svg>
    </div>
  );
};

export default ReturnButton;
