"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export function useRouteContext() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return mounted ? pathname : "/";
}