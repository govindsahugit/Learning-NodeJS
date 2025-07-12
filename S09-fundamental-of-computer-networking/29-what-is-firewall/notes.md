## What is a Firewall?

A **firewall** is a network security system that monitors and controls incoming (inbound) and outgoing (outbound) network traffic based on predefined security rules.

---

### Types of Network Profiles

- **Public Network**
    - Used in open/public places (e.g., coffee shop Wi-Fi)
    - Most secure: strictest firewall rules

- **Private Network**
    - For trusted networks (like home Wi-Fi)
    - Less strict, allows device discovery

- **Domain Network**
    - For office or enterprise networks (managed by an organization)

---

### Inbound vs Outbound Rules

| Type     | Default Behavior   | Purpose                                 |
|----------|-------------------|-----------------------------------------|
| Inbound  | Mostly blocked    | Controls external traffic coming in      |
| Outbound | Mostly allowed    | Controls internal traffic going out      |

- Rules can allow or block specific ports, applications, or IP addresses.

---

### DPI (Deep Packet Inspection)

**Deep Packet Inspection (DPI)** is a technique used by advanced firewalls to inspect the contents of data packets (not just headers).  
It helps block malicious, suspicious, or unauthorized content.