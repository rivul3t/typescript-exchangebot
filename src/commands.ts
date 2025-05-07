import { Bot } from "./bot";
import { TelegramBotView, TelegramResponse } from "./telegramapi";
import { SendingCurrencyUserState, DefaultUserState } from "./userstate";

export interface BotCommand {
    execute(): Promise <TelegramResponse>;
}

export class StartCommand implements BotCommand {
    constructor(private bot: Bot, private chatId: number) {}

    async execute(): Promise <TelegramResponse> {
        const response = await this.bot.view.sendMessage('Привет, я миниботик. Отправь /currency и я дам тебе курс валюты, который ты захочешь', this.chatId)
        return response;
    }
}

export class CurrencyCommand implements BotCommand {
    constructor(private bot: Bot, private chatId: number) {}

    async execute(): Promise <TelegramResponse> {
        const response = await this.bot.view.sendMessage('Укажи валюту в формате ВАЛЮТА-ВАЛЮТА', this.chatId);
        this.bot.userStates[this.chatId] = new SendingCurrencyUserState(this.bot, this.chatId);
        return response;
    }
}

export class CancelCommand implements BotCommand {
    constructor(private bot: Bot, private chatId: number) {}

    async execute(): Promise <TelegramResponse> {
        const response = await this.bot.view.sendMessage('Отмена действия', this.chatId);
        this.bot.userStates[this.chatId] = new DefaultUserState(this.bot, this.chatId);
        return response;
    }
}