import { API_BASE_URL } from "@/services";

export function isAbsoluteUrl(url: string) {
  return /^https?:\/\//i.test(url);
}

export function joinUrl(base: string, path: string) {
  const normalizedBase = base.replace(/\/+$/, "");
  const normalizedPath = path.replace(/^\/+/, "");
  return `${normalizedBase}/${normalizedPath}`;
}

export function buildUrl(path: string) {
  if (!path) return path;
  if (isAbsoluteUrl(path)) return path;
  if (!API_BASE_URL) return path;
  if (!path.startsWith("/")) return path;
  return joinUrl(API_BASE_URL, path);
}
