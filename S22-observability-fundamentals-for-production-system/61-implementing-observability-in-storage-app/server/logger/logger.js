import pino from "pino";

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
