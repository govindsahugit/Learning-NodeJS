# Professional Node.js CI/CD Orchestrator ⚙️🚀

A custom-built, configuration-driven CI/CD server designed for high-availability deployments. Automates code-to-production transitions using industry-standard patterns: Symlink Switching, Health-Check Verification, and Automatic Rollbacks.

## 🏗️ Architectural Overview

This orchestrator implements a professional Release-Based architecture:

- **Immutable Releases**: Each deployment isolated in timestamped directories (e.g., `20260114-sha`)
- **Atomic Symlink Swapping**: Current directory symlink points to active release; version swaps take milliseconds
- **Zero-Downtime Engine**: PM2 Cluster Mode with ready signal logic ensures old process stops only after new one is healthy

## 🌟 Key Features

- **Config-as-Code**: Branch-based routing (TEST vs PROD) via `workspace.yml`
- **Health Checks**: Post-deployment `/health` endpoint verification with retry mechanism
- **Automated Rollback**: Failed health checks trigger automatic restoration to previous stable version
- **Disk Management**: Cleanup utility maintains only 2 most recent releases
- **Secure Webhooks**: HMAC SHA-256 signature verification for GitHub authentication
- **Real-time Feedback**: GitHub Commit Status API integration for PR updates

## 📂 Project Structure

```
├── app.js
├── workspace.yml
├── controllers/
│   └── controller.js
├── middlewares/
│   └── githubMiddleware.js
├── services/
│   ├── statusApis.js
│   └── sendEmail.js
└── utils/
  ├── scriptUtils.js
  ├── processUtils.js
  └── eventUtils.js
```

## 🚀 Quick Start

**Prerequisites**: Node.js v20+, PM2, GitHub Personal Access Token, Resend API Key

**Setup**:
```bash
npm install
npm run dev
```

**Configuration**: Add `.env` with `PORT`, `WEBHOOK_SECRET`, `GITHUB_TOKEN`, `EMAIL_RESEND_KEY`

## ⏪ Automatic Rollback Logic

Failed deployments trigger an automated recovery sequence:

1. **Detection**: `checkHealth` fails after 5 retry attempts
2. **Recovery**: System retrieves `PREVIOUS_RELEASE` SHA from GitHub payload
3. **Restore**: SSH command executes atomic symlink swap to previous release and reloads PM2

---

**Note**: This project demonstrates advanced Backend Engineering and DevOps orchestration patterns.
