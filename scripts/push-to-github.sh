#!/bin/bash
# Push Gunnu.ai to GitHub repo "gunnu"
# Usage: ./scripts/push-to-github.sh [YOUR_GITHUB_USERNAME]

set -e
cd "$(dirname "$0")/.."

USERNAME="${1:-}"
if [ -z "$USERNAME" ]; then
  echo "Usage: ./scripts/push-to-github.sh YOUR_GITHUB_USERNAME"
  echo "Example: ./scripts/push-to-github.sh johndoe"
  exit 1
fi

git remote set-url origin "https://github.com/${USERNAME}/gunnu.git"
git push -u origin main
echo "Pushed to https://github.com/${USERNAME}/gunnu"
