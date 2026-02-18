export type ApiEnvelope<T> = {
  success?: boolean;
  data?: T;
  error?: string;
  message?: string;
};

export type PrimitiveBody = BodyInit | null | undefined;
export type JsonBody =
  | Record<string, unknown>
  | unknown[]
  | string
  | number
  | boolean;

export type RequestOptions = Omit<RequestInit, "body"> & {
  body?: PrimitiveBody | JsonBody;
  unwrapData?: boolean;
};

export class HttpError extends Error {
  status: number;
  payload?: unknown;

  constructor(status: number, message: string, payload?: unknown) {
    super(message);
    this.name = "HttpError";
    this.status = status;
    this.payload = payload;
  }
}
