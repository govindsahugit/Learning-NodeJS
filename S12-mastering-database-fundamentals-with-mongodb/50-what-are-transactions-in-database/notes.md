# Transactions in Database

## In MongoDB, transactions are a feature that allows you to group multiple read and write operations into a single atomic operation
Meaning either all operations succeed, or none of them are applied. This is similar to transactions in relational databases (like MySQL or PostgreSQL).

## Why Use Transactions in MongoDB?
MongoDB is a NoSQL database and was originally designed with single-document atomicity in mind. However, in some cases, you need multi-document or multi-collection atomic operations, such as:

- Transferring money between accounts
- Updating multiple collections consistently
- Undoing partial updates if something fails

For these use cases, MongoDB supports multi-document transactions starting from version 4.0 for replica sets and 4.2+ for sharded clusters.

## Key Properties of Transactions:
- **Atomicity:** All changes in a transaction are either fully applied or not applied at all
- **Consistency:** The database moves from one valid state to another
- **Isolation:** Operations in a transaction are invisible to others until committed
- **Durability:** Once committed, changes are permanent even if there's a crash