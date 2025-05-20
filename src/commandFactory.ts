import { BotCommand, StartCommand, CurrencyCommand } from "./commands";
import { Bot } from "./bot";

export class CommandFactory {
  private bot: Bot;
  constructor(bot: Bot) {
    this.bot = bot;
  }

  public parseCommand(message: string, chatId: number): BotCommand | null {
    switch (message) {
      case "/start":
        return new StartCommand(this.bot, chatId);
      case "/currency":
        return new CurrencyCommand(this.bot, chatId);
      default:
        return null;
    }
  }
}
