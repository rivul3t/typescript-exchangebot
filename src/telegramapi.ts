require('dotenv').config();

export abstract class View {
    abstract getUnreadedMessage(): any;
    abstract sendMessage(message: string, chatId: number): any;
}

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
        try {
            const response_raw = await fetch(url);
            console.log(url);
            if (!response_raw.ok) {
                throw new Error(`Response status: ${response_raw.status}`);
            }
    
            console.log('GET TELEGRAM UPDATE');
            const json = await response_raw.json();
            
            this.updateOffset = json.result[0].updateId + 1;
            
            return json;
        } catch (error) {
            if (error instanceof Error)
                console.error(error.message);
            throw error;
        }
    }

    public async sendMessage(message: string, chatId: number) {
        const url = `https://api.telegram.org/bot${this.bot_api_key}/sendMessage?chat_id=${chatId}&text=${message}`;
        try {
            const response_raw = await fetch(url);
            console.log(url);
            if (!response_raw.ok) {
                throw new Error(`Response status: ${response_raw.status}`);
            }
    
            console.log(`SEND TELEGRAM MESSAGE '${message}' TO CHAT ${chatId}`);
            const json = await response_raw.json();
            return json;
        } catch (error) {
            if (error instanceof Error)
                console.error(error.message);
            throw error;
        }
    }

    async getUnreadedMessage(): Promise<string> {
        try {
            let updates = await this.getTelegramUpdates(1);
            return updates.result[0].message.text;
        } catch (error) {
            if (error instanceof Error)
                console.error(error.message)
            throw error
        }
    }
}

export interface TelegramResponse {
    ok: string;
    result: [TelegramUpdateInfo]
}

interface TelegramUpdateInfo {
    updateId: number;
    message: TelegramUpdateMessage;
}

interface TelegramUpdateMessage {
    messageId: number;
    from: TelegramUser;
    chat: TelegramChat;
    date: number;
    text: string
}

interface TelegramUser {
    id: number;
    isBot: boolean;
    firstName: string;
    username: string;
    languageCode: string; 
}

interface TelegramChat {
    id: number;
    firstName: string;
    username: string;
    type: string;
}