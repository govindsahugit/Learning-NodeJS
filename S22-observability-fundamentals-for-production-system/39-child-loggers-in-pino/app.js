import pino from "pino";

// const logger = pino({
//   transport: {
//     target: "pino/file",
//     options: {
//       destination: "app.log",
//       mkdir: true,
//     },
//   },
// });

const logger = pino({
  transport: {
    targets: [
      {
        target: "pino/file",
        options: {
          destination: "app.log",
          mkdir: true,
        },
      },
      {
        target: "pino-pretty",
        options: {
          destination: 1, // 1 is stdout
          // destination: "./pretty.log",
          colorize: false,
          // translateTime: "dd-mm-yyyy HH:MM:ss",
          translateTime: "SYS:dd-mm-yyyy HH:MM:ss",
        },
      },
    ],
  },
  redact: {
    paths: ["password", "address.zipcode", "address.street"],
    remove: true,
  },
});

const user = {
  id: 123,
  username: "John Doe",
  email: "john@example.com",
  password: "secret123",
  address: {
    street: "123 Main St",
    city: "New York",
    state: "NY",
    zipcode: "10001",
    country: "USA",
  },
};

const userLogger = logger.child(user);

userLogger.info();
