"use client";

import { createContext, useContext } from "react";
import { CompanyInfo } from "@/types";
import { DEFAULT_COMPANY_INFO } from "@/lib/company-info";

const CompanyInfoContext = createContext<CompanyInfo>(DEFAULT_COMPANY_INFO);

export function useCompanyInfo(): CompanyInfo {
  return useContext(CompanyInfoContext);
}

export default function CompanyInfoProvider({
  value,
  children,
}: {
  value: CompanyInfo;
  children: React.ReactNode;
}) {
  return (
    <CompanyInfoContext.Provider value={value}>
      {children}
    </CompanyInfoContext.Provider>
  );
}
