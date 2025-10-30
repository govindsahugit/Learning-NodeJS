# Cookie Domain Attribute

## Default (No Domain Attribute)

- Cookie = host-only
- Sent only to the exact domain that set it
- **Example:** set by www.example.com → works only for www.example.com

## ℹ️ With Domain Attribute

- Cookie shared with domain + all subdomains
- **Example:** Domain=example.com → works for example.com, www.example.com, shop.example.com

## Rules

- Must be the same domain or parent domain
- Cannot be a public suffix (like .com, .org)
- Prevents setting cookies for unrelated domains

## Real-World Uses

- **Banking sites** → one session across www.bank.com, app.bank.com
- \*\*SSO
