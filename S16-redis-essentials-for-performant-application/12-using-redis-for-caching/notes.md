# Redis Caching

## What
Store API responses in Redis to serve repeated requests faster.

## Why
Redis is fast (in-memory), supports TTL, and reduces DB load.

## How
1. Check Redis for cached data
2. If found → return it
3. If not → fetch from DB, store in Redis, then return

## Key Features
- Use unique cache keys (e.g., `user:123`)
- Set expiration (TTL)
- Invalidate cache when data changes

## Example
```javascript
const cached = await client.get("key");
if (cached) return JSON.parse(cached);
// else fetch from DB and cache it
```