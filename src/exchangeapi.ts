export abstract class ExchangeSource {
    public abstract getExchangeRate(base: string, symbol: string): any;
}

export class Exchangerates extends ExchangeSource {
    constructor(private api_key: string) { super(); }

    public async getExchangeRate(base: string, symbol: string): Promise<ExchangeApiResponse> {
        const url: string = `https://api.exchangeratesapi.io/v1/latest?access_key=${this.api_key}&base=${base}&symbols=${symbol}`;

        https://api.exchangeratesapi.io/v1/latest?access_key=49f3363ecf884d8b852c6c968e87fb4c
        try {
            console.log(url)

            const raw = await fetch(url);
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
}

export interface ExchangeApiResponse {
    success: boolean;
    timestamp: number;
    base: string;
    date: string;
    rates: Record<string, number>
}