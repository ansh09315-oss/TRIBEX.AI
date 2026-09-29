#!/usr/bin/env bash
# ==============================================================================
# TribeX AI — Git Initialization & GitHub Push Automation Script
# Target Repository: https://github.com/ansh09315-oss/TRIBEX.AI
# ==============================================================================

set -e

echo "🚀 [TribeX AI] Initializing Git Repository..."

# 1. Initialize local repository if not already initialized
if [ ! -d ".git" ]; then
    git init -b main
    echo "✓ Initialized empty Git repository in $(pwd)/.git"
else
    echo "✓ Existing Git repository detected."
    git branch -M main
fi

# 2. Stage all repository files
echo "📦 Staging files for initial commit..."
git add .

# 3. Create initial structured commit
echo "📝 Creating initial commit..."
git commit -m "feat(core): initialize TribeX AI Unified Scholarship Ecosystem for MoTA

- Offline-First PWA with BLE Mesh Sync (Deep Forest Filing)
- Cross-Lingual AI Voice Assistant (Santhali, Gondi, Bhili, Hindi, English)
- Zero-Knowledge Cryptographic Trust Layer (zk-SNARKs)
- Inter-Ministerial Fiscal De-Duplication Hub
- Automated 7-Day SLA Escalation Engine (NPCI APB)
- Predictive PVTG Drop-Out Analytics Dashboard
- FastAPI High-Throughput Microservice Backend & PostgreSQL Schema
- Multi-Container Docker Stack & Vercel PWA Deployment Configurations"

# 4. Configure remote origin
REMOTE_URL="https://github.com/ansh09315-oss/TRIBEX.AI.git"
echo "🔗 Linking remote origin to $REMOTE_URL..."

if git remote | grep -q 'origin'; then
    git remote set-url origin "$REMOTE_URL"
    echo "✓ Updated existing origin remote."
else
    git remote add origin "$REMOTE_URL"
    echo "✓ Added origin remote: $REMOTE_URL"
fi

# 5. Push to GitHub
echo "⬆️ Pushing to GitHub main branch..."
echo "Run the following command to push:"
echo "    git push -u origin main"
echo ""
echo "Or if you are pushing to an existing repository that has a README/license:"
echo "    git push -u origin main --force"
echo "✓ Setup complete!"
