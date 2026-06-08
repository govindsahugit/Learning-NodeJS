import pino from "pino";

export const logger = pino({
  transport: {
    targets: [
      {
        target: "pino/file",
        options: {
          destination: "./logs/app.log",
          mkdir: true,
          colorize: false,
          translateTime: "SYS:dd-mm-yyyy HH:MM:ss",
        },
      },
    ],
  },
});
