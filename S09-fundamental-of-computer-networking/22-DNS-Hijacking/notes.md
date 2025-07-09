## DNS Hijacking Using the Hosts File

The `hosts` file is a local configuration file on your computer that maps domain names to specific IP addresses. When you access a website, your system checks this file before querying external DNS servers.

**By editing the hosts file, you can:**
- Redirect a website (e.g., point `www.google.com` to `127.0.0.1`)
- Block access to specific sites
- Simulate custom domains for local development