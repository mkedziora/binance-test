import { Spot } from "@binance/connector-typescript";

export {
  initializeBinanceConnector,
  fetchMarketDataForSymbol,
  FetchMarketDataInput,
  FetchMarketDataOutput,
};

type FetchMarketDataInput = {
  symbol: string;
  timeRange: string;
};

type FetchMarketDataOutput = {
  symbol: string;
  priceChange: string;
  priceChangePercent: string;
};

const initializeBinanceConnector = async (): Promise<Spot> => {
  const client = new Spot("", "", {
    baseURL: "https://testnet.binance.vision",
  });

  try {
    await client.testConnectivity();
    return client;
  } catch (error) {
    throw new Error(`Failed to connect to Binance API, reason ${error}`);
  }
};

const fetchMarketDataForSymbol =
  (connector: Spot) =>
  async (input: FetchMarketDataInput): Promise<FetchMarketDataOutput> => {
    try {
      const result = await connector.rollingWindowPriceChangeStatistics({
        symbol: input.symbol,
        windowSize: input.timeRange,
      });
      if (
        "symbol" in result &&
        "priceChange" in result &&
        "priceChangePercent" in result
      )
        return {
          symbol: result.symbol,
          priceChange: Number(result.priceChange).toString(), //prevent trailing zeros
          priceChangePercent: formatPercent(result.priceChangePercent),
        };

      throw new Error("Invalid data output");
    } catch (error) {
      throw new Error(`Failed to fetch data from Binance API, ${error}`);
    }
  };

const formatPercent = (percent: string): string =>
  (Number(percent) * 100).toString() + "%";
