## Simple Currency Bot
This bot realized with Telegram as bot provider and exchangeratesapi(https://exchangeratesapi.io/) as exchange rates api. This api allow to get rates only for currency pairs EUR-CURRENCY to non premial users, so you cant get rate for USD-UAH.   

Start bot:  
You must to specify this variables in .env file

require:  
EXCHANGE_API_KEY='YOUR_EXCHANGE_API'  
TELEGRAM_BOT_API_KEY='YOUR_BOT_API' 

optional:
TELEGRAM_TIMEOUT_POLLING='TIME' 


npm i --save-dev @types/node  
tsc  
node dist/main.js