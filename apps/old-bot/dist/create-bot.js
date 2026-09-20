"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.douCalendarI18n = void 0;
exports.createBot = createBot;
require("dotenv/config");
const config_1 = require("./config");
const grammy_1 = require("grammy");
const i18n_1 = require("@grammyjs/i18n");
const get_menu_1 = require("./menu/get-menu");
const bot_commands_enum_1 = require("./constants/bot-commands.enum");
const in_memory_user_store_1 = require("./data/user-store/in-memory-user-store");
exports.douCalendarI18n = new i18n_1.I18n({
    defaultLocale: "uk",
    directory: "src/locales",
});
const userStore = new in_memory_user_store_1.InMemoryUserStore();
async function createBot() {
    // Create an instance of the `Bot` class and pass your bot token to it.
    const bot = new grammy_1.Bot(config_1.BOT_TOKEN); // <-- put your bot token between the ""
    bot.use(exports.douCalendarI18n.middleware());
    // Configure the persistent Telegram menu button for all users
    await bot.api.setChatMenuButton({
        menu_button: {
            type: "commands", // Tells Telegram to open the commands list or trigger the main action
        },
    });
    // 1. Set the default fallback command list
    await bot.api.setMyCommands([
        {
            command: "start",
            description: exports.douCalendarI18n.translate("en", "menu_start"),
        },
    ]);
    // 2. Register localized versions for your supported languages
    await bot.api.setMyCommands([
        {
            command: "start",
            description: exports.douCalendarI18n.translate("uk", "menu_start"),
        },
    ], { language_code: "uk" });
    // Handle the /start command.
    bot.command("start", async (ctx) => {
        const userId = ctx.from?.id;
        const isUserSubscribed = await userStore.isUserSubscribed(userId);
        const menu = (0, get_menu_1.getMenu)({ isSubscribed: isUserSubscribed, ctx });
        const text = isUserSubscribed
            ? ctx.t("introduction_subscribed")
            : ctx.t("introduction_unsubscribed");
        ctx.reply(text, {
            reply_markup: menu,
        });
    });
    bot.callbackQuery(bot_commands_enum_1.BotCommandsEnum.SUBSCRIBE, async (ctx) => {
        await userStore.subscribeUser(ctx.from.id);
        await ctx.answerCallbackQuery();
        await ctx.editMessageText(ctx.t("subscribe_success"), {
            reply_markup: (0, get_menu_1.getMenu)({ isSubscribed: true, ctx }),
        });
    });
    bot.callbackQuery(bot_commands_enum_1.BotCommandsEnum.UNSUBSCRIBE, async (ctx) => {
        await userStore.unsubscribeUser(ctx.from.id);
        await ctx.answerCallbackQuery();
        await ctx.editMessageText(ctx.t("unsubscribe_success"), {
            reply_markup: (0, get_menu_1.getMenu)({ isSubscribed: false, ctx }),
        });
    });
    // Handle other messages.
    bot.on("message", (ctx) => ctx.reply("Got another message!"));
    // Now that you specified how to handle messages, you can start your bot.
    // This will connect to the Telegram servers and wait for messages.
    return bot;
}
