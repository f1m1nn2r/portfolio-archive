import { ApiEnvelope } from "./types";

export async function parseResponseBody(res: Response): Promise<unknown> {
  const contentType = res.headers.get("content-type") || "";
  if (contentType.includes("application/json")) {
    return res.json();
  }
  return res.text();
}

export function readEnvelopeMessage(payload: unknown) {
  if (!payload || typeof payload !== "object") return null;
  const maybeEnvelope = payload as ApiEnvelope<unknown>;
  return maybeEnvelope.error || maybeEnvelope.message || null;
}

export function unwrapEnvelope<T>(payload: unknown): T {
  if (!payload || typeof payload !== "object") {
    return payload as T;
  }

  const maybeEnvelope = payload as ApiEnvelope<T>;
  if ("data" in maybeEnvelope) {
    return maybeEnvelope.data as T;
  }
  return payload as T;
}
