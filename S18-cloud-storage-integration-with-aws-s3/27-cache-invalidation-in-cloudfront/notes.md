# Cache Invalidation

## Overview
Cache invalidation in AWS CloudFront removes specific objects from edge caches before their TTL expires, forcing CloudFront to fetch fresh content from the origin.

## Why It's Needed
- CloudFront caches content (HTML, CSS, JS, images, etc.) at edge locations for faster delivery
- Each cached object has a Time-to-Live (TTL) set via response headers (Cache-Control/Expires) or CloudFront behaviors
- When you update files on your origin (S3, EC2, etc.), CloudFront continues serving old cached versions until TTL expires
- Invalidation forces CloudFront to fetch the latest version from origin

## How It Works
1. Create an invalidation request in CloudFront
2. Specify path(s) to invalidate:
    - `/index.html` — clears just the homepage
    - `/images/*` — clears everything under `/images/`
    - `/*` — clears the entire distribution (most expensive)
3. Next request to invalidated objects fetches from origin and re-caches

## Pricing
- First 1,000 paths per month: **Free**
- Additional paths: Pay per invalidation path
- `/*` wildcard counts as 1 path regardless of file count
