# Orion Budget

Private single-user budget app hosted on GitHub Pages, with authentication and cloud storage provided by Supabase.

## One-time Supabase setup

1. In the Supabase SQL Editor for project `gxvfifqwbbgtrtulhonh`, run [`supabase-setup.sql`](supabase-setup.sql).
2. In **Authentication → Users**, create your email/password user. Do not put that password in this repository.
3. In **Authentication → Providers → Email**, disable new-user signup after your user exists.
4. In **Authentication → URL Configuration**, set the Site URL to `https://abdelhaimed.github.io/orion-budget/` and add the same URL to Redirect URLs.

The browser publishable key in `index.html` is intentionally public. Security comes from login and the Row Level Security policies. Never add a service-role key, secret key, database password, or exported budget JSON to the repository.

## GitHub Pages

In **Settings → Pages → Build and deployment**, select **GitHub Actions**. A push to `main` then deploys the site.

## Existing V2 data

On the first successful login, the app uses cloud data if present. If no cloud row exists, it migrates the V2 data cached in that browser; otherwise it starts with the V2 defaults. JSON export/import remains available under **Plan & settings**.
