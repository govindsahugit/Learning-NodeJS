# 🧠 Log Rotation & Log Retention

## 🔷 1. One Simple Mental Model (Only 2 Layers)

```text
[ Local Log Files ]  →  [ Loki (stored in S3) ]
```

* 🧾 **Local log files** → where your app writes logs
* ☁️ **Loki (with S3)** → where logs are stored, searched, and retained

---

## 🔄 2. What is Log Rotation?

Log rotation means:

👉 **breaking one growing log file into smaller files over time**

Instead of:

```text
app.log (grows forever ❌)
```

You get:

```text
app.log
app.log.1
app.log.2
```

### 🎯 Why log rotation is necessary

Without rotation:

* ❌ disk fills up
* ❌ files become huge and slow
* ❌ log shipping becomes unreliable
* ❌ risk of crashes

With rotation:

* ✅ controlled file size
* ✅ stable system
* ✅ smooth log shipping to Loki

---

## ⚙️ 3. Types of Log Rotation

### 📅 1. Time-Based Rotation

Rotate logs based on time:

* daily 🗓️
* weekly 📆
* hourly ⏱️

Example:

```text
app.log → app.log.2026-04-16
```

👉 Use when:

* traffic is predictable
* you want clean date-wise logs

---

### 📦 2. Size-Based Rotation

Rotate when file reaches a size:

* 10MB / 100MB / 1GB

Example:

```text
app.log → app.log.1 (after size limit)
```

👉 Use when:

* traffic is unpredictable
* logs can grow suddenly

✅ This is the **safest default**

---

### 🔁 3. Hybrid Rotation (Best Practice)

Combine both:

👉 rotate daily **or** when size exceeds limit

Why this is best:

* time keeps logs organized
* size prevents huge files

---

## 🔄 4. Rotation Strategy

How rotation is done matters more than when.

### ✅ Correct Strategy

👉 **Rename old file + create new file**

```text
app.log → app.log.1
new app.log created
```

Why:

* log collectors (like Alloy/Loki agents) continue smoothly
* no data loss

---

### ❌ Wrong Strategy

👉 copy + truncate (empty)

Problem:

* logs can be lost during rotation
* collectors may miss data

---

## 📂 5. Naming Best Practices

Keep naming simple and predictable.

### ✅ Good patterns

```text
app.log
app.log.1
app.log.2
```

OR

```text
app.log.2026-04-16
```

### ❌ Avoid

* random names
* changing active filename
* complex folder structures

### 🎯 Golden rule

👉 **Active file name must always stay the same**

```text
always → app.log
```

---

## 🧹 6. Local Retention (for rotated files)

👉 **how many rotated files you keep locally**

### Examples

* keep last 3 files
* keep last 2 days of logs

### Purpose

* temporary backup
* safety if Loki is down

### Not for

* long-term storage ❌

---

## 🛠️ 7. Log Rotation Utility

A popular tool for rotation is:

👉 logrotate

### What it allows you to define

You create **policies**, not code:

* rotate daily or weekly
* rotate when size exceeds limit
* keep fixed number of old files
* delete older logs automatically

### Key idea

👉 You define **when to rotate** and **how long to keep logs**

---

## 🧊 8. Retention in Loki (Final Storage Layer)

👉 Loki stores logs in S3

### What is retention?

👉 **how long logs stay in Loki**

### Example policies

* 7 days
* 30 days ✅ (common)
* 90 days

### Why retention is needed

* ❌ storage keeps growing
* ❌ cost increases

### How it works

* Loki automatically deletes old logs
* deletion happens in background

---

## ☁️ 9. Loki + S3 Storage

👉 Logs are stored in S3 (cloud storage)

### Why this is useful

* ✅ scalable
* ✅ durable
* ✅ cost-efficient

---

## 🏁 Final Summary

### 🔹 Local Layer

* rotation prevents disk issues
* keep only short-term logs

### 🔹 Loki Layer

* stores logs long-term
* retention controls cost

---

## 🚀 Best Practice Setup

* use **hybrid rotation (time + size)**
* use **rename strategy**
* keep **simple file names**
* keep **few local files only**
* set **Loki retention (like 30 days)**