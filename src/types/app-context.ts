import { CallbackQueryContext, CommandContext } from "grammy";
import { DouCalendarBotContext } from "../config/context.config";

export type AppContext =
  | CommandContext<DouCalendarBotContext>
  | CallbackQueryContext<DouCalendarBotContext>;
