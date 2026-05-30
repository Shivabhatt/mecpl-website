# MECPL Website (artifact)

This repository contains the Vite-based MECPL artifact website used in development.

How to run locally

1. Install dependencies (requires pnpm):

```bash
pnpm install
pnpm run dev
```

2. Build for production:

```bash
pnpm run build
```

Deploying to GitHub Pages

I included a GitHub Actions workflow that builds the site and publishes the `dist/public/` folder to the `gh-pages` branch. To enable deployment:

- Create a GitHub repository (e.g. `mecpl-website`).
- Add the remote and push `main`/`master`.
- The workflow runs on every push to `main` and will publish to `gh-pages` automatically using the built-in `GITHUB_TOKEN`.

Important: If you prefer Vercel/Netlify, you can deploy directly from their dashboards as well.
