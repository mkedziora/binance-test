import express, { Express, NextFunction, Request, Response } from "express";
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
  app.get("/data", async (req: Request, res: Response, next: NextFunction) => {
    const symbol = req.query.symbol;
    const range = req.query.range;

    if (!symbol || !range) {
      res.status(400).send("Invalid parameters");
      return;
    }

    try {
      const result = await fetchMarketDataForSymbol(connector)({
        symbol: String(symbol),
        timeRange: String(range),
      });
      res.send(result);
    } catch (err) {
      next(err);
    }
  });

  // eslint-disable-next-line
  app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err);
    res.status(500).send({ errors: [{ message: "Something went wrong" }] });
  });

  app.listen(port, () => {
    console.log(`Server is running on localhost:${port}`);
  });
}

// TODO:
// 1. Improve error handling, remove eslint disable
// 2. Validate input
// 3. implement auto restart on file save for saving dev time
// 4. improve readme
