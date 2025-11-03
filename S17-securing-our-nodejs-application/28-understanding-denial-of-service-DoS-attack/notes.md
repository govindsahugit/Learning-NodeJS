# DoS Attack (Denial of Service)

## ⚡ What is a DoS Attack?

Denial of Service (DoS) = An attack where the goal is to make a website, server, or network unavailable to its users.

Instead of stealing data, attackers overwhelm the system so that real users can't access it.

## ⚡ How it Works

### Flooding with Requests

The attacker sends too many fake requests at once (like refreshing a site millions of times).

The server gets overloaded and can't handle real users.

### Resource Exhaustion

Attackers may exploit weak spots (CPU, memory, bandwidth).

**Example:** Making a database do heavy queries repeatedly until it crashes.

### Exploiting Vulnerabilities

Sometimes attackers use bugs in software to crash the service instead of flooding it.

## ⚡ Types of DoS Attacks

- **Volumetric Attacks** → Overwhelm bandwidth (like flooding a pipe with water)
- **Protocol Attacks** → Exploit weaknesses in network protocols (e.g., SYN flood)
- **Application-Layer Attacks** → Target the app itself (e.g., sending repeated search requests that are expensive to process)

## ⚡ Real-World Example

Imagine a shop with only 1 cashier:

- An attacker hires 1,000 fake customers to stand in line
- Real customers can't buy anything → service is denied

## ⚡ Defense Against DoS

- **Rate limiting** (limit how many requests per second each user can make)
- **Firewalls & Intrusion Detection** (block suspicious traffic)
