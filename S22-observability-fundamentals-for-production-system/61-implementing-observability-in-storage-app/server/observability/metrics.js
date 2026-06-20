import promClient from "prom-client";
import { trace } from "@opentelemetry/api";

// Exemplars only render in OpenMetrics exposition format
promClient.register.setContentType(
  promClient.Registry.OPENMETRICS_CONTENT_TYPE,
);

export const httpRequestTotal = new promClient.Counter({
  name: "http_requests_total",
  help: "Total http request count",
  labelNames: ["method", "path", "status"],
  enableExemplars: true,
});

export const httpRequestInFlight = new promClient.Gauge({
  name: "http_requests_in_flight",
  help: "Total http requests that are being processed currently",
  labelNames: ["method", "path"],
});

export const httpReqDuration = new promClient.Histogram({
  name: "http_request_duration_seconds",
  help: "HTTP request duration in seconds",
  buckets: [0.1, 0.2, 1, 2, 4, 6],
  labelNames: ["method", "path", "status"],
  enableExemplars: true,
});

promClient.collectDefaultMetrics();

// Pull trace context off the active span, if one exists
function getExemplarLabels() {
  const spanContext = trace.getActiveSpan()?.spanContext();
  if (!spanContext || !trace.isSpanContextValid(spanContext)) return undefined;
  return { traceId: spanContext.traceId, spanId: spanContext.spanId };
}

export const requestMetricsMiddleware = (req, res, next) => {
  const { method, path } = req;

  if (req.path === "/metrics" || req.method === "OPTIONS") return next();

  const endTimer = httpReqDuration.startTimer({ method, path });

  httpRequestInFlight.labels(method, path).inc();

  res.on("finish", () => {
    const exemplarLabels = getExemplarLabels();
    const status = res.statusCode;

    httpRequestTotal.inc({
      labels: { method, path, status },
      exemplarLabels,
    });

    httpRequestInFlight.labels(method, path).dec();

    endTimer({ status }, exemplarLabels);
  });

  req.on("aborted", () => {
    httpRequestInFlight.labels(method, path).dec();
    req.log.info(`[metrics:aborted] ${method} ${path}`);
  });

  next();
};

export const metricsHandler = async (req, res) => {
  try {
    const metrics = await promClient.register.metrics();
    res.set("Content-Type", promClient.register.contentType);
    res.end(metrics);
  } catch (error) {
    req.log.error("[metrics:export:error]", error?.stack || error);
    return res.status(500).json({ error: "Failed to export metrics" });
  }
};
