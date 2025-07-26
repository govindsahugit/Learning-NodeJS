# Anatomy of HTTP Request and Response

## HTTP Request Structure
```http
<Method> <Path> <HTTP Version>    // Request Line (Part of Header)
<Header-Name-1>: <Header-Value-1> // Request Header
<Header-Name-2>: <Header-Value-2> // Request Header
...
<Optional-Body>                   // Request Body (if any)
```

## HTTP Response Structure
```http
<HTTP Version> <Status Code> <Reason Phrase>
<Header-Name-1>: <Header-Value-1>
<Header-Name-2>: <Header-Value-2>
...
<Optional-Body>
```