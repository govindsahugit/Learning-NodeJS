# Rate Limiting

## ⚡ What is Rate Limiting?

Rate Limiting = Restricting how many times a user/client can call an API within a specific time frame.

**Example:** "A user can only call the /login API 5 times per minute."

It prevents abuse, DoS, brute-force attacks, and unnecessary server load.

## ⚡ Why APIs Need Rate Limiting

- Prevents brute force attacks (e.g., guessing passwords)
- Protects against DoS/DDoS attacks (too many requests)
- Ensures fair usage among users
- Saves server resources & bandwidth

## ⚡ Common Strategies for Rate Limiting

### Fixed Window

**Example:** Allow 100 requests per minute.

Simple but can cause bursts at window reset.

**Real-world example:** "You can withdraw ₹10,000 per day from ATM."

### Sliding Window / Rolling Window

Looks at last X seconds/minutes dynamically.

More accurate and smooth.

**Real-world example:** "In the last 24 hours, you can only withdraw ₹10,000."

### Token Bucket

Each request consumes a "token."

Tokens refill at a set rate (like filling a bucket with drops).

Flexible — allows short bursts but controls long-term usage.

**Real-world example:** "Your internet plan allows bursts of high speed (using tokens), but overall speed is limited."

### Leaky Bucket

Requests are processed at a fixed rate, excess gets dropped.

Smooths out request spikes.

**Real-world example:** "Queue at a toll booth, cars leave at a fixed rate; if too many arrive, they wait or get blocked."

## ⚡ Example in Real Life

- **ATM:** You can't withdraw money more than a limit per day
- **API:** You can't call `/checkout` more than 10 times per minute
