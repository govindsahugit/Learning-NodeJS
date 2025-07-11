# What Are Port Numbers?

Port numbers are numerical identifiers that help distinguish between different network services running on a device.

## Simple Explanation

When data arrives at a device (like your computer), the **IP address** directs it to the correct device, while the **port number** specifies which service or application should handle the data.

**Analogy:**
- **IP address** = Street address of a building
- **Port number** = Apartment number within the building

## Port Number Range

- **0 – 65535** (Total: 65,536 ports)

## Categories of Port Numbers

| Range         | Type                  | Example Use                                      |
|---------------|-----------------------|--------------------------------------------------|
| 0 – 1023      | Well-known ports      | HTTP (80), HTTPS (443), FTP (21), SSH (22)       |
| 1024 – 49151  | Registered ports      | User-defined or registered applications          |
| 49152 – 65535 | Dynamic/Private ports | Temporary connections (often client-side)        |

## Common Port Numbers

| Service | Port |
|---------|------|
| HTTP    | 80   |
| HTTPS   | 443  |
| FTP     | 21   |
| SSH     | 22   |
| DNS     | 53   |
| SMTP    | 25   |

## Why Port Numbers Matter

- Allow multiple services to run on the same device.
- Help route data to the correct application.
- Essential for firewalls and network security.