import { createBot } from "./create-bot";
import { BOT_TOKEN } from "./config";

console.log("Bot is starting...");

async function main() {
  const bot = await createBot(BOT_TOKEN);
  bot.start();
}

main().catch((err) => {
  console.error("Error starting bot:", err);
});

console.log("Bot started successfully & Running...");
