import express, { Express, Request, Response } from "express";

const app: Express = express();
const port: number = 3000;

app.get("/", (req: Request, res: Response) => {
  res.send("Server initiated - beep boop");
});

app.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});
