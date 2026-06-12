import { CompanyInfo } from "@/types";
import { COMPANY_INFO } from "@/lib/constants";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5002";

export const DEFAULT_COMPANY_INFO: CompanyInfo = {
  ...COMPANY_INFO,
  emails: [COMPANY_INFO.email],
};

// Server-side fetch with ISR so edits in the admin appear within a minute
// without redeploying.
export async function getCompanyInfoServer(): Promise<CompanyInfo> {
  try {
    const res = await fetch(`${BACKEND_URL}/api/company`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return DEFAULT_COMPANY_INFO;
    const data = await res.json();
    const emails: string[] =
      Array.isArray(data.emails) && data.emails.length > 0
        ? data.emails
        : DEFAULT_COMPANY_INFO.emails;
    return {
      ...DEFAULT_COMPANY_INFO,
      phone: data.phone || DEFAULT_COMPANY_INFO.phone,
      phoneRaw: data.phoneRaw || DEFAULT_COMPANY_INFO.phoneRaw,
      whatsappMessage: data.whatsappMessage || DEFAULT_COMPANY_INFO.whatsappMessage,
      address: data.address || DEFAULT_COMPANY_INFO.address,
      emails,
      email: emails[0],
    };
  } catch {
    return DEFAULT_COMPANY_INFO;
  }
}
