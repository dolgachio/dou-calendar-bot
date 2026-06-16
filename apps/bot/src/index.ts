import { createBot } from "./create-bot";

console.log("Bot is starting...");

async function main() {
  const bot = await createBot();
  bot.start();
}

main().catch((err) => {
  console.error("Error starting bot:", err);
});

console.log("Bot started successfully & Running...");
