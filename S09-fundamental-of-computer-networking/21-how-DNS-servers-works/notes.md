# How DNS Servers Work

## DNS Lookup Flow

You can test DNS resolution using the command:

```sh
nslookup <domainName>
```

---

### 📶 Preference for IPv6

If both IPv4 and IPv6 DNS servers are available, your device will prefer IPv6 for better performance and a larger address space.

---

### 🔐 Direct IP Access Control

Accessing a website directly via its IP address (e.g., `http://142.250.182.14`) depends on the website owner—access may be allowed or blocked.

---

### 🌐 Common DNS Servers

- **1.1.1.1** → Cloudflare DNS  
- **8.8.8.8** → Google DNS

---

## DNS Resolution Steps

1. **Check Browser Cache**  
    The browser checks if it has the IP address for the domain cached.

2. **Check OS Cache**  
    If not found in the browser, the operating system's DNS cache is checked.

3. **Ask DNS Resolver**  
    If still unresolved, a DNS resolver (like 1.1.1.1 or 8.8.8.8) is queried. The resolver checks its own cache.

4. **Query Root Server**  
    If the resolver's cache misses, it contacts a Root DNS Server (`.`), which responds with the IP of the relevant Top-Level Domain (TLD) server (e.g., `.com`).

5. **Query TLD Server**  
    The resolver asks the TLD server for the IP of the Authoritative Name Server for the domain (e.g., `google.com`).

6. **Query Authoritative Name Server**  
    The authoritative server provides the actual IP address for the domain.

7. **Browser Connects to Web Server**  
    The browser uses the IP address to connect to the web server and load the website.

---

## What is a Name Server?

A Name Server is a specialized server that answers queries about domain name locations. It is part of the DNS system and stores DNS records (A, AAAA, MX, etc.) for domains. Authoritative Name Servers are the final source of truth for a domain’s IP address.

---

## What is TTL (Time To Live)?

TTL is a value (in seconds) that specifies how long a DNS record can be cached.  
- **Example:** If TTL = 300, the record can be cached for 5 minutes.  
- **Shorter TTL:** More frequent updates, more DNS traffic.  
- **Longer TTL:** Better performance, but changes may take longer to propagate.