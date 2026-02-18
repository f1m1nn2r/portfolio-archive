import { HttpError, RequestOptions } from "./types";
import { buildUrl } from "./url";
import { toRequestInit } from "./body";
import {
  parseResponseBody,
  readEnvelopeMessage,
  unwrapEnvelope,
} from "./response";

export async function request<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const { unwrapData = false, ...rest } = options;
  const res = await fetch(buildUrl(path), toRequestInit(rest));
  const payload = await parseResponseBody(res);

  if (!res.ok) {
    const message = readEnvelopeMessage(payload) || `Request failed (${res.status})`;
    throw new HttpError(res.status, message, payload);
  }

  if (unwrapData) {
    return unwrapEnvelope<T>(payload);
  }

  return payload as T;
}

export const http = {
  get: <T>(path: string, options: RequestOptions = {}) =>
    request<T>(path, { ...options, method: "GET" }),
  post: <T>(path: string, options: RequestOptions = {}) =>
    request<T>(path, { ...options, method: "POST" }),
  patch: <T>(path: string, options: RequestOptions = {}) =>
    request<T>(path, { ...options, method: "PATCH" }),
  delete: <T>(path: string, options: RequestOptions = {}) =>
    request<T>(path, { ...options, method: "DELETE" }),
};
