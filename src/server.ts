import express, { Express, Request, Response } from "express";
import { initializeBinanceConnector } from "./services/data.service";

void main();

async function main() {
  const app: Express = express();
  const port = 3000;

  await initializeBinanceConnector();

  app.get("/", (req: Request, res: Response) => {
    res.send("hello");
  });

  app.listen(port, () => {
    console.log(`Server is running on localhost:${port}`);
  });
}
