# IPv6 Address Overview

## Quick Summary

- **IPv6** uses a 128-bit address format (compared to 32-bit in IPv4).
- Composed of 8 groups of 4 hexadecimal digits, separated by colons (`:`).
- **Example:**  
   `2001:0db8:0000:0000:0000:ff00:0042:8329`

## IPv6 Format Rules

- **Leading zeros can be omitted:**  
   `0db8` → `db8`
- **Consecutive groups of all zeros can be replaced with `::` (only once per address):**  
   `2001:0db8:0000:0000:0000:ff00:0042:8329`  
   becomes  
   `2001:db8::ff00:42:8329`
- **All-zero address:**  
   `0000:0000:0000:0000:0000:0000:0000:0000` → `::`

## Types of IPv6 Addresses

- **Global Unicast Address (GUA):**

  - Routable on the internet.
  - Typically starts with `2` or `3`.
  - Often blocked by firewalls for security.

- **Temporary IPv6 Address:**

  - Randomized for privacy.
  - Changes periodically.

- **Link-Local Address:**
  - Used for communication within the same local network (LAN).
  - Always starts with `fe80::/10`.

## Using IPv6 in Browsers

- To access an IPv6 address directly, enclose it in square brackets:  
   `http://[2001:db8::1]/`

## IPv6 and IPv4 Compatibility ⚠️

- Disabling IPv4 means only IPv6-enabled websites are accessible.
- Many sites still rely on IPv4, so IPv6-only setups may restrict access.
