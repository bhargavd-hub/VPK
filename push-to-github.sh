#!/bin/bash
# ─────────────────────────────────────────────────────────────
#  VPK Marketplace — Push to GitHub
#  Run this script once from the vpk-marketplace/ folder:
#    chmod +x push-to-github.sh && ./push-to-github.sh
# ─────────────────────────────────────────────────────────────

set -e

GITHUB_USERNAME="bhargavd-hub"
REPO_NAME="vpk-marketplace"
REPO_DESC="VPK Marketplace — Next.js 15 + Tailwind CSS 3.4 home improvement e-commerce"

# ── 1. Ask for token securely (not echoed to terminal) ────────
echo ""
echo "🔑  Enter your GitHub Personal Access Token (input hidden):"
read -s GITHUB_TOKEN
echo ""

if [ -z "$GITHUB_TOKEN" ]; then
  echo "❌  No token provided. Exiting."
  exit 1
fi

# ── 2. Create the GitHub repo ─────────────────────────────────
echo "📦  Creating GitHub repository '${REPO_NAME}'..."

HTTP_STATUS=$(curl -s -o /tmp/gh_response.json -w "%{http_code}" \
  -X POST "https://api.github.com/user/repos" \
  -H "Authorization: Bearer ${GITHUB_TOKEN}" \
  -H "Accept: application/vnd.github+json" \
  -H "X-GitHub-Api-Version: 2022-11-28" \
  -d "{\"name\":\"${REPO_NAME}\",\"description\":\"${REPO_DESC}\",\"private\":false,\"auto_init\":false}")

if [ "$HTTP_STATUS" = "201" ]; then
  echo "✅  Repository created: https://github.com/${GITHUB_USERNAME}/${REPO_NAME}"
elif [ "$HTTP_STATUS" = "422" ]; then
  echo "⚠️   Repository already exists — will push to existing repo."
else
  echo "❌  GitHub API error (HTTP $HTTP_STATUS):"
  cat /tmp/gh_response.json
  exit 1
fi

# ── 3. Init git (if not already) ─────────────────────────────
if [ ! -d ".git" ]; then
  echo "🔧  Initialising git..."
  git init
  git config user.name "$GITHUB_USERNAME"
  git config user.email "${GITHUB_USERNAME}@users.noreply.github.com"
  git add .
  git commit -m "Initial commit: VPK Marketplace — Next.js 15 + Tailwind CSS 3.4"
fi

# ── 4. Set remote & push ──────────────────────────────────────
REMOTE_URL="https://${GITHUB_USERNAME}:${GITHUB_TOKEN}@github.com/${GITHUB_USERNAME}/${REPO_NAME}.git"

git branch -M main

if git remote | grep -q "^origin$"; then
  git remote set-url origin "$REMOTE_URL"
else
  git remote add origin "$REMOTE_URL"
fi

echo "🚀  Pushing to GitHub..."
git push -u origin main

echo ""
echo "🎉  Done! Your repo is live at:"
echo "    https://github.com/${GITHUB_USERNAME}/${REPO_NAME}"
echo ""
echo "💡  One-click deploy to Vercel:"
echo "    https://vercel.com/new/clone?repository-url=https://github.com/${GITHUB_USERNAME}/${REPO_NAME}"
