import { getExchangeRate } from "./exchangeapi";
import { TelegramBotView } from "./telegramapi";
import { UserState } from "./userstate";

export class Bot {
    public userStates: Record<string, UserState>;
    public view: TelegramBotView;

    constructor(view: TelegramBotView) {
        this.view = view;
    }

    public async startBot() {
        while (true) {
            try {
                const message: string = await this.view.getUnreadedMessage();
            } catch {
    
            }
        }
    }
}