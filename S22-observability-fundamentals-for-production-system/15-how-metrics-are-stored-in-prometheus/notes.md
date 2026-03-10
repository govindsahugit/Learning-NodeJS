# How Metrics Are Stored in Prometheus

## 1. Time Series Database (TSDB)

Prometheus uses a custom-built **Time Series Database (TSDB)** instead of traditional relational databases like MySQL.

### Core Concepts

- **Time Series Data**: Data stored as a stream of timestamped values
- **Unique Identifier**: Each series identified by `metricName + labels + type + timestamp `
  - Example: `http_requests_total{method="POST", status="200"}`
- **Data Point**: Each sample contains a `float64` value and millisecond-precision timestamp

## 2. Storage Architecture

### In-Memory (Head Block)

Most recent data kept in memory for fast writes and queries.

### WAL (Write-Ahead Log)

Disk-based log prevents data loss on server crashes by recording metrics before adding to memory.

### Disk Blocks (Persistent Storage)

- Every 2 hours, Prometheus persists memory data to disk as blocks
- Each block contains:
  - **Chunks**: Raw metric data
  - **Index**: Fast searching capability
  - **Metadata**: Block information

### Compaction

Background process merges smaller 2-hour blocks into larger long-term blocks for space savings and query optimization.

## 3. Efficiency & Compression

### Delta-of-Delta Encoding

Prometheus stores only the difference between consecutive samples since metric values change predictably.

**Result**: ~1-2 bytes per sample on average

## 4. The Cardinality Trap ⚠️

### Problem

High-cardinality labels (e.g., `user_id`, `request_id`) create millions of unique time series, causing:

- Index bloat
- RAM exhaustion
- Server crashes

### Solution

Use **low-cardinality labels** with fixed, small sets of values:

- ✅ `environment="prod"`
- ✅ `region="us-east"`
- ✅ `service="api"`
- ❌ `user_id` (millions of unique values)
