import { getExchangeRate } from "./exchangeapi";
import { getUnreadedMessage, sendMessage } from "./telegramapi";

async function startBot() {
    while (true) {
        try {
            const message: string = await getUnreadedMessage();
        } catch {

        }
    }
}