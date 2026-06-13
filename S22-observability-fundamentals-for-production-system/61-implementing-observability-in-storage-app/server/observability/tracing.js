import { NodeSDK } from "@opentelemetry/sdk-node";
import { getNodeAutoInstrumentations } from "@opentelemetry/auto-instrumentations-node";
import { OTLPTraceExporter } from "@opentelemetry/exporter-trace-otlp-http";

const sdk = new NodeSDK({
  traceExporter: new OTLPTraceExporter(),
  instrumentations: [
    getNodeAutoInstrumentations({
      "@opentelemetry/instrumentation-dns": {
        enabled: false,
      },
      "@opentelemetry/instrumentation-net": {
        enabled: false,
      },
      "@opentelemetry/instrumentation-redis": {
        enabled: true,
      },
      "@opentelemetry/instrumentation-http": {
        ignoreIncomingRequestHook: (req) => {
          if (req.url?.startsWith("/metrics") || req.method === "OPTIONS")
            return true;
          return false;
        },
      },
    }),
  ],
});

sdk.start();
