import { Bot } from './bot'
import { TelegramResponse } from './telegramapi';
import { getExchangeRate, ExchangeApiResponse } from "./exchangeapi";


export abstract class UserState {
    public bot: Bot;
    public chatId: number

    constructor(bot: Bot, chatId: number) {
        this.bot = bot;
        this.chatId = chatId;
    }

    public abstract handleMessage(message: string): Promise<void>;
}

export class DefaultUserState extends UserState {
    public async handleMessage(message: string): Promise<void> {
        this.bot.view.sendMessage('Я не знаю таких слов, если хочешь пообщаться, введи /currency', this.chatId);
        return;
    }

}

export class SendindCurrencyUserState extends UserState {
    public async handleMessage(message: string): Promise<void> {
        const currs = message.split('-', 2);
        try {
            const response = await getExchangeRate(currs[0], currs[1]);
            const rate = response.rates[0];
            this.bot.view.sendMessage(`Валютный курс '${currs[0]}-${currs[1]}': ${rate}.`, this.chatId);
        } catch (error) {
            this.bot.view.sendMessage('Ой, что-то пошло не так. Убедись, что ты правильно ввел валютную пару.', this.chatId);
        }
    }

}