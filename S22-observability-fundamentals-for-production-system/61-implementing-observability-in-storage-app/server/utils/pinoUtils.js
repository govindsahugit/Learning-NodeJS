import { pinoHttp } from "pino-http";
import { logger } from "../logger/logger.js";

export const pinoHttpMiddleware = pinoHttp({
  logger,
  customLogLevel: (req, res, err) => {
    if (err || res.statusCode >= 500) return "error";
    else if (res.statusCode >= 400) return "warn";
    else return "info";
  },
});
