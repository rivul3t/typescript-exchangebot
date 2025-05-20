import { View } from "./messengerClass";
import { TelegramMessage } from "./telegramapi";
import { DefaultUserState, UserState } from "./userstate";
import { CommandFactory } from "./commandFactory";
import { BotCommand } from "./commands";
import { ExchangeSource } from "./ExchangeSourceClass";

export class Bot {
  public userStates: Record<string, UserState>;
  public view: View;
  public exchangeSource: ExchangeSource;
  public commandFactory: CommandFactory;

  constructor(
    userStates: Record<string, UserState>,
    view: View,
    exchangeSourse: ExchangeSource,
  ) {
    this.userStates = userStates;
    this.view = view;
    this.exchangeSource = exchangeSourse;
    this.commandFactory = new CommandFactory(this);
  }

  public async start() {
    while (true) {
      try {
        const messageInfo: TelegramMessage =
          await this.view.getUnreadedMessage();
        if (messageInfo === null) {
          setTimeout(() => {}, 5000);
          continue;
        }

        const chatId: number = messageInfo.chat.id;
        const message: string = messageInfo.text;

        if (!(chatId in this.userStates)) {
          this.userStates[chatId] = new DefaultUserState(this, chatId);
        }

        const command: BotCommand | null = this.commandFactory.parseCommand(
          message,
          chatId,
        );
        if (command) {
          command.execute();
        } else {
          this.userStates[chatId].handleMessage(message);
        }
      } catch (error) {
        console.log(error);
      }
    }
  }
}
