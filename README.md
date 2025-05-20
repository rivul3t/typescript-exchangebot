💱 Simple Currency Bot

A simple Telegram bot that provides currency exchange rates using ExchangeRatesAPI.

    ⚠️ Due to limitations of the free plan on exchangeratesapi.io, only conversions from EUR to other currencies are supported (e.g., EUR → USD, EUR → UAH).

📦 Requirements

    Node.js ≥ 16

    A Telegram bot token (from @BotFather)

    ExchangeRatesAPI key (register at exchangeratesapi.io)

🔧 Setup

Clone the repo

    git clone https://github.com/rivul3t/typescript-exchangebot.git
    cd simple-currency-bot

Install dependencies

    npm install

Create a .env file in the project root and add the following:

    EXCHANGE_API_KEY=your_exchange_api_key
    TELEGRAM_BOT_API_KEY=your_telegram_bot_api_key

    # Optional

    TELEGRAM_TIMEOUT_POLLING=300

Compile TypeScript

    tsc

Start the bot

    node dist/main.js

🛠 Example Usage

Send a message to your bot in the format:

    /currency
    EUR-USD


The bot will respond with the current EUR → USD exchange rate.
📌 Limitations

    The free tier of exchangeratesapi.io only supports EUR as the base currency.

    You cannot get rates like USD → UAH or GBP → USD unless you upgrade to a paid plan.

📂 Project Structure

.  
├── src/
│ └── main.ts # Main entry point for the bot  
├── dist/ # Compiled JS files  
├── .env # Configuration  
├── package.json  
└── tsconfig.json  
