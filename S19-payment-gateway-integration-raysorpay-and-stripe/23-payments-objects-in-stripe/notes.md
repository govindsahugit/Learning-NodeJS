# Payment Objects in Stripe

## Payment Intents API

**PaymentIntent** represents a customer's intent to pay and tracks the entire payment flow from creation through authentication to final confirmation.

- Create one PaymentIntent per order or checkout session
- You control the logic: calculate amount, taxes, discounts, and currency conversion
- Best for flexible or customized payment flows (dynamic pricing, custom tax logic, complex subscriptions)

## Checkout Sessions API

**Checkout Session** represents a complete checkout flow, typically for one-time purchases or subscriptions.

- Stripe provides a hosted checkout page or embedded form
- No need to build custom UI from scratch
- Payment completion includes a reference to the resulting PaymentIntent or Subscription
- Easier integration with lower code overhead
- Ideal for standard flows with built-in features (line-items, tax calculation, discounts, shipping)

## Charges API (Legacy)

**Charge** represents a single attempt to transfer money into your Stripe account.

- Historically used with tokenized card information
- Now considered legacy and discouraged
- Lacks modern payment-compliance features (SCA, strong customer authentication)
- Limited support for newer local payment methods

## When to Use Which API

| Use Case | Recommended API |
|----------|-----------------|
| Simple purchase/subscription, minimal code, Stripe-hosted checkout | Checkout Sessions |
| Advanced payment logic, custom checkout, fine-grained control | Payment Intents |
| Legacy codebase only | Charges (migration recommended) |

**Recommendation:** Use Payment Intents for custom flows or Checkout Sessions for standard flows. Avoid Charges for new integrations.


Stripe YouTube Video on Payment Objects : https://youtu.be/CUAY6IQcVQM