import "dotenv/config";
import express, { type Request, type Response } from "express";
import morgan from "morgan";

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (_req: Request, res: Response) => {
  res.json({ message: "Hello from Express + TypeScript!" });
});

export default app;
