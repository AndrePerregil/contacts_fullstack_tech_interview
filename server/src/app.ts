import "reflect-metadata";
import express, { Request, Response } from "express";
import appRoutes from "./routes";
import "express-async-errors";
import handleErrorMiddleware from "./middlewares/errors/handleError.middleware";

const app = express();

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({ message: "Developed by Andre Perregil" });
});

appRoutes(app);

app.use(handleErrorMiddleware);

export default app;
