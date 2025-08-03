# Preflight Request Mechanism

## Simple vs. Complex Requests

Browsers handle web requests differently depending on their complexity. **Simple** requests (like basic `GET` or `POST`) are sent directly. **Complex** requests (using methods like `PUT`, `DELETE`, `PATCH`, or including custom headers) require a preliminary check.

## Preflight (OPTIONS) Request

Before sending a complex request, the browser automatically sends an `OPTIONS` request to the server. This is called a **preflight** request. The purpose is to determine if the server is configured to accept the complex request.

## Server's Response

The server responds to the `OPTIONS` request with headers that indicate which methods and headers are allowed from the origin making the request.

## Actual Request

If the server's response to the `OPTIONS` request indicates that the complex request is permitted, the browser then proceeds to send the actual `PUT`, `DELETE`, `PATCH`, or other complex request. If the server does not allow the request, the browser will block the complex request and report an error.