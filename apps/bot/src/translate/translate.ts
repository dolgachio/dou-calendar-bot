import { UK_LOCALE } from './constants';
import { BotLocaleData } from './types';

export function customTranslate(key: keyof BotLocaleData) {
	return UK_LOCALE[key];
}
