# What is AWS CLI?

## AWS CLI (Command Line Interface)
The AWS CLI is a tool that lets you manage AWS services from your command line or terminal instead of always using the AWS web console.

It's like a shortcut to control AWS using commands.

## 🔑 Key Points
- **Full form:** AWS Command Line Interface
- **Cross-platform:** Works on Windows, macOS, and Linux
- **Uses your AWS credentials** (Access Key & Secret Key) to authenticate
- **Supports all major AWS services** – S3, EC2, IAM, Lambda, DynamoDB, etc.
- **Automation-friendly:** You can script tasks with it (using bash, PowerShell, etc.)

## 🛠️ Example Commands

**Check AWS version:**
```bash
aws --version
```

**List all S3 buckets:**
```bash
aws s3 ls
```

**Upload a file to S3 bucket:**
```bash
aws s3 cp resume.pdf s3://my-bucket-name/
```

**Start an EC2 instance:**
```bash
aws ec2 start-instances --instance-ids i-1234567890abcdef0
```

## ⚡ Benefits
- **Faster than console:** No need to click around in the AWS web UI
- **Automatable:** You can run scripts for repetitive tasks (like backups)
- **Remote management:** Control AWS resources from anywhere with terminal access
- **Integration:** Can be combined with CI/CD pipelines, cron jobs, or DevOps tools