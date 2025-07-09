## Understanding Domain Name System (DNS)

The **Domain Name System (DNS)** translates human-readable domain names (like `www.google.com`) into IP addresses that computers use to identify each other on a network.

### Domain Hierarchy

- **Root Level Domain (RLD)**
    - Represented by a dot (`.`)
    - Highest level in the DNS hierarchy
    - Managed by ICANN (Internet Corporation for Assigned Names and Numbers)
    - Contains all Top-Level Domains (TLDs)

- **Top-Level Domain (TLD)**
    - Examples: `.com`, `.org`, `.net`, `.gov`, `.in`
    - Owned and managed by authorized organizations
    - These organizations can create Second-Level Domains

- **Second-Level Domain**
    - Example: `google` in `google.com`
    - Created under a TLD
    - Ownership is granted by TLD registrars

- **Subdomain**
    - Example: `www` in `www.google.com`
    - Created under a second-level domain
    - Can have multiple levels (e.g., `mail.support.google.com`)

### Important Rules

- The total length of a domain name (including dots) cannot exceed **255 characters**.
- Each label (the part between dots) can be up to **63 characters** long.

### Domain Registration

- TLDs are managed by authorized organizations, but they typically do **not** sell domains directly.
- Domain registrars (e.g., GoDaddy, Namecheap) handle the sale and management of second-level domains to the public.