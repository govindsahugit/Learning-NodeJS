## Cookies

Cookies are small pieces of data (up to 4KB) stored by the browser as key-value pairs. Accessed in JS using `document.cookie`.

**What Do Cookies Store?**

*   Key, value
*   Domain
*   Path
*   Expiry date
*   Size
*   Flags like Secure, HttpOnly

**Expiry**

*   By default, cookies are session-based (deleted when the browser closes).
*   You can set custom expiry using:
    *   `max-age` (in seconds, preferred)
    *   `expires` (specific date)

**Flags**

*   `Secure`: Cookie only works on HTTPS
*   `HttpOnly`: Can’t be accessed via JS (adds security)
*   `SameSite`: Controls cross-site requests (protects against CSRF)

**Other Notes**

*   You can set multiple cookies.
*   Special characters must be URL-encoded.
*   Third-party cookies are cookies from domains other than the one in the browser’s address bar