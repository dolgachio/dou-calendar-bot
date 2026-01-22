import "dotenv/config";
import { BOT_TOKEN } from "./config";
import { Bot, InlineKeyboard } from "grammy";
import { DouCalendarBotContext } from "./config/context.config";
import { I18n } from "@grammyjs/i18n";

export const douCalendarI18n = new I18n<DouCalendarBotContext>({
  defaultLocale: "uk",
  directory: "src/locales",
});

export function createBot() {
  // Create an instance of the `Bot` class and pass your bot token to it.
  const bot = new Bot<DouCalendarBotContext>(BOT_TOKEN); // <-- put your bot token between the ""

  // You can now register listeners on your bot object `bot`.
  // grammY will call the listeners when users send messages to your bot.
  bot.use(douCalendarI18n.middleware());
  // Handle the /start command.
  bot.command("start", (ctx) => {
    const isUserSubscribed = true;

    if (isUserSubscribed) {
      const subscriberKeyboard = new InlineKeyboard()
        .text(ctx.t("introduction_subscribed"), "manage_filters")
        .text(ctx.t("button_unsubscribe"), "stop_bot");

      ctx.reply(ctx.t("introduction_subscribed"), {
        reply_markup: subscriberKeyboard,
      });
    }

    // 1. Define your two different keyboards
    const guestKeyboard = new InlineKeyboard().text(
      ctx.t("button_subscribe"),
      "subscribe_me",
    );

    const subscriberKeyboard = new InlineKeyboard()
      .text(ctx.t("button_view_events"), "manage_filters")
      .text(ctx.t("button_unsubscribe"), "stop_bot");
  });
  // Handle other messages.
  bot.on("message", (ctx) => ctx.reply("Got another message!"));

  // Now that you specified how to handle messages, you can start your bot.
  // This will connect to the Telegram servers and wait for messages.

  return bot;
}
