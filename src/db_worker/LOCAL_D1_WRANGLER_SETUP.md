# Local D1 + Wrangler setup (HTTP)

This note captures the minimum steps to run a Cloudflare Worker locally with a **D1** database so you can interact with it via **HTTP requests** (e.g. `curl`).

> Assumption: you’ll run Wrangler from the repo root, and your config lives in `src/db_worker/wrangler.toml`.

## 1) Install Wrangler (dev dependency)

```bash
pnpm add -D wrangler
```

## 2) Login + create the D1 database (one-time)

You typically do this once to get a real `database_id` for the binding.

```bash
pnpm wrangler login
pnpm wrangler d1 create dou_calendar_bot_db
```

Wrangler will print a `database_id` (UUID). Copy it.

## 3) Configure `wrangler.toml` (must be TOML, not commented JSON)

Replace your `src/db_worker/wrangler.toml` contents with valid TOML:

```toml
name = "dou-calendar-bot-db-worker"
main = "src/db_worker/src/index.ts"
compatibility_date = "2026-03-07"

[[d1_databases]]
binding = "DB"
database_name = "dou_calendar_bot_db"
database_id = "PASTE-YOUR-UUID-HERE"
```

Notes:
- `binding = "DB"` means your Worker code will access the database as `env.DB`.
- Keeping `wrangler.toml` inside `src/db_worker/` is fine; you’ll just pass `--config` when running Wrangler.

## 4) Create/apply a local schema (migration SQL)

Create a SQL file (example): `src/db_worker/migrations/0001_init.sql`

```sql
CREATE TABLE IF NOT EXISTS kv (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL
);
```

Apply it to **local** D1 (Wrangler uses a local SQLite-backed DB when you pass `--local`):

```bash
pnpm wrangler d1 execute dou_calendar_bot_db --local --file=src/db_worker/migrations/0001_init.sql
```

You can re-run this safely because it uses `IF NOT EXISTS`.

## 5) Run the Worker locally (HTTP)

```bash
pnpm wrangler dev --local --config src/db_worker/wrangler.toml --port 8787
```

Your Worker will be available at:

- http://localhost:8787

## 6) Verify via HTTP requests

Once your Worker exposes routes (for example, `/health`), you can test with:

```bash
curl http://localhost:8787/health
```

## Common pitfalls

- **Config not loaded**: make sure you pass `--config src/db_worker/wrangler.toml` if you run Wrangler from the repo root.
- **`wrangler.toml` format**: it must be real TOML (the current file in the repo is commented JSON and won’t be parsed).
- **DB binding name mismatch**: if TOML uses `binding = "DB"`, your Worker code must read from `env.DB`.
