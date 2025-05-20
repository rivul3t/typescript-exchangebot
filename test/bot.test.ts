import { DefaultUserState, SendingCurrencyUserState } from "../src/userstate";
import { Bot } from "../src/bot";

describe("SendingCurrencyUserState", () => {
  it("should send exchange rate and set user state to default", async () => {
    const chatId = 1;
    const currencyPair = "EUR-AED";

    const mockExchangeApi = {
      getExchangeRate: jest.fn().mockResolvedValue({
        rates: {
          AED: 4.121747,
        },
      }),
    };

    const mockView = {
      sendMessage: jest.fn(),
      getUnreadedMessage: jest.fn().mockResolvedValue({
        text: currencyPair,
        chat: {
          id: chatId,
        },
      }),
    };

    const bot = new Bot({}, mockView, mockExchangeApi);

    bot.userStates[chatId] = new SendingCurrencyUserState(bot, chatId);

    await bot.userStates[chatId].handleMessage(currencyPair);
  });
});
