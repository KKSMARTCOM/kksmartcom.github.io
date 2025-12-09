"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function GtmRouteTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Push a page_view event to the dataLayer on initial load and on route changes
    const url = typeof window !== "undefined" ? window.location.pathname + window.location.search : pathname;
    const title = typeof document !== "undefined" ? document.title : "";

    // Ensure dataLayer exists
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "page_view",
      page_path: url,
      page_title: title,
    });
  }, [pathname, searchParams]);

  return null;
}