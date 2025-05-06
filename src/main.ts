require('dotenv').config();
import { Bot } from "./bot";
import { UserState } from "./userstate";
import { TelegramBotView } from "./telegramapi";
import { Exchangerates, ExchangeSource } from "./exchangeapi";

const exchange_api_key = process.env.EXCHANGE_API_KEY as string;
const telegram_bot_api_key = process.env.TELEGRAM_BOT_API_KEY as string;
const telegram_timeout_polling = process.env.TELEGRAM_TIMEOUT_POLLING as string;



const userStates: Record<string, UserState> = {};
const telegramBotView: TelegramBotView = new TelegramBotView(telegram_bot_api_key, parseInt(telegram_timeout_polling));
const exchangeSourse: Exchangerates = new Exchangerates(exchange_api_key);

const bot: Bot = new Bot(userStates, telegramBotView, exchangeSourse);
bot.start();