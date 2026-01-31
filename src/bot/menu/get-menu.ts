import { InlineKeyboard } from "grammy";
import { AppContext } from "../types/app-context";
import { BotCommandsEnum } from "../constants/bot-commands.enum";
import { DOU_CALENDAR_LINKS } from "../constants/dou-calendar-links.constant";

type GetMenuParams = {
  isSubscribed: boolean;
  ctx: AppContext;
};

export function getMenu(params: GetMenuParams) {
  const { isSubscribed, ctx } = params;

  if (isSubscribed) {
    return new InlineKeyboard()
      .text(ctx.t("button_unsubscribe"), BotCommandsEnum.UNSUBSCRIBE)
      .url(ctx.t("calendar_link"), DOU_CALENDAR_LINKS.MAIN);
  }

  return new InlineKeyboard()
    .text(ctx.t("button_subscribe"), BotCommandsEnum.SUBSCRIBE)
    .url(ctx.t("calendar_link"), DOU_CALENDAR_LINKS.MAIN);
}
