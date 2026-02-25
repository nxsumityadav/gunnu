# Deploy Architect to Netlify + Neon

## Prerequisites

- Netlify account (free tier)
- Neon account (free tier)
- Git repo (GitHub, GitLab, or Bitbucket)

## 1. Neon Database

### Option A: Use existing Neon project

If you already have a Neon project, copy the connection string from the Neon dashboard.

### Option B: Set up Neon with neonctl

```bash
npx neonctl@latest --force-auth init --agent cursor
```

Complete the browser auth, then follow prompts to create/link a project.

### Get your connection string

- Go to [Neon Console](https://console.neon.tech)
- Select your project → Connection details
- Copy the **pooled** connection string (for serverless)

## 2. Run Prisma migrations

With `DATABASE_URL` in `.env`:

```bash
npx prisma db push
# or: npx prisma migrate deploy
```

## 3. Deploy to Netlify

### Connect your repo

1. Push code to GitHub/GitLab/Bitbucket
2. Go to [Netlify](https://app.netlify.com) → Add new site → Import an existing project
3. Select your repo
4. Build settings (usually auto-detected):
   - Build command: `npm run build`
   - Publish directory: `.next` (handled by plugin)

### Environment variables

In Netlify: **Site settings → Environment variables** → Add:

| Variable          | Value                    | Scopes   |
|-------------------|--------------------------|----------|
| `DATABASE_URL`    | Your Neon connection URL | All      |
| `TAVILY_API_KEY`  | Your Tavily API key      | All      |
| `ROUTEWAY_API_KEY`| Your Routeway API key    | All      |
| `ROUTEWAY_BASE_URL` | `https://api.routeway.ai/v1` | All   |
| `GROQ_API_KEY`    | (optional) Your Groq key| All      |

### Deploy

Netlify will build and deploy. The first deploy may take a few minutes.

## 4. Verify

- Visit your Netlify URL (e.g. `https://your-site.netlify.app`)
- Create a project and run through the flow
- Check Netlify function logs if anything fails

## Troubleshooting

- **Build fails**: Check Netlify build logs; ensure all env vars are set
- **DB connection errors**: Use the **pooled** Neon URL, not the direct connection
- **API errors**: Confirm Tavily and Routeway keys are valid and have quota
