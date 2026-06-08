## 📦 OpenTelemetry Collector (OTel Collector)

👉 The **OpenTelemetry Collector** is a **standalone service (software)** used to **receive, process, and export telemetry data (traces, metrics, logs)**. It is similar to **Alloy**.

---

## ⚙️ What it does?

The Collector acts as a **central pipeline** for telemetry:

```text
App (OTel SDK) → OTel Collector → Backend (Tempo / Prometheus / Loki)
```

It can:

- **Receive data** from multiple sources (OTel SDKs, Prometheus, etc.)
- **Process data** (filtering, batching, sampling, enrichment)
- **Export data** to different backends

---

## 🔄 How it’s similar to Alloy

👉 The OTel Collector is conceptually similar to **Grafana Alloy**

| Feature            | OTel Collector | Alloy              |
| ------------------ | -------------- | ------------------ |
| Runs outside app   | ✅ Yes         | ✅ Yes             |
| Collects telemetry | ✅ Yes         | ✅ Yes             |
| Processes data     | ✅ Yes         | ✅ Yes             |
| Vendor-neutral     | ✅ Yes         | ⚠️ Grafana-focused |

👉 So you can think of it as:

**OTel Collector = vendor-neutral telemetry pipeline (like Alloy)**

---

## 📌 In our current setup

👉 We are **not using the OTel Collector right now**

👉 Instead, we use:

```text
Pino → Alloy → Loki
```

```text
App (OTel SDK) → Tempo
```

---

## 🔥 One-line summary

👉
**OTel Collector is a standalone telemetry pipeline service that sits between your app and observability backends, similar in role to Alloy but fully vendor-neutral.**
