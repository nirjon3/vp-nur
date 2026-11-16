import config from "@/payload.config";
import * as routes from "@payloadcms/next/routes";
import type { SanitizedConfig } from "payload";

type HandlerArgs = { params: Promise<{ slug?: string[] }> };
type Handler = (request: Request, args: HandlerArgs) => Promise<Response>;
type Factory = (c: Promise<SanitizedConfig>) => Handler;

// The published .d.ts for "@payloadcms/next/routes" omits the REST handler
// exports that the package re-exports at runtime. Shim them with local types.
const {
  REST_OPTIONS,
  REST_GET,
  REST_POST,
  REST_DELETE,
  REST_PATCH,
  REST_PUT,
} = routes as unknown as {
  REST_OPTIONS: Factory;
  REST_GET: Factory;
  REST_POST: Factory;
  REST_DELETE: Factory;
  REST_PATCH: Factory;
  REST_PUT: Factory;
};

export const OPTIONS = REST_OPTIONS(config);
export const GET = REST_GET(config);
export const POST = REST_POST(config);
export const DELETE = REST_DELETE(config);
export const PATCH = REST_PATCH(config);
export const PUT = REST_PUT(config);
