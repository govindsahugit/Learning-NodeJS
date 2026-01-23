# How HTTP Reaches AWS Lambda

## 1. High-Level Architecture

The most common way to trigger a Lambda via HTTP is through **Amazon API Gateway** or an **Application Load Balancer (ALB)**.

## 2. The Step-by-Step Journey

### Phase 1: The Client Request
The process begins when a client (browser, mobile app, or curl) sends an HTTP request to a specific endpoint URL.

- **DNS Resolution**: The client resolves the domain name (e.g., `api.example.com`) to an AWS-managed IP address.
- **TLS Handshake**: A secure connection is established via HTTPS.

### Phase 2: The Entry Point (API Gateway / ALB)
Once the request hits AWS, a routing service intercepts it:

- **Validation**: The service checks for valid headers, query parameters, and authentication (like API Keys or Cognito tokens).
- **Payload Transformation**: The raw HTTP request is converted into a JSON event object. Lambda cannot read raw HTTP; it needs this structured JSON to understand the method, path, and body.

### Phase 3: The Lambda Service & Cold Starts
Before your code runs, the Lambda service performs several backend tasks:

- **Placement**: It finds a fleet of servers with available capacity.
- **Initialization (Cold Start)**: If no "warm" container exists, the service downloads your code package and starts a runtime environment (e.g., Node.js, Python).
- **Execution**: The JSON event is passed to your function's handler.

### Phase 4: Function Execution
Your code processes the data (e.g., saving to DynamoDB) and returns a JSON object back to the invoker.

## 3. Comparison of Entry Points

| Feature | API Gateway (REST/HTTP) | Application Load Balancer (ALB) |
|---------|-------------------------|----------------------------------|
| **Best For** | Complex APIs, Throttling, Auth | High-volume traffic, Web apps |
| **Timeout** | 29 seconds (Hard limit) | Up to 4,000 seconds |
| **Pricing** | Per request + Data transfer | Hourly rate + Capacity units |
| **Features** | Usage plans, API Keys, SDK Gen | Path-based routing, Target groups |

## 4. The Return Journey

- **Response Mapping**: The Lambda function returns a JSON object containing a `statusCode`, `headers`, and a `body`.
- **Conversion**: API Gateway/ALB converts this JSON back into a standard HTTP response.
- **Delivery**: The response is sent back over the established TLS connection to the client.

## Example: Lambda Proxy Integration Event

When using API Gateway, your function receives a structure like this:

```json
{
    "resource": "/user",
    "path": "/user/123",
    "httpMethod": "GET",
    "headers": { "Content-Type": "application/json" },
    "queryStringParameters": { "id": "123" },
    "body": "...",
    "isBase64Encoded": false
}
```

Would you like me to generate a Serverless Framework or AWS SAM template to deploy this architecture automatically?