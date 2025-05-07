import { Bot } from './bot'

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
    public async handleMessage(_: string): Promise<void> {
        this.bot.view.sendMessage('Я не знаю таких слов, если хочешь пообщаться, введи /currency', this.chatId);
        return;
    }

}

export class SendingCurrencyUserState extends UserState {
    public async handleMessage(message: string): Promise<void> {
        const currs: string[] = message.split('-', 2);
        const base: string = currs[0];
        const symbol: string = currs[1]

        try {
            const response = await this.bot.exchangeSource.getExchangeRate(base, symbol);
            const rate = response.rates[symbol];
            this.bot.view.sendMessage(`Валютный курс '${base}-${symbol}': ${rate}.`, this.chatId);
            this.bot.userStates[this.chatId] = new DefaultUserState(this.bot, this.chatId);
            
        } catch (_) {
            this.bot.view.sendMessage('Ой, что-то пошло не так. Убедись, что ты правильно ввел валютную пару, или попробуй позже.', this.chatId);
        }
    }

}