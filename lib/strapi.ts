import qs from "qs";

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";
const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN;

interface StrapiResponse<T> {
  data: T;
  meta?: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

interface StrapiError {
  error: {
    status: number;
    name: string;
    message: string;
  };
}

export function getStrapiUrl(path: string): string {
  return `${STRAPI_URL}${path}`;
}

export function getStrapiMedia(url: string | null): string | null {
  if (!url) return null;
  if (url.startsWith("http") || url.startsWith("//")) {
    return url;
  }
  return `${STRAPI_URL}${url}`;
}

export async function fetchAPI<T>(
  path: string,
  urlParamsObject: Record<string, unknown> = {},
  options: RequestInit = {}
): Promise<T> {
  const mergedOptions: RequestInit = {
    headers: {
      "Content-Type": "application/json",
      ...(STRAPI_TOKEN && { Authorization: `Bearer ${STRAPI_TOKEN}` }),
      ...options.headers,
    },
    ...options,
  };

  const queryString = qs.stringify(urlParamsObject, {
    encodeValuesOnly: true,
  });

  const requestUrl = `${getStrapiUrl(`/api${path}`)}${queryString ? `?${queryString}` : ""}`;

  try {
    const res = await fetch(requestUrl, mergedOptions);

    if (!res.ok) {
      const error = (await res.json()) as StrapiError;
      console.error("Strapi API Error:", error);
      throw new Error(error?.error?.message || "Failed to fetch data from Strapi");
    }

    const data = (await res.json()) as StrapiResponse<T>;
    return data.data;
  } catch (error) {
    console.error("Fetch API Error:", error);
    throw error;
  }
}

export function parseMarkdown(markdown: string): string {
  return markdown
    .replace(/^### (.*$)/gim, "<h3>$1</h3>")
    .replace(/^## (.*$)/gim, "<h2>$1</h2>")
    .replace(/^# (.*$)/gim, "<h1>$1</h1>")
    .replace(/\*\*(.*)\*\*/gim, "<strong>$1</strong>")
    .replace(/\*(.*)\*/gim, "<em>$1</em>")
    .replace(/\n/gim, "<br />");
}
