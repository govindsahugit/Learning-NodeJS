| State | Description |
|-------|-------------|
| Created | Subscription is made but not started yet. No money deducted. |
| Authenticated | For auto-debit plans (UPI, cards), user has approved payment mandate successfully. |
| Active | Subscription is live and billing is happening automatically on schedule. Payments are getting deducted. |
| Pending | Razorpay is waiting for the next payment. Could be due soon or payment in process. |
| Halted / Paused | Subscription is temporarily stopped, but can be resumed anytime. No billing happens while paused. |
| Completed | Subscription has run its full cycle (all planned payments are done). It ends normally. |
| Cancelled | Subscription is stopped before completion by the business or customer. Future payments will not happen. |
| Expired | Subscription ended automatically because mandate expired or was not renewed. |
| Failed | Razorpay tried to charge but payment failed (insufficient balance, card issue, etc.). |