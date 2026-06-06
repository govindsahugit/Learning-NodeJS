In Grafana Alloy, **components are the building blocks of your configuration**.
Each component does one specific job, and you connect them together to form a pipeline.

---

# 🧠 Simple mental model

Think of Alloy like a pipeline:

```
[Component] → [Component] → [Component]
```

Each component:

* receives data
* processes it (or not)
* forwards it to the next component

---

# 🔧 What exactly is a component?

A **component is a configured unit of functionality**.

In your config:

```alloy
loki.source.file "app_log" { ... }
loki.process "pino_pipeline" { ... }
loki.write "local_loki" { ... }
```

Each of these is a **component**.

---

# 🧩 Structure of a component

```alloy
<type> "<name>" {
  // configuration
}
```

Example:

```alloy
loki.source.file "app_log" {
  targets = [...]
}
```

* `loki.source.file` → component type
* `"app_log"` → component name (your identifier)

---

# 📦 Types of components (based on what they do)

## 1. Source components (data comes in)

They **produce data**

Examples:

* `loki.source.file` → reads log files
* `loki.source.api` → receives logs via HTTP
* `prometheus.scrape` → pulls metrics

Your example:

```alloy
loki.source.file → reads logs from file
```

---

## 2. Processing components (transform data)

They **modify or enrich data**

Example:

* `loki.process`

Inside it, you use stages like:

* `stage.json`
* `stage.timestamp`
* `stage.labels`

Your example:

```alloy
loki.process → parses Pino logs, sets timestamp, adds labels
```

---

## 3. Write / Export components (send data out)

They **send data to external systems**

Examples:

* `loki.write` → sends logs to Loki
* `prometheus.remote_write` → sends metrics

Your example:

```alloy
loki.write → sends logs to Loki
```

---

## 4. Utility / system components

They control Alloy itself:

* `logging` → Alloy internal logs
* `tracing`
* `http` (debug endpoints)

---

# 🔗 How components connect

They connect using:

```alloy
forward_to = [<component>.receiver]
```

Your flow:

```text
loki.source.file
  → loki.process
    → loki.write
```

In config:

```alloy
forward_to = [loki.process.pino_pipeline.receiver]
```

and then:

```alloy
forward_to = [loki.write.local_loki.receiver]
```

---

# 📡 What is `.receiver`?

Each component exposes **interfaces**.

* `receiver` = input endpoint of a component

So:

```alloy
loki.process.pino_pipeline.receiver
```

means:

> “Send data into this component”

---

# 🔁 Full flow in your setup

```text
app.log file
→ loki.source.file (reads lines)
→ loki.process (parses + transforms)
→ loki.write (pushes to Loki)
```

Each box = one component

---

# 🧠 Key idea

Components are:

* independent
* composable
* connected via `forward_to`

You build pipelines by chaining them.

---

# ⚡ Important characteristics

### 1. Each component has a single responsibility

* read logs
* process logs
* send logs

---

### 2. Components don’t share state directly

They pass data through connections.

---

### 3. Order matters

Processing happens in the order you define.

---

### 4. Everything is explicit

Nothing happens automatically:

* parsing → you add `stage.json`
* timestamp → you add `stage.timestamp`
* labels → you add `stage.labels`

---

# 🎯 Analogy

Think of Alloy components like:

* `loki.source.file` → camera (captures raw data)
* `loki.process` → editor (cleans and formats)
* `loki.write` → uploader (sends to server)

---

# 🧩 One line summary

A **component in Alloy is a modular unit that either produces, transforms, or sends telemetry data, and you connect multiple components together to build a complete pipeline.**

---

If you want, next I can show you:

* all important Loki-related components in one place
* or how Alloy components map to OpenTelemetry concepts (receiver, processor, exporter) which makes everything even clearer
