import pino from "pino";

const logger = pino();

logger.info("Hello, world!");

logger.info({ message: "Hello, world!" });
