require('dotenv').config();
let updateOffset = 0;

const bot_api_key = process.env.TELEGRAM_BOT_API_KEY;
const timeout = process.env.TELEGRAM_TIMEOUT_POLLING;

export async function getTelegramUpdates(limit: number): Promise<TelegramUpdateResponse> {
    const url = `https://api.telegram.org/bot${bot_api_key}/getUpdates?offset=${updateOffset}&timeout=${timeout}&limit=${limit}`;
    try {
        const response_raw = await fetch(url);
        console.log(url);
        if (!response_raw.ok) {
            throw new Error(`Response status: ${response_raw.status}`);
        }

        console.log('GET TELEGRAM UPDATE');
        const json = await response_raw.json();
        
        updateOffset = json.result[0].updateId + 1;
        
        return json;
    } catch (error) {
        if (error instanceof Error)
            console.error(error.message);
        throw error;
    }
}

export async function sendMessage(message: string, chatId: number) {
    const url = `https://api.telegram.org/bot${bot_api_key}/sendMessage?chat_id=${chatId}&text=${message}`;
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

export async function getUnreadedMessage(): Promise<string> {
    try {
        let updates = await getTelegramUpdates(1);
        return updates.result[0].message.text;
    } catch (error) {
        if (error instanceof Error)
            console.error(error.message)
        throw error
    }
}

interface TelegramUpdateResponse {
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