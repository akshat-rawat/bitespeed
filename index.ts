import express, { Express, Request, Response } from "express";
import { createContactController } from "./src/controllers/ContactController";
import { createConnection } from "typeorm";

const app: Express = express();
app.use(express.json());
const port: number = 3000;

createConnection({
  type: "sqlite",
  database: "src/db/database.sqlite",
  synchronize: true,
  logging: true,
  entities: ["src/db/entity/**/*.ts"],
})
  .then(() => {
    console.log("Connected to the database");
  })
  .catch((error) => {
    console.error("Database connection error:", error);
  });

app.get("/", (req: Request, res: Response) => {
  res.send("Make a post request to /identity");
});

app.post("/identity", createContactController);

app.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});
