import { View } from "./messengerClass";

export class TelegramBotView extends View {
    private bot_api_key;
    private timeout;
    private updateOffset;
    constructor(bot_api_key: string, polling_timeout: number) {
        super();
        this.bot_api_key = bot_api_key;
        this.timeout = polling_timeout;
        this.updateOffset = 0;
    }


    public async getTelegramUpdates(limit: number): Promise<TelegramResponse> {
        const url = `https://api.telegram.org/bot${this.bot_api_key}/getUpdates?offset=${this.updateOffset}&timeout=${this.timeout}&limit=${limit}`;

        const response_raw = await fetch(url);
        if (!response_raw.ok) {
            throw new Error(`Response status: ${response_raw.status}`);
        }

        console.log('GET TELEGRAM UPDATE');
        const json = await response_raw.json();
        
        if (json.result) {
            this.updateOffset = json.result[0].update_id + 1;
        }
        return json;

    }

    public async sendMessage(message: string, chatId: number) {
        const url = `https://api.telegram.org/bot${this.bot_api_key}/sendMessage?chat_id=${chatId}&text=${message}`;
        const response_raw = await fetch(url);
        console.log(url);
        if (!response_raw.ok) {
            throw new Error(`Response status: ${response_raw.status}`);
        }

        console.log(`SEND TELEGRAM MESSAGE '${message}' TO CHAT ${chatId}`);
        const json = await response_raw.json();
        return json;
    }

    async getUnreadedMessage(): Promise<TelegramMessage> {
        let updates = await this.getTelegramUpdates(1);
        return updates.result[0].message;
    }
}

export interface TelegramResponse {
    ok: string;
    result: [TelegramInfo]
}

interface TelegramInfo {
    update_id: number;
    message: TelegramMessage;
}

export interface TelegramMessage {
    message_id: number;
    from: TelegramUser;
    chat: TelegramChat;
    date: number;
    text: string
}

interface TelegramUser {
    id: number;
    isBot: boolean;
    first_name: string;
    username: string;
    language_code: string; 
}

interface TelegramChat {
    id: number;
    first_name: string;
    username: string;
    type: string;
}