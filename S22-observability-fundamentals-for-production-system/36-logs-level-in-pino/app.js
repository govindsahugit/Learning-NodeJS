import pino from "pino";

const logger = pino({
  level: process.env.LOG_LEVEL || "halkaFulka",
  customLevels: {
    khatam: 70,
    halkaFulka: 5,
  },
  formatters: {
    level: (level) => ({ level }),
  },
});

logger.trace("Trace");
logger.debug("Debug");
logger.info("Info");
logger.warn("Warn");
logger.error("Error");
logger.fatal("Fatal");
