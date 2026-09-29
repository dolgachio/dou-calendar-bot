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

2. Got to `app/bot` folder and deploy bot code:
    ```bash
    pnpm deploy
    ```

3. Setting Your Webhook
    ```bash
    curl https://api.telegram.org/bot<BOT_TOKEN>/setWebhook?url=https://<MY_BOT>.<MY_SUBDOMAIN>.workers.dev/
    ```

