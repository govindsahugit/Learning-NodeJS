import express from "express";
import helmet from "helmet";

const app = express();
const PORT = 4000;

app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        scriptSrc: ["'self'", (req, res) => `'nonce-${res.locals.cspNonce}'`],
      },
    },
    crossOriginEmbedderPolicy: false,
  })
);

app.get("/", (req, res) => {
  res.send("<h1>Hello World!</h1>\n");
});

app.listen(PORT, () => {
  console.log(`🚀 Visit http://localhost:${PORT}`);
});
