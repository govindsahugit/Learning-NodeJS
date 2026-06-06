# 🧠 Two types of queries in LogQL

## 🔍 1. Log Queries

👉 Return **actual log lines**

```logql
{app="express-app"} | json | req_method="GET"
```

👉 Output = logs

---

## 📊 2. Metric Queries

👉 Return **numbers / time series (like Prometheus)**  
👉 Derived from logs

```logql
count_over_time({app="express-app"}[5m])
```

👉 Output = numeric data (for graphs, alerts)

---

# 🔑 Core Idea of Metric Queries

```text
Logs → filtered logs → apply function over time → numbers
```

---

# 🧠 2. Range selector `[5m]`

You’ll see this everywhere:

```logql
[5m]
```

👉 Means:

```text
“Look at logs in the last 5 minutes”
```

---

# ⚙️ 3. Important metric functions (focused only)

---

## 1️⃣ `count_over_time` (most important)

👉 Counts number of log entries

### ✅ Example: total requests

```logql
count_over_time({app="express-app"}[5m])
```

---

### ✅ Example: only GET requests

```logql
count_over_time(
  {app="express-app"} 
  | json 
  | req_method="GET" [5m]
)
```

---

## 2️⃣ `rate` (logs per second)

👉 How fast logs are coming

```logql
rate({app="express-app"}[1m])
```

---

### ✅ Example: error rate

```logql
rate(
  {app="express-app"} 
  | json 
  | res_statusCode >= 500 [1m]
)
```

---

## 3️⃣ `sum by (...)` (grouping)

👉 Group results by a field

### ✅ Example: requests per endpoint

```logql
sum by (req_url) (
  count_over_time(
    {app="express-app"} 
    | json [5m]
  )
)
```

---

### ✅ Example: errors per endpoint

```logql
sum by (req_url) (
  count_over_time(
    {app="express-app"} 
    | json 
    | res_statusCode >= 500 [5m]
  )
)
```

---

# 🔥 4. `unwrap` (VERY IMPORTANT)

👉 Extract numeric field from logs

Your log has:

```json
"responseTime": 305
```

---

### ✅ Use it:

```logql
{app="express-app"} 
| json 
| unwrap responseTime [5m]
```

👉 Now Loki treats `responseTime` as a metric

---

## 4️⃣ `avg_over_time`

👉 Average response time

```logql
avg_over_time(
  {app="express-app"} 
  | json 
  | unwrap responseTime [5m]
)
```

---

## 5️⃣ `max_over_time`

👉 Slowest request

```logql
max_over_time(
  {app="express-app"} 
  | json 
  | unwrap responseTime [5m]
)
```

---

## 6️⃣ `quantile_over_time` (p95, p99)

👉 Latency percentiles

### ✅ Example: p95 latency

```logql
quantile_over_time(
  0.95,
  {app="express-app"} 
  | json 
  | unwrap responseTime [5m]
)
```

---

# 🎯 5. Combine everything (real-world)

### ✅ Requests per endpoint

```logql
sum by (req_url) (
  count_over_time(
    {app="express-app"} 
    | json [5m]
  )
)
```

---

### ✅ p95 latency per endpoint

```logql
quantile_over_time(
  0.95,
  {app="express-app"} 
  | json 
  | unwrap responseTime [5m]
)
```

---

### ✅ Error count

```logql
count_over_time(
  {app="express-app"} 
  | json 
  | res_statusCode >= 500 [5m]
)
```

---

# ⚠️ Important rules

---

## 1. Metric query always needs `[time range]`

```logql
count_over_time({app="express-app"}) ❌
count_over_time({app="express-app"}[5m]) ✅
```

---

## 2. Pipeline still works the same

```text
select → filter → parse → filter → metric function
```

---

## 3. `unwrap` required for numeric fields

Without it:

```logql
avg_over_time({app="express-app"} | json [5m]) ❌
```

With it:

```logql
avg_over_time({app="express-app"} | json | unwrap responseTime [5m]) ✅
```

---

# 🧠 Final mental model

```text
Log Query    → returns logs
Metric Query → returns numbers from logs
```

---

# 🔥 One-line summary

```text
Metric queries convert logs into time-based numerical insights using functions like count, rate, avg, and quantile
```
