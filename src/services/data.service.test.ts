/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, expect, jest, test } from "@jest/globals";
import { fetchMarketDataForSymbol } from "./data.service";

describe("Data service", () => {
  test("Should fetch and return market data", async () => {
    const connectorMock = {
      rollingWindowPriceChangeStatistics: jest.fn(() => {
        return Promise.resolve({
          symbol: "BTCUSDT",
          priceChange: "-773.32000000",
          priceChangePercent: "-1.141",
        });
      }),
    };
    const result = await fetchMarketDataForSymbol(connectorMock as any)({
      symbol: "BTCUSDT",
      timeRange: "1d",
    });

    expect(result).toMatchObject({
      symbol: "BTCUSDT",
      priceChange: "-773.32",
      priceChangePercent: "-114.1%",
    });
  });

  test("Should throw error if API call fails", async () => {
    const connectorMock = {
      rollingWindowPriceChangeStatistics: jest.fn(() => {
        return Promise.reject();
      }),
    };

    await expect(
      fetchMarketDataForSymbol(connectorMock as any)({
        symbol: "BTCUSDT",
        timeRange: "1d",
      })
    ).rejects.toThrow();
  });
});

// check edge case formatting error: percent = 1.140
