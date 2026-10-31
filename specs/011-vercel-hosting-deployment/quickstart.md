# Quickstart: Automated Vercel Deployment

**Feature Branch**: `011-vercel-hosting-deployment`

---

## 1. Deploying via Local CLI

From inside `foodlink-ui/`, you can deploy directly:

### Option A: If you have a Vercel Token
```powershell
cd foodlink-ui

# Set your token in the terminal session:
$env:VERCEL_TOKEN = "your_vercel_token_here"

# Deploy Customer Portal:
npm run deploy:customer

# Deploy Merchant Portal:
npm run deploy:merchant
```

### Option B: Interactive Vercel Login
```powershell
cd foodlink-ui

# Log in once with Vercel:
npx vercel login

# Deploy:
npm run deploy:customer
npm run deploy:merchant
```

---

## 2. Deploying via GitHub Actions (Continuous CI/CD)

1. In your GitHub repository: Go to **Settings** $\rightarrow$ **Secrets and variables** $\rightarrow$ **Actions**.
2. Add the following repository secrets:
   - `VERCEL_TOKEN`: Your token from [vercel.com/account/tokens](https://vercel.com/account/tokens).
   - (Optional) `VERCEL_ORG_ID`: Your Team or User ID.
   - (Optional) `VERCEL_PROJECT_ID`: Your Project ID.
3. Every push to `main` will automatically build and deploy both Customer and Merchant portals to Vercel!

