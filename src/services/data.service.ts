import { Spot } from "@binance/connector-typescript";

export { initializeBinanceConnector };

const initializeBinanceConnector = async (): Promise<Spot> => {
  const client = new Spot("", "", {
    baseURL: "https://testnet.binance.vision",
  });

  try {
    await client.testConnectivity();
    return client
  } catch (error) {
    throw new Error(`Failed to connect to Binance API, reason ${error}`);
  }
};
