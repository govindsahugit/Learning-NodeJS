# Why We Await Twice When Making a Fetch Call

When using `fetch`, we need to await twice because:

1. First `await` waits for response headers
    ```js
    const res = await fetch("http://example.com");
    // Resolves when headers are received
    ```

2. Second `await` waits for response body data
    ```js 
    const data = await res.json();
    // Resolves when full response body is received and parsed
    ```

This two-step process allows for streaming responses and early access to response metadata before the full body loads.