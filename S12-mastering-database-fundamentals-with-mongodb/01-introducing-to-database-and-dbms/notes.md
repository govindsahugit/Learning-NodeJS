## A Database

A Database is a structured collection of data that allows efficient storage, access, and management.

### Why Use a Database
- Organize and retrieve data efficiently
- Ensure data security and integrity
- Support multiple users
- Handle large data volumes
- Provide backup and recovery

### ISAM (Indexed Sequential Access Method)
Early method of storing data using indexes for faster sequential access.

### DBMS (Database Management System)
Software that manages databases and handles operations like Create, Read, Update, Delete (CRUD).

Examples: MySQL, MongoDB, PostgreSQL.

### Components of a Database System
- **DB Server:** Handles client requests and manages data (runs as a TCP server).
- **DB Client:** Connects to the server.
  - **GUI Clients:** MySQL Workbench, MongoDB Compass
  - **Terminal Clients:** `mysql`, `mongo`
  - **Drivers:** Used in apps (e.g., MySQL Node.js driver)
- **Storage Engine:** Stores data on disk (e.g., InnoDB, WiredTiger)

### Communication Protocols
Databases use their own protocols over TCP to talk to clients:
- MySQL Protocol
- MongoDB Wire Protocol
