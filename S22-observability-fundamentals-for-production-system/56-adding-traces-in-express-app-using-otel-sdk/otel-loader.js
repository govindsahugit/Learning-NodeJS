import { register } from "node:module";
import { pathToFileURL } from "node:url";
register("@opentelemetry/instrumentation/hook.mjs", pathToFileURL("./"));
