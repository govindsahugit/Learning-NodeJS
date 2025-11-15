# What is a CDN?

A Content Delivery Network (CDN) is a globally distributed network of edge servers that cache and deliver web content (HTML, CSS, JS, images, video, APIs, files) to users from the edge location closest to them. CDNs reduce load on your origin (e.g., S3, EC2, or custom servers) and improve performance, reliability, and security.

# How a CDN works

1. User requests content

   - A user (e.g., in New York) requests an asset like image.png.

2. DNS routes to nearest edge server

   - The request is resolved to a nearby CDN edge location.

3. Edge checks its cache

   - Cache hit: edge serves the cached content immediately.
   - Cache miss: edge fetches the content from the origin, stores it at the edge, then serves the user.

4. Subsequent requests
   - Other nearby users receive the cached copy from the edge until that cache entry expires or is invalidated.

# Benefits of using a CDN

- Low latency — content served from geographically close edge servers.
- Scalability — handles traffic spikes without overloading your origin.
- Reliability — requests fail over to other edges if one is down.
- Security — integrates with WAF, SSL/TLS, and DDoS protections (e.g., CloudFront features).
- Cost reduction — fewer direct origin requests, lowering bandwidth and request charges.
