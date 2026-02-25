#!/bin/bash
# Push Gunnu.ai to GitHub repo "gunnu"
# Usage: ./scripts/push-to-github.sh [YOUR_GITHUB_USERNAME]

set -e
cd "$(dirname "$0")/.."

USERNAME="${1:-nxsumityadav}"
git remote set-url origin "https://github.com/${USERNAME}/gunnu.git"
git push -u origin main
echo "Pushed to https://github.com/${USERNAME}/gunnu"
