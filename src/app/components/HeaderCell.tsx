"use client";

import { useMediaQuery } from "usehooks-ts";

const HeaderCell = ({
  text,
  textMobile = text,
}: {
  text: string;
  textMobile?: string;
}) => {
  const isMobile = !useMediaQuery("(min-width: 768px)");

  return (
    <th className="px-1 text-center md:px-2 xl:px-6">
      {isMobile ? textMobile || text : text}
    </th>
  );
};

export default HeaderCell;
