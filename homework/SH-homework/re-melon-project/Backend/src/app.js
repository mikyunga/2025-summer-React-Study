import express from "express";
import morgan from "morgan";
import cors from "cors";

import chartsRouter from "./routes/chartsRouter";
import musicsRouter from "./routes/musicsRouter";

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/charts", chartsRouter);
app.use("/api/musics", musicsRouter);

export default app;
