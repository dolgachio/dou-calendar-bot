"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMenu = getMenu;
const grammy_1 = require("grammy");
const bot_commands_enum_1 = require("../constants/bot-commands.enum");
const dou_calendar_links_constant_1 = require("../constants/dou-calendar-links.constant");
function getMenu(params) {
    const { isSubscribed, ctx } = params;
    if (isSubscribed) {
        return new grammy_1.InlineKeyboard()
            .text(ctx.t("button_unsubscribe"), bot_commands_enum_1.BotCommandsEnum.UNSUBSCRIBE)
            .url(ctx.t("calendar_link"), dou_calendar_links_constant_1.DOU_CALENDAR_LINKS.MAIN);
    }
    return new grammy_1.InlineKeyboard()
        .text(ctx.t("button_subscribe"), bot_commands_enum_1.BotCommandsEnum.SUBSCRIBE)
        .url(ctx.t("calendar_link"), dou_calendar_links_constant_1.DOU_CALENDAR_LINKS.MAIN);
}
