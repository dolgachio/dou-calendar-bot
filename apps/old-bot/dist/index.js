"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const create_bot_1 = require("./create-bot");
console.log("Bot is starting...");
async function main() {
    const bot = await (0, create_bot_1.createBot)();
    bot.start();
}
main().catch((err) => {
    console.error("Error starting bot:", err);
});
console.log("Bot started successfully & Running...");
