### What is IAM?

- IAM (Identity and Access Management) is AWS’s security system that controls who can access AWS and what they can do.

### Main Parts

- Users → Individual people/apps with login or access keys.
- Groups → Collection of users (e.g., Developers, Admins).
- Roles → Temporary permissions for AWS services (no passwords/keys).
- Policies → Rules written in JSON that say Allow/Deny actions (like "Can read S3 buckets").

### Why Important?

- Protects your AWS account.
- Ensures least privilege (give only needed access).
- Supports MFA, temporary credentials, and cross-account access.
