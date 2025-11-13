# IAM Roles in AWS

## What is a Role?
- A temporary identity in AWS with permissions defined by policies.
- No long-term credentials (no passwords or permanent access keys).
- Can be assumed by:
    - AWS services (EC2, Lambda, ECS, etc.)
    - Users or identities in the same AWS account
    - Users/federated identities from other AWS accounts

## Key points
- **Trust policy** — defines who can assume the role.
- **Permission policy** — defines what the role can do.
- Roles use temporary credentials issued by STS (access key, secret key, session token) that expire.

## Common use cases
- EC2 instance role: grant S3/DynamoDB access without hardcoding keys.
- Lambda role: permissions to write logs or access other services.
- Cross-account access: allow one account to assume a role in another.
- Service-to-service access: ECS tasks, CodeBuild, etc.

## Flow (how it works)
1. Entity requests to assume the role.
2. AWS evaluates the role's trust policy.
3. If allowed, AWS issues temporary credentials (via STS).
4. The entity uses those credentials until they expire.

## Best practices
- Use roles instead of embedding long-term credentials in code.
- Follow least privilege: grant only necessary permissions.
- Attach IAM roles to services (EC2, Lambda, ECS) rather than passing keys.
- Monitor and audit role usage (CloudTrail, IAM Access Analyzer) and limit session duration where appropriate.