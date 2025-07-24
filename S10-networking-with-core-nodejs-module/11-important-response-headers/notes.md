# Important Response Headers

## 1. Content-Length
- Indicates the number of bytes in the response body
- Browser disconnects the socket after reading the specified length
- Example: `Content-Length: 1234`

## 2. Content-Type
- Specifies the media type of the response content
- Helps browser determine how to process/display the content
- Example: `Content-Type: text/txt; charset=utf-8`

## 3. Content-Disposition
- Controls how content should be presented in browser
- Two main values:
    - `attachment`: Forces download
    - `inline`: Shows preview in browser
- Can include filename parameter
- Example: `Content-Disposition: attachment; filename=hello.pdf`
