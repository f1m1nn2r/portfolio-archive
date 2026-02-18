import { JsonBody, PrimitiveBody, RequestOptions } from "./types";

function isJsonLike(value: unknown): value is JsonBody {
  if (value === null || value === undefined) return false;
  if (typeof value === "object") return true;
  return ["string", "number", "boolean"].includes(typeof value);
}

export function toRequestInit(options: RequestOptions = {}): RequestInit {
  const { body, headers, ...rest } = options;
  const nextHeaders = new Headers(headers || {});
  let requestBody: PrimitiveBody = body as PrimitiveBody;

  if (
    isJsonLike(body) &&
    !(body instanceof FormData) &&
    !(body instanceof URLSearchParams)
  ) {
    if (!nextHeaders.has("Content-Type")) {
      nextHeaders.set("Content-Type", "application/json");
    }
    requestBody = JSON.stringify(body);
  }

  return {
    ...rest,
    headers: nextHeaders,
    body: requestBody,
  };
}
