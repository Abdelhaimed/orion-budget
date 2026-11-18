# Orion Life

Private, mobile-first personal dashboard for finance, gym training, shopping lists, tasks, activities and CSV reporting. It is hosted on GitHub Pages and uses Supabase Authentication plus a Row Level Security-protected JSON document.

## Data compatibility

Existing Orion Budget data remains in the same `public.budget_data` row. On first load, Orion Life adds `schemaVersion: 2` and the new `gym`, `shopping`, `tasks`, `extraExpensePlans` and `preferences` keys without replacing `cycles`, transactions, goals, savings or annual bills.

The migration deliberately keeps one versioned document. No database migration is required beyond the existing [`supabase-setup.sql`](supabase-setup.sql). This avoids a risky multi-table migration while the application is still single-user.

## Features

- Salary-cycle finance, savings transfers, annual bills and goals.
- Weekly, monthly-flexible and one-time category types.
- Regular and bulk purchases with coverage-day allocation.
- Extra-expense planning without recording a false transaction.
- Professional CSV reports with filters, Excel BOM, comma/semicolon choice and spreadsheet-formula protection.
- Separate JSON backup/import.
- The original four-day gym guide, workout logging, weights and history.
- Guided workout cards with per-set recovery timers, between-exercise timers and in-app video demonstrations.
- Multiple shopping lists and one-time conversion of purchases into Finance.
- Tasks, planner filters and duplicate-safe recurring tasks.
- Unified dashboard, dark mode, responsive mobile navigation and an installable PWA shell.

## Supabase setup

1. In the Supabase SQL Editor for project `gxvfifqwbbgtrtulhonh`, run [`supabase-setup.sql`](supabase-setup.sql).
2. In **Authentication → Users**, create the private email/password user.
3. Disable public email signup after that user exists.
4. Set the Site URL and redirect URL to `https://abdelhaimed.github.io/orion-budget/`.

The frontend publishable key is intentionally public. Never add a service-role key, database password, exported JSON backup or personal CSV report to the repository.

## Test locally

Serve the repository over HTTP; service workers and Supabase authentication should not be tested through a `file://` URL.

```powershell
npx serve .
```

Then open the printed local URL. Run automated calculation and CSV tests with:

```powershell
node --test tests\orion-utils.test.cjs
```

## Deployment

GitHub Actions deploys pushes to `main`. In **Settings → Pages**, select **GitHub Actions** as the source.

## Exercise media

Most in-app exercise demonstrations come from the MIT-licensed [Free Exercise DB with Videos](https://github.com/harshvishu/free-exercise-db-with-videos). A small number of movements use privacy-enhanced YouTube embeds when the open dataset has no matching demonstration.
