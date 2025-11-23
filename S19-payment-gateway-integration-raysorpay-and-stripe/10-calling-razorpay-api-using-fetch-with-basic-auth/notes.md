# Basic Auth

## Definition

A simple HTTP authentication method where the client sends a username and password to the server.

## Process

1. Client requests a protected resource
2. Server responds with 401 Unauthorized and requests credentials
3. Client encodes `username:password` in Base64
4. Client adds it to the request header: `Authorization: Basic <Base64-credentials>`
5. Server decodes and verifies

## Security Considerations

- Base64 is encoding, not encryption
- Vulnerable without HTTPS (credentials can be intercepted)
- Credentials sent with every request

## Use Cases

- Internal tools and simple APIs
- Testing and temporary setups
- Always combine with HTTPS in production

## Limitations

- Weaker than modern methods (Bearer tokens, JWT)
- High interception risk
- Not recommended for public APIs
