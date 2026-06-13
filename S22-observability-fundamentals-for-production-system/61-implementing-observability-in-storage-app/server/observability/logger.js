import pino from "pino";
import { pinoHttp } from "pino-http";

export const logger = pino({
  transport: {
    targets: [
      {
        target: "pino/file",
        options: {
          destination:
            "F:\\Web Development\\BACKEND DEVELOPMENT\\logs\\storageApp\\app.log",
          mkdir: true,
          colorize: false,
          translateTime: "SYS:dd-mm-yyyy HH:MM:ss",
        },
      },
    ],
  },
});

export const pinoHttpMiddleware = pinoHttp({
  logger,
  customLogLevel: (req, res, err) => {
    if (err || res.statusCode >= 500) return "error";
    else if (res.statusCode >= 400) return "warn";
    else return "info";
  },
  autoLogging: {
    ignore: (req) => {
      return req.path === "/metrics" || req.method === "OPTIONS";
    },
  },
});
