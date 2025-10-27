# What is XSS?

Cross-Site Scripting (XSS) is a vulnerability where attackers inject malicious JavaScript into a web page, which then runs in the browser of other users.

## Why It's Dangerous?

- Can steal cookies, sessions, and sensitive data
- Can impersonate users or perform actions on their behalf
- May lead to account takeovers or site defacement

## How It Happens?

1. A site displays user input (like a comment or form value) without sanitizing it
2. The attacker injects a script
3. Other users visiting that page run the script unknowingly

## How to Prevent It?

- Sanitize or escape all user input
- Use tools like DOMPurify
- Avoid unsafe methods like `innerHTML`, `eval`, etc.
- Use Content Security Policy (CSP) to block unwanted scripts
