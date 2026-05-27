# 🧠 1. Stream Selector (labels)

This is always the entry point.

```logql
{app="express-app"}
```

### 🔑 Operators

- `=` → equal
- `!=` → not equal
- `=~` → regex match
- `!~` → regex NOT match

### ✅ Example

```logql
{app="express-app", env!="dev"}
{app=~"api|backend"}
```

---

# 🔍 2. Parse JSON

```logql
{app="express-app"} | json
```

👉 Without this, you **cannot access fields like `req.method`**

## 🔗 Pipeline Operator `|`

The `|` operator **passes the output of one step to the next**. Just like Linux pipes.

```
{app="express-app"} → logs → | json → parsed logs → | filter → filtered logs
```

### ✅ Example

```logql
{app="express-app"} | json | method="GET"
```

👉 Flow:

1. `{app="express-app"}` → select logs
2. `| json` → parse logs
3. `| method="GET"` → filter logs

⚠️ Order matters. You cannot use fields before parsing.

---

# 🧠 3. Nested fields

JSON:

```json
"req": {
  "method": "GET",
  "url": "/posts"
}
```

After parsing:

| JSON             | LogQL            |
| ---------------- | ---------------- |
| `req.method`     | `req_method`     |
| `req.url`        | `req_url`        |
| `res.statusCode` | `res_statusCode` |

👉 Rule:

```
dot (.) → underscore (_)
```

---

# 🎯 4. Filter parsed fields

After `| json`, you can filter like this:

### 🔑 Operators

- `=` → equal
- `!=` → not equal
- `>` `<` `>=` `<=` → numeric comparison

### ✅ Example

```logql
{app="express-app"}
| json
| req_method="GET"
```

```logql
{app="express-app"}
| json
| res_statusCode >= 500
```

---

# 🔎 5. Line filters (before or after parsing)

These work on **raw log text**, not fields.

### 🔑 Operators

- `|=` → contains
- `!=` → does NOT contain
- `|~` → regex match
- `!~` → regex NOT match

### ✅ Example

```logql
{app="express-app"} |= "error"
```

```logql
{app="express-app"} !~ "health|metrics"
```

---

# 🔗 6. Combine filters (real usage)

You can chain everything:

```logql
{app="express-app"}
| json
| req_method="GET"
| res_statusCode=200
```

👉 This is how real queries are written.

---

# 🎨 7. Format output

### `line_format`

```logql
{app="express-app"}
| json
| line_format "method={{.req_method}} path={{.req_url}} status={{.res_statusCode}}"
```

```logql
{app="express-app"}
| json
| line_format "method={{.req_method}} path={{.req_url}}{{if .res_statusCode}} status={{.res_statusCode}}{{end}}"
```

👉 Makes logs readable in Grafana.

---

# 🏷️ 8. Create derived fields

```logql
{app="express-app"}
| json
| line_format "endpoint={{.req_method}} {{.req_url}}"
```