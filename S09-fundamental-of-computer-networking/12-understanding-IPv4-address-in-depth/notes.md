# IPv4 Address & Subnet Mask

## What is an IP Address?

- **IP** stands for *Internet Protocol*.
- An IP address is a unique identifier assigned to every device connected to a network (such as the internet).
- It is assigned by a router (in local networks) or by an ISP (in mobile or broadband networks).
- **Note:** The IP protocol is the set of rules; the IP address is just one part of it.

## IPv4 Address Format

- IPv4 is a 32-bit binary number, divided into 4 sections of 8 bits (called *octets*).
- **Example (Binary):**  
    `11000000 10101000 00000000 00000001`  
    = `192.168.0.1`
- For human readability, it's shown in decimal format:  
    `192.168.0.1`

## IPv4 Range

- **Minimum IPv4 Address:** `0.0.0.0`
- **Maximum IPv4 Address:** `255.255.255.255`
- **Total Unique IPv4 Addresses:** `256^4 = 4,294,967,296`

## Reserved Address Range

- `127.0.0.0` – `127.255.255.255`: Reserved for loopback testing (internal testing, such as `localhost`).
- These addresses are not assigned to devices on the network.
- **Example:**  
    `127.0.0.1` → Loopback Address  
    Subnet Mask: `255.0.0.0`

## What is a Subnet Mask?

- A subnet mask is a 32-bit number that divides an IP address into:
    - **Network portion:** Identifies the network.
    - **Host portion:** Identifies the device on that network.
- **Example:**  
    IP Address: `192.168.1.10`  
    Subnet Mask: `255.255.255.0`  
    Binary: `11111111.11111111.11111111.00000000`

## What is CIDR Notation?

- **CIDR** stands for *Classless Inter-Domain Routing*.
- CIDR uses a shorthand for subnet masks:
    - `192.168.1.10/24`
    - `/24` means the first 24 bits are for the network, and the remaining 8 bits are for hosts.
    - Equivalent Subnet Mask: `255.255.255.0`