# Push Gunnu.ai to GitHub

Your code is committed locally. To push to a new repo named **gunnu**:

## Option 1: Create repo on GitHub (recommended)

1. Go to **https://github.com/new**
2. Set **Repository name** to `gunnu`
3. Choose **Public**
4. **Do not** initialize with README (you already have code)
5. Click **Create repository**
6. Copy your repo URL (e.g. `https://github.com/YOUR_USERNAME/gunnu.git`)
7. Run:

```bash
cd /Users/sumit/Desktop/Gunnu.ai
git remote set-url origin https://github.com/YOUR_USERNAME/gunnu.git
git push -u origin main
```

Replace `YOUR_USERNAME` with your GitHub username.

## Option 2: Using GitHub CLI

If you have `gh` installed:

```bash
cd /Users/sumit/Desktop/Gunnu.ai
gh repo create gunnu --public --source=. --push
```

## Current status

- Git initialized
- All files committed
- Remote set to `https://github.com/nxsumityadav/gunnu.git`
