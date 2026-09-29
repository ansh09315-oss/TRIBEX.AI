# ==============================================================================
# TribeX AI — Windows PowerShell Git Setup & Push Automation Script
# Target Repository: https://github.com/ansh09315-oss/TRIBEX.AI
# ==============================================================================

Write-Host "🚀 [TribeX AI] Initializing Git Repository..." -ForegroundColor Cyan

# 1. Initialize local repository
if (-not (Test-Path ".git")) {
    git init -b main
    Write-Host "✓ Initialized empty Git repository in $(Get-Location)" -ForegroundColor Green
} else {
    Write-Host "✓ Existing Git repository detected." -ForegroundColor Yellow
    git branch -M main
}

# 2. Stage files
Write-Host "📦 Staging files for initial commit..." -ForegroundColor Cyan
git add .

# 3. Create initial commit
Write-Host "📝 Creating initial commit..." -ForegroundColor Cyan
git commit -m "feat(core): initialize TribeX AI Unified Scholarship Ecosystem for MoTA`n`n- Offline-First PWA with BLE Mesh Sync (Deep Forest Filing)`n- Cross-Lingual AI Voice Assistant (Santhali, Gondi, Bhili, Hindi, English)`n- Zero-Knowledge Cryptographic Trust Layer (zk-SNARKs)`n- Inter-Ministerial Fiscal De-Duplication Hub`n- Automated 7-Day SLA Escalation Engine (NPCI APB)`n- Predictive PVTG Drop-Out Analytics Dashboard`n- FastAPI High-Throughput Microservice Backend & PostgreSQL Schema`n- Multi-Container Docker Stack & Vercel PWA Deployment Configurations"

# 4. Link origin
$remoteUrl = "https://github.com/ansh09315-oss/TRIBEX.AI.git"
Write-Host "🔗 Linking remote origin to $remoteUrl..." -ForegroundColor Cyan

$remotes = git remote
if ($remotes -contains "origin") {
    git remote set-url origin $remoteUrl
    Write-Host "✓ Updated existing origin remote." -ForegroundColor Green
} else {
    git remote add origin $remoteUrl
    Write-Host "✓ Added origin remote: $remoteUrl" -ForegroundColor Green
}

# 5. Push instructions
Write-Host "`n⬆️ Ready to push to GitHub! Run:" -ForegroundColor Yellow
Write-Host "    git push -u origin main" -ForegroundColor White
Write-Host "If the remote repository already contains files, run:" -ForegroundColor Yellow
Write-Host "    git push -u origin main --force" -ForegroundColor White
