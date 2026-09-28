import { InlineKeyboard } from 'grammy';
import { AppContext } from '../types/app-context';
import { BotCommandsEnum } from '../constants/bot-commands.enum';
import { DOU_CALENDAR_LINKS } from '../constants/dou-calendar-links.constant';
import { customTranslate } from '../translate';

type GetMenuParams = {
	isSubscribed: boolean;
	ctx: AppContext;
};

export function getMenu(params: GetMenuParams) {
	const { isSubscribed } = params;

	if (isSubscribed) {
		return new InlineKeyboard()
			.text(customTranslate('button_unsubscribe'), BotCommandsEnum.UNSUBSCRIBE)
			.url(customTranslate('calendar_link'), DOU_CALENDAR_LINKS.MAIN);
	}

	return new InlineKeyboard()
		.text(customTranslate('button_subscribe'), BotCommandsEnum.SUBSCRIBE)
		.url(customTranslate('calendar_link'), DOU_CALENDAR_LINKS.MAIN);
}
