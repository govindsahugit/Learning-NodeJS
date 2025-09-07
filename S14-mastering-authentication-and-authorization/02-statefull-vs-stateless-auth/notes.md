# Key Notes

## Stateful

Server holds session info. More control but more memory usage.

## Stateless

Server stores nothing. Easier to scale, but less secure if not handled properly.

## In real-world apps, a hybrid approach is common

(e.g., JWT for auth + refresh tokens + some server-side session control).

## Important

For sensitive browser or mobile apps, avoid full stateless auth (JWT-only) unless you can tolerate lower session control and some security risks.
