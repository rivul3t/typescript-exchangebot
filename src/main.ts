import dotenv from "dotenv";
import { Bot } from "./bot";
import { UserState } from "./userstate";
import { TelegramBotView } from "./telegramapi";
import { Exchangerates } from "./exchangeratesApi";

dotenv.config();

const exchange_api_key = process.env.EXCHANGE_API_KEY as string;
const telegram_bot_api_key = process.env.TELEGRAM_BOT_API_KEY as string;
const telegram_timeout_polling = process.env.TELEGRAM_TIMEOUT_POLLING || "5";

const userStates: Record<string, UserState> = {};
const telegramBotView: TelegramBotView = new TelegramBotView(
  telegram_bot_api_key,
  parseInt(telegram_timeout_polling),
);
const exchangeSourse: Exchangerates = new Exchangerates(exchange_api_key);

const bot: Bot = new Bot(userStates, telegramBotView, exchangeSourse);
bot.start();
