import express, { Express, Request, Response } from "express";
import {
  fetchMarketDataForSymbol,
  initializeBinanceConnector,
} from "./services/data.service";

void main();

async function main() {
  const app: Express = express();
  const port = 3000;

  const connector = await initializeBinanceConnector();

  // GET /data?symbol=""&range=""
  app.get("/data", async (req: Request, res: Response) => {
    const symbol = req.query.symbol;
    const range = req.query.range;

    if (!symbol || !range) {
      res.status(400).send("Invalid parameters");
      return
    }

    const result = await fetchMarketDataForSymbol(connector)({
      symbol: String(symbol),
      timeRange: String(range),
    });
    res.send(result);
  });

  app.listen(port, () => {
    console.log(`Server is running on localhost:${port}`);
  });
}

// TODO:
// 1. Error handling
// 2. Validate input
// 3. implement auto restart on file save for saving dev time
