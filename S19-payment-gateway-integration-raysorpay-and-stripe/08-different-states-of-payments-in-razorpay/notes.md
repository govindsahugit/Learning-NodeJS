# Payment Status in Razorpay

Every payment in Razorpay follows a lifecycle with distinct statuses to track transaction progress.

| Status | Description |
|--------|-------------|
| **Created** | Initial state when payment is initiated but not yet attempted. Customer hasn't entered payment details. |
| **Authorized** | Payment approved by customer's bank/card issuer. Money is blocked but not yet captured. Merchant must capture to receive funds (automatic or manual). |
| **Captured** | Payment successfully captured and debited from customer. Money will be settled to your Razorpay account. Final successful state. |
| **Failed** | Payment attempt failed due to insufficient balance, incorrect card details, authentication failure, or network error. |
| **Refunded** | Refund initiated (full or partial). Status changes to Refunded once money is returned to customer. |
