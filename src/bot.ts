import { TelegramBotView, TelegramMessage } from "./telegramapi";
import { DefaultUserState, UserState } from "./userstate";
import { CommandFactory } from "./commandFactory";

export class Bot {
    public userStates: Record<string, UserState>;
    public view: TelegramBotView;
    public commandFactory: CommandFactory;

    constructor(userStates: Record<string, UserState>, view: TelegramBotView, commandFactory: CommandFactory) {
        this.userStates = userStates;
        this.view = view;
        this.commandFactory = commandFactory;
    }

    public async startBot() {
        while (true) {
            try {
                const messageInfo: TelegramMessage = await this.view.getUnreadedMessage();
                const chatId: number = messageInfo.chat.id;
                const message: string = messageInfo.text;

                if (!(chatId in this.userStates)) {
                    this.userStates[chatId] = new DefaultUserState(this, chatId);
                }

                let command = this.commandFactory.parseCommand(message, chatId);
                if (command) {
                    command.execute();
                } else {
                    this.userStates[chatId].handleMessage(message);
                }
            } catch (error) {
                
            }
        }
    }
}