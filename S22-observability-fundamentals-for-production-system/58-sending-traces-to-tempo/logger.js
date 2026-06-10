import pino from "pino";

const logger = pino({
  transport: {
    targets: [
      {
        target: "pino/file",
        options: {
          destination:
            "F:\\Web Development\\BACKEND DEVELOPMENT\\Backend Projects\\Obervability-App\\logs\\app.log",
          mkdir: true,
        },
      },
    ],
  },
});

export default logger;
