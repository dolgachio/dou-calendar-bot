## Deployment 

### Deploying Telegram bot as Cloudflare worker

**Prerequisites**

You could use `pnpm dlx` but we suggest installing `wrangler` globally instead.

```bash
pnpm i -g wrangler
```

This instruction assumes, that your Telegram bot is created and you have `BOT_INFO` and `BOT_TOKEN` available. If not, please follow this instruction instead: https://grammy.dev/hosting/cloudflare-workers-nodejs

1. Put Bot Token to the Cloudflare Secrets
    ```bash
    wrangler secret put BOT_TOKEN
    ```
    or
    ```bash
    pnpm dlx wrangler secret put BOT_TOKEN
    ```

    > NOTE: When you run commands above in the Cloudflare Worker folder (with wrangler.toml/jsonc inside), you set this env. variable **only for this worker**, not all workers.

2. Got to `app/bot` folder and deploy bot code:
    ```bash
    pnpm deploy
    ```

3. Get your webhook URL

4. Setting Your Webhook
    ```bash
    curl https://api.telegram.org/bot<BOT_TOKEN>/setWebhook?url=https://<MY_BOT>.<MY_SUBDOMAIN>.workers.dev/
    ```
https://dou-calendar-bot.fine-func.workers.dev
    curl https://api.telegram.org/bot8512322035:AAFW0DxetKctYgkx_SDUJ0EWfCPOMkpV7-M/setWebhook?url=https://dou-calendar-bot.fine-func.workers.dev/

