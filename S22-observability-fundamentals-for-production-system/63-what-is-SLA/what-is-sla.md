## 🎯 What is an SLA?

An SLA (Service Level Agreement) is a formal contract between a service provider and a customer that defines the expected quality, availability, and responsibilities for a service. It outlines measurable metrics (like 99.9% uptime or 24-hour support response) and remedies or penalties for failing to meet these standards.

It answers:

* ✅ *How reliable will our system be?*
* 📊 *How do we measure it?*
* ⚠️ *What happens if we fail?*

---

## 🔗 Why are we learning SLA after Observability?

Observability comes first because:

* 📊 It tells you **what is actually happening** in your system
* 📜 SLA defines **what you promise should happen**

👉 You **cannot define an SLA without observability**

Because:

* You need real data about uptime, latency, and errors
* You need a way to detect failures
* You need confidence that your system can meet the promise


### ⚡ Key idea

> ❌ SLA without observability = guesswork  
> ✅ SLA with observability = measurable and enforceable

---

## 🧾 Types of SLA (Formal Classification)

While SLA is a single concept, in practice it is structured in three common ways:

### 👤 1. Customer-based SLA

* One SLA created **for a specific customer**
* Covers all services provided to that customer

---

### 🛠️ 2. Service-based SLA

* One SLA defined **for a specific service**
* Applies to all users of that service

Example: uptime guarantee for an API

---

### 🏗️ 3. Multi-level SLA

* A layered SLA combining multiple levels:

  * 🌐 Organization-level (common for all users)
  * 👤 Customer-level (specific commitments)
  * 🛠️ Service-level (specific services)

---

## ⏰ When do you actually commit an SLA?

You **don’t need an SLA from day one**.

You commit it when:

### 🧑‍💼 1. You have real users or paying customers

* You’re running a product (like your storage app or SaaS)
* Users depend on your system

---

### 📜 2. There is a formal relationship

* Client contracts
* Paid APIs
* B2B services

Example:
Companies like Amazon Web Services publish SLAs because customers rely on them.

---

### ⚖️ 3. You’re ready to be accountable

* You have monitoring (observability ✅)
* You can measure uptime, latency, errors
* You’re confident you can maintain it

---

## 🧩 What exactly do you commit?

An SLA is built from these:

### 📊 SLI (Indicator)

👉 What you measure

* uptime
* latency
* error rate

---

### 🎯 SLO (Objective)

👉 Your target

* 99.9% uptime
* 95% requests < 300ms

---

### 📜 SLA (Agreement)

👉 Official commitment + consequences

* Includes SLOs
* Includes penalties (credits/refunds)

---

## 🔥 Example (clean and real)

> 🚀 “Our API will be available **99.9% monthly**  
> ⚡ and respond within **300ms for 95% of requests**  
> 💰 If we fail, users get service credits”

That is a complete SLA.

---

## 🧠 Why it actually matters

* 🎯 Turns vague metrics → clear targets
* 🚨 Helps you alert on *real problems* (not random CPU spikes)
* 🏗️ Forces better system design (failover, caching, etc.)
* 💼 Builds trust with users/customers

---

## ⚡ One-line clarity

> 🧭 **SLA = “This is the level of reliability we guarantee, and we take responsibility if we fail.”**
