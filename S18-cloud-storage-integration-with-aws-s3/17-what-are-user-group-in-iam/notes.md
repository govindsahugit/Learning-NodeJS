⚡ What is a Group in IAM?

## Definition

An IAM Group is a collection of IAM users for simplified permission management:

- Has no credentials (no password, no access keys)
- Exists solely to streamline permission assignment
- Inherits policies to all member users automatically

## Why Use Groups?

**Scenario:** Managing 50 developers with identical permissions

**Without Groups:**

- Attach "DeveloperPolicy" individually to each user
- Tedious, inconsistent, error-prone

**With Groups:**

- Create a "Developers" group
- Attach policy once
- Add users to group
- All inherit permissions automatically

**Benefits:** Centralized management, consistency, scalability

⚡ Key Points About Groups:
Only Users, No Nesting
-> A group can contain multiple users.
-> A user can be in multiple groups.
-> But groups cannot contain other groups.

    Policy Attachment
        -> You attach policies (JSON rules) to groups.
        -> Every user in that group inherits those policies automatically.

    Best Practice
        -> Create groups for job roles (e.g., Admins, Developers, ReadOnlyUsers).
        -> Attach permissions at group level, not user level, for easier management.

    Default Limit
        -> A user can belong to up to 10 groups.
        -> Each group can have up to 5,000 users (can be increased via AWS Support).

⚡ Example
Scenario:
-> You have 3 users: Alice, Bob, Charlie.
-> You want them to only read S3 buckets.

    Steps:
        -> Create a group → S3ReadOnlyGroup.
        -> Attach AmazonS3ReadOnlyAccess policy to the group.
        -> Add Alice, Bob, Charlie to the group.

    -> Now all 3 can only read S3 without writing any extra policy for each.
