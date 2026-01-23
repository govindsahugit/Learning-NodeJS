# AWS Lambda & API Gateway Pricing Guide

## AWS Lambda Pricing

### Free Tier

- **1 million free requests per month**
- **400,000 GB-seconds of compute time per month**
- Free tier does not expire after 12 months

### Request Pricing

- **$0.20 per 1 million requests** ($0.0000002 per request)
- A request is counted each time it starts executing in response to an event or invoke call

### Duration Pricing

Duration is calculated from the time your code begins executing until it returns or terminates, rounded up to the nearest 1ms.

**Price depends on the amount of memory allocated:**

| Memory (MB) | Price per 1ms |
| ----------- | ------------- |
| 128 MB      | $0.0000000021 |
| 512 MB      | $0.0000000083 |
| 1024 MB     | $0.0000166667 |
| 1536 MB     | $0.0000250000 |
| 3008 MB     | $0.0000490667 |
| 10240 MB    | $0.0001666667 |

**Formula:** Price = Memory (GB) × Duration (seconds) × $0.0000166667

### Example Calculation

**Scenario:** 3 million invocations per month, 512 MB memory, 200ms average duration

1. **Request Charges:**
   - 3,000,000 requests - 1,000,000 (free tier) = 2,000,000 billable requests
   - 2,000,000 × $0.0000002 = **$0.40**

2. **Duration Charges:**
   - Total compute: 3,000,000 × 0.2s = 600,000 seconds
   - GB-seconds: 600,000 × 0.5 GB = 300,000 GB-seconds
   - Billable: 300,000 - 400,000 (free tier) = 0 (covered by free tier)
   - **$0.00**

**Total Monthly Cost: $0.40**

### Lambda@Edge Pricing

- **$0.60 per 1 million requests**
- **$0.00005001 per GB-second** (varies by region)

### Provisioned Concurrency

- **$0.0000041667 per GB-second** for provisioned concurrency
- Plus standard request and duration charges when invoked

---

## AWS API Gateway Pricing

### REST API Pricing

#### Request Pricing (per million requests)

| Request Volume    | Price |
| ----------------- | ----- |
| First 333 million | $3.50 |
| Next 667 million  | $2.80 |
| Next 19 billion   | $2.38 |
| Over 20 billion   | $1.51 |

#### Free Tier

- **1 million API calls per month** for 12 months (for new AWS customers)

#### Data Transfer Out

- **$0.09 per GB** for the first 10 TB
- Decreases with volume (same as standard AWS data transfer pricing)

#### Caching (Optional)

| Cache Size | Price per Hour |
| ---------- | -------------- |
| 0.5 GB     | $0.020         |
| 1.6 GB     | $0.038         |
| 6.1 GB     | $0.200         |
| 13.5 GB    | $0.250         |
| 28.4 GB    | $0.500         |
| 58.2 GB    | $1.000         |
| 118 GB     | $1.900         |
| 237 GB     | $3.800         |

### HTTP API Pricing

#### Request Pricing

- **$1.00 per million requests** (first 300 million)
- **$0.90 per million requests** (over 300 million)

#### Free Tier

- **1 million API calls per month** for 12 months

### WebSocket API Pricing

#### Connection Minutes

- **$0.25 per million connection minutes**

#### Messages

- **$1.00 per million messages** (first 1 billion)
- **$0.80 per million messages** (over 1 billion)

---

## Example Cost Scenarios

### Scenario 1: Small Application

- 500,000 API requests/month
- 500,000 Lambda invocations (256MB, 100ms avg)

**API Gateway (REST):** Free (within free tier)  
**Lambda:** Free (within free tier)  
**Total: $0.00**

### Scenario 2: Medium Application

- 10 million API requests/month (HTTP API)
- 10 million Lambda invocations (512MB, 200ms avg)

**API Gateway:** (10M - 1M) × $1.00/1M = **$9.00**  
**Lambda:**

- Requests: (10M - 1M) × $0.20/1M = **$1.80**
- Duration: 10M × 0.2s × 0.5GB = 1,000,000 GB-s - 400,000 = 600,000 billable
- 600,000 × $0.0000166667 = **$10.00**

**Total: $20.80/month**

### Scenario 3: Large Application

- 100 million API requests/month (REST)
- 100 million Lambda invocations (1024MB, 300ms avg)

**API Gateway:** 100M × $3.50/1M = **$350.00**  
**Lambda:**

- Requests: 100M × $0.20/1M = **$20.00**
- Duration: 100M × 0.3s × 1GB = 30,000,000 GB-s
- 30,000,000 × $0.0000166667 = **$500.00**

**Total: $870.00/month**

---

## Cost Optimization Tips

### Lambda Optimization

1. **Right-size memory allocation** - Higher memory also means more CPU, which can reduce duration
2. **Optimize cold starts** - Use provisioned concurrency for latency-sensitive workloads
3. **Use ARM/Graviton2** - Up to 34% better price performance
4. **Set appropriate timeouts** - Avoid paying for functions that hang
5. **Minimize dependencies** - Faster initialization and execution

### API Gateway Optimization

1. **Choose HTTP API over REST API** when possible - 71% cheaper
2. **Enable caching** - Reduce backend calls for frequently accessed data
3. **Use CloudFront** - Cache at edge locations for static content
4. **Implement throttling** - Protect against unexpected cost spikes
5. **Monitor and set alarms** - Track usage patterns and set billing alerts

---

## Additional Costs to Consider

- **CloudWatch Logs**: $0.50 per GB ingested
- **CloudWatch Metrics**: First 10 custom metrics free, then $0.30/metric/month
- **X-Ray Tracing**: $5.00 per 1 million traces recorded
- **VPC NAT Gateway**: $0.045 per hour + $0.045 per GB processed (if Lambda uses VPC)
- **Data Transfer**: Varies by region and volume

---

_Prices are in USD and based on US East (N. Virginia) region. Pricing may vary by region and is subject to change. Always check the official AWS pricing pages for the most current information._
