# dou-calendar-bot

Telegram бот для відстеження подій на [Dou.ua](https://dou.ua/calendar/) та нагадування про них.

> [!УВАГА]
> Автор цього проєкту **не має жодного відношення до Dou.ua**, він створений на базі відкритого RSS API: https://dou.ua/calendar/feed/

## DB Worker

```bash
pnpm wrangler d1 execute dou_calendar_bot_db --local --file=src/db_worker/migrations/YOUR_MIGRATION_SQL.sql --config src/db_worker/wrangler.toml
```

Apply migration to your local DB.
