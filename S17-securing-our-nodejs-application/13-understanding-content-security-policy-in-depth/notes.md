# What is CSP?

Content Security Policy (CSP) is a security feature that controls what content (scripts, styles, images, etc.) your website is allowed to load. It helps protect against XSS, clickjacking, and code injection.

## Why Use It?

- Blocks untrusted scripts and resources
- Prevents inline script execution
- Reduces risk of browser-based attacks

## How to Use

Set CSP via HTTP headers or tags:

```
Content-Security-Policy: default-src 'self'; script-src 'self' https://trusted.com
```

## Best Practices

- Use `'self'` for trusted sources
- Avoid `'unsafe-inline'` and `'unsafe-eval'`
- Use nonces or hashes for inline scripts
- Set `frame-ancestors 'none'` to block iframes

## Test & Tools

- Use browser dev tools
- Try Google CSP Evaluator
- Use helmet in Express for easy setup

## Summary

CSP adds a strong layer of protection to your website by allowing only safe content to run. It's one of the easiest ways to defend against common web attacks.
