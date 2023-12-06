"use client";

import { useEffect, useState } from "react";

const HeaderCell = ({
  text,
  textMobile = text,
}: {
  text: string;
  textMobile?: string;
}) => {
  const [isMobile, setIsMobile] = useState(false);
  // Check if page is opened on mobile device (based on user agent).
  useEffect(() => {
    if (typeof window !== "undefined") {
      const mobileCheck =
        /iPhone|iPad|iPod|Android|BlackBerry|Windows Phone/i.test(
          navigator.userAgent,
        );
      setIsMobile(mobileCheck);
    }
  }, []);

  return (
    <th className="px-1 text-center md:px-2  xl:px-6">
      {isMobile ? textMobile || text : text}
    </th>
  );
};

export default HeaderCell;
