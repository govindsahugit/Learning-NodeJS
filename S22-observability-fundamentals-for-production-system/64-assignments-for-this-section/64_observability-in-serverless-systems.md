# 🧠 Observability in Serverless Systems (Lambda)

In serverless systems like AWS Lambda, observability is fundamentally different from traditional servers.

```txt
No long-running process
No stable host
Execution is event-driven
Instances are ephemeral
```

Because of this, observability becomes:

```txt
Push / Export based (not scrape based)
Managed services play a big role
```

---

# 🧭 Two Ways to Implement Observability

## 1️⃣ AWS Native Observability (most common)

## Architecture

```txt
Lambda
  ↓
Logs → CloudWatch Logs
Metrics → CloudWatch Metrics
Traces → X-Ray
```

Using:

* Amazon CloudWatch
* AWS X-Ray

---

## 🔹 Logs

```txt
Lambda → console.log / Pino → CloudWatch Logs
```

* Automatically collected
* Stored in log groups:

  ```txt
  /aws/lambda/<function-name>
  ```

---

## 🔹 Metrics

Default metrics:

```txt
Invocations
Errors
Duration
Throttles
ConcurrentExecutions
```

Custom metrics:

* Embedded Metric Format (EMF)
* Powertools Metrics

---

## 🔹 Traces

Enable **Active Tracing**:

```txt
Lambda → X-Ray → Trace UI
```

* Shows spans, service map, latency
* Works with API Gateway, DynamoDB, etc.

---

## ✅ Pros

```txt
✔ Zero setup
✔ Fully managed
✔ Tight AWS integration
✔ Production ready
```

## ❌ Cons

```txt
✖ Vendor lock-in
✖ Limited flexibility
✖ Not consistent with non-AWS systems
✖ Less powerful querying than LGTM
✖ Not always free
```

---

# 2️⃣ LGTM Stack (less common, but more powerful and growing)

## Stack

* Grafana
* Loki
* Tempo
* Prometheus / Mimir
* Grafana Alloy

---

## 🧠 Key idea

```txt
Lambda → produces telemetry
Alloy → collects + transforms + forwards
LGTM → stores + queries + visualizes
```

---

# 🔹 Logs in LGTM

## Flow

```txt
Lambda (Pino logs)
  ↓
CloudWatch Logs
  ↓
Alloy (pulls logs using AWS API)
  ↓
Loki
  ↓
Grafana
```

## How Alloy gets logs

* Uses AWS credentials (IAM role)
* Reads log groups like:

  ```txt
  /aws/lambda/storageApp
  ```

---

# 🔹 Metrics in LGTM

## ❗ Important correction

```txt
Lambda DOES NOT expose /metrics endpoint
```

---

## Flow (recommended)

```txt
Lambda
  ↓
CloudWatch Metrics (default + custom)
  ↓
Alloy (cloudwatch exporter)
  ↓
Prometheus / Mimir
  ↓
Grafana
```

Alloy component:

```txt
prometheus.exporter.cloudwatch
```

👉 Converts CloudWatch → Prometheus format

---

## Alternative (advanced)

```txt
Lambda → OpenTelemetry metrics → Alloy → Mimir
```

---

# 🔹 Traces in LGTM
---

## ❗ Important reality

```txt
CloudWatch/X-Ray traces are NOT easily "pullable" like logs/metrics
```

So:

```txt
Alloy CANNOT just pull traces from X-Ray like logs
```

---

## ✅ Correct way to send traces to Tempo

You must **instrument Lambda with OpenTelemetry**.

---

## Flow

```txt
Lambda
  ↓
OpenTelemetry SDK / ADOT Layer
  ↓
OTLP export
  ↓
Alloy (OTLP receiver)
  ↓
Tempo
  ↓
Grafana
```

---

## 🔹 What to use

Use:

* AWS Distro for OpenTelemetry (ADOT Lambda Layer)

This enables:

```txt
Auto instrumentation
Trace creation
Export to OTLP endpoint
```

---

## ❗ Key difference

| Signal  | Can Alloy pull from CloudWatch? |
| ------- | ------------------------------- |
| Logs    | ✅ Yes                           |
| Metrics | ✅ Yes                           |
| Traces  | ❌ No                            |

---

## 🔥 Why traces are different

```txt
Logs/Metrics → stored in CloudWatch (queryable API)

Traces → stored in X-Ray in a different format/system
```

So:

```txt
You must export traces BEFORE they reach X-Ray
```

---

# 🧱 Final LGTM Architecture (Correct)

```txt
Logs:
Lambda → CloudWatch Logs → Alloy → Loki

Metrics:
Lambda → CloudWatch Metrics → Alloy → Mimir

Traces:
Lambda → OpenTelemetry → Alloy → Tempo
```

---

# 🧠 What Alloy actually does

```txt
✔ Pull logs from CloudWatch
✔ Pull metrics from CloudWatch
✔ Receive traces via OTLP
✔ Convert formats
✔ Forward to LGTM backends
```

---

# ⚠️ Where Alloy runs

```txt
EC2 / ECS / Kubernetes
NOT inside Lambda
```

---

# 🧠 Final Comparison

## AWS Native

```txt
Logs    → CloudWatch Logs
Metrics → CloudWatch
Traces  → X-Ray
```

## LGTM

```txt
Logs    → Loki
Metrics → Prometheus/Mimir
Traces  → Tempo
```