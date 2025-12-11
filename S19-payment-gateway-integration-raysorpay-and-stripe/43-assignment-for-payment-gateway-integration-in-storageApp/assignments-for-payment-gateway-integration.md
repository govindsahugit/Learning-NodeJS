# 💳 **Payment Gateway Integration Assignments**

Now that subscription creation is implemented in your Storage App, it’s time to **manage the complete subscription lifecycle**, handling all states, billing, invoices, and security operations. 🚀

---

## 🧩 **Features to Implement**

### 🔁 1. Subscription State Management

Handle all key states for active subscriptions:

* **Activated** → User gets storage quota and full access.
* **Paused** → Block uploads, allow downloads.
* **Resumed** → Restore normal usage and quota validation.
* **Cancelled** → Remove access after a short grace period.
* **Halted / Pending** → Payment issues — alert the user and start retry/grace logic.

### 🧾 2. Billing & Invoices

* Fetch all invoices for a user with **amount**, **status**, and **billing period**.
* Display **next billing date** and **current plan** on the dashboard.
* Allow users to **download** their invoices easily.

### 🔼 3. Plan Upgrades & Downgrades

* Implement **upgrade** logic using Razorpay Plan IDs and adjust user quota instantly.
* Add a **downgrade guard** — allow only if `usedStorage ≤ newPlanQuota`.
* Update the user’s `maxStorageInBytes` accordingly.

### ❌ 4. Cancellation Flow

* Let users **cancel** their subscription anytime.
* Call Razorpay’s cancel API and mark the subscription as `status = "canceled"`.
* Maintain a **grace period** (e.g., 3 days) before removing storage access completely.

---

## ⚙️ **Endpoints to Build**

| Method | Endpoint                         | Description                                                      |
| :----- | :------------------------------- | :--------------------------------------------------------------- |
| `POST` | `/api/subscriptions/:id/cancel`  | Cancel a Razorpay subscription and update your DB status.        |
| `POST` | `/api/subscriptions/:id/pause`   | Pause a user’s active subscription (uploads blocked).            |
| `POST` | `/api/subscriptions/:id/resume`  | Resume a paused subscription (uploads restored).                 |
| `POST` | `/api/subscriptions/change-plan` | Handle plan upgrade or downgrade using Razorpay Plan IDs.        |
| `GET`  | `/api/billing/invoices`          | Fetch all invoices for the logged-in user.                       |
| `GET`  | `/api/subscriptions/status`      | Return current subscription info, status, and next billing date. |

---

## 🛡️ **Security & Ops**

### 🔐 Secrets Management

* Store all keys securely in `.env`:

  * `RZP_KEY_ID`
  * `RZP_KEY_SECRET`
  * `RZP_WEBHOOK_SECRET`
* Never expose them in frontend or logs.

### 🧠 Webhook Handling

* Verify each webhook signature using `RZP_WEBHOOK_SECRET`.
* Rate-limit the webhook endpoint `/api/webhooks/razorpay`.
* Log `event.id`, `subscription_id`, and timestamps.
* Store raw payloads for debugging and replay safety.

### ⚠️ Alerts & Monitoring

* Set up alerts for these critical events:

  * `subscription.pending` → Payment retry started.
  * `subscription.halted` → Payment failed after retries.
  * `subscription.cancelled` → Subscription ended.
* Monitor webhook success/failure rates and reprocess failed ones.

### 🧾 Operational Best Practices

* Maintain a **grace period** (e.g., 3 days) before full deactivation.
* Add a **daily cron job** to check halted or expired subscriptions.
* Retry failed API calls automatically (with exponential backoff).
* Keep an **admin activity log** for pause/resume/cancel actions.

---

## 💡 **Advanced Add-Ons (Optional)**

* 🧮 **Usage-Based Billing:** Charge extra for over-quota storage.
* 🌍 **Multi-Currency Plans:** Offer pricing for different regions.
* 🧾 **GST-Compliant Invoices:** Include tax breakup and business info.
* 📊 **Admin Analytics:** Track MRR, churn, and total active subscribers.
* 🧠 **Auto-Resume Option:** Resume subscription automatically after successful retry.

---

## ✅ **Your Goal**

By completing this assignment, you’ll build:

1. A complete **subscription state management system**.
2. Secure **webhook-based updates** for billing and renewals.
3. A robust **plan-handling and invoice** infrastructure.

🎯 **Deliverable:** A working subscription system where users can pause, resume, cancel, upgrade, and view invoices — fully synced with Razorpay.