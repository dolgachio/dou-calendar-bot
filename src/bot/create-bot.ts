import "dotenv/config";
import { BOT_TOKEN } from "./config";
import { Bot } from "grammy";
import { DouCalendarBotContext } from "./config/context.config";
import { I18n } from "@grammyjs/i18n";
import { getMenu } from "./menu/get-menu";
import { BotCommandsEnum } from "./constants/bot-commands.enum";
import { InMemoryUserStore } from "./data/user-store/in-memory-user-store";

export const douCalendarI18n = new I18n<DouCalendarBotContext>({
  defaultLocale: "uk",
  directory: "src/bot/locales",
});

const userStore = new InMemoryUserStore();

export function createBot() {
  // Create an instance of the `Bot` class and pass your bot token to it.
  const bot = new Bot<DouCalendarBotContext>(BOT_TOKEN); // <-- put your bot token between the ""

  bot.use(douCalendarI18n.middleware());
  
  // Handle the /start command.
  bot.command("start", async (ctx) => {
    const userId = ctx.from?.id;
    const isUserSubscribed = await userStore.isUserSubscribed(userId!);
    const menu = getMenu({ isSubscribed: isUserSubscribed, ctx });
    const text = isUserSubscribed
      ? ctx.t("introduction_subscribed")
      : ctx.t("introduction_unsubscribed");

    ctx.reply(text, {
      reply_markup: menu,
    });
  });

  bot.callbackQuery(BotCommandsEnum.SUBSCRIBE, async (ctx) => {
    await userStore.subscribeUser(ctx.from!.id);
    await ctx.answerCallbackQuery();
    await ctx.reply(ctx.t("subscribe_success"), {
      reply_markup: getMenu({ isSubscribed: true, ctx }),
    });
  });

  bot.callbackQuery(BotCommandsEnum.UNSUBSCRIBE, async (ctx) => {
    await userStore.unsubscribeUser(ctx.from!.id);
    await ctx.answerCallbackQuery();
    await ctx.reply(ctx.t("unsubscribe_success"), {
      reply_markup: getMenu({ isSubscribed: false, ctx }),
    });
  });
  // Handle other messages.
  bot.on("message", (ctx) => ctx.reply("Got another message!"));

  // Now that you specified how to handle messages, you can start your bot.
  // This will connect to the Telegram servers and wait for messages.

  return bot;
}
