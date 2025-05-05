require('dotenv').config();
const api_key = process.env.EXCHANGE_API_KEY;

export async function getExchangeRate(base: string, symbol: string): Promise<ExchangeApiResponse> {

    try {
        const raw = await fetch(`https://api.exchangeratesapi.io/v1/latest?access_key=${api_key}&base=${base}&symbols=${symbol}`);
        if (!raw.ok) {
            throw new Error(`Response status: ${raw.status}`);
        }

        console.log(`GET EXCHANGE RATE FOR '${base}-${symbol}'`);
        const json: ExchangeApiResponse = await raw.json();
        console.log(`'${base}-${symbol}' is 1 : ${json.rates[symbol]}`);
        return json;

    } catch (error) {
        if (error instanceof Error) {
            console.error(error.message);
        }
        throw error;
    }
}

export interface ExchangeApiResponse {
    success: boolean;
    timestamp: number;
    base: string;
    date: string;
    rates: Record<string, number>
}

getExchangeRate('EUR', 'USD')
    .then((data) => console.log(data.rates['USD']))
    .catch((error) => {
    console.error(error.message);
});