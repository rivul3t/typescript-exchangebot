export abstract class ExchangeSource {
  public abstract getExchangeRate(base: string, symbol: string): any;
}
