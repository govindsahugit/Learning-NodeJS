## Benefits & Drawbacks of Public and Private IP Addresses

### Public IP Address

**✅ Benefits:**
- Accessible from anywhere on the internet (ideal for servers, websites, and remote access)
- Uniquely identifies a device on the global internet
- Supports direct peer-to-peer communication

**❌ Drawbacks:**
- Limited availability (IPv4 exhaustion)
- More vulnerable to hacking and DDoS attacks
- Often more expensive (assigned by ISPs)

---

### Private IP Address

**✅ Benefits:**
- More secure for internal networks (not directly exposed to the internet)
- Allows reuse of the same IP ranges in different networks
- Conserves public IP space (via NAT — Network Address Translation)

**❌ Drawbacks:**
- Not routable on the public internet (cannot be accessed directly from outside)
- Requires NAT to communicate externally
- May complicate configurations for remote access or hosting