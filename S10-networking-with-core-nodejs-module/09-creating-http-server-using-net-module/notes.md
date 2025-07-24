# HTTP Server using Net Module

## Key Points:
- Browsers only understand HTTP responses, which are TCP requests under the hood
- Different browsers have varying requirements:
    - Chrome expects "HTTP\n\n" in response
    - Firefox is more lenient
- Proper HTTP response syntax:
    ```js
    socket.end("HTTP/1.1\n\nHello World");
    ```
- If specified HTTP version is unavailable, browser falls back to default version
- Browsers can handle data streams natively
- Browser behavior differences:
    - Chrome: Downloads video content
    - Firefox: Plays video content directly
