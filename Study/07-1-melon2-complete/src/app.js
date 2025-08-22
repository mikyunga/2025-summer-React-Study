import express from "express";
import morgan from "morgan";
import cors from "cors";
import BaseResponseError from "./errors/BaseResponseError";
import chartsRouter from "./routes/chartsRouter";

const app = express();

// 전역 미들웨어
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));
app.use(cors());
app.use(express.static("static"));

app.use("/api/charts", chartsRouter);

app.use((err, req, res, next) => {
  if (err instanceof BaseResponseError)
    return res.status(err.statusCode).json({
      status: "failed",
      message: err.message,
    });
  else
    return res.status(500).json({
      status: "failed",
      message: err.message,
    });
});

export default app;
