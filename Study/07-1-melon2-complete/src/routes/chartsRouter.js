import { Router } from "express";
import chartsData from "../data/charts";
import musicsData from "../data/musics";

const chartsRouter = Router();

chartsRouter.get("/title", (req, res) => {
  return res.json({
    message: "read successfully",
    status: "success",
    data: chartsData.map(({ id, title }) => ({ id, title })),
  });
});

chartsRouter.get("/:chartId", (req, res) => {
  const { chartId } = req.params;

  if (!chartId) return next(new Error("chartId must exist"));

  const foundChart = chartsData.find((chart) => chart.id === parseInt(chartId));

  if (!foundChart) return next(new Error("chart not found"));

  const populatedChart = {
    ...foundChart,
    musics: foundChart.musics.map((musicId) =>
      musicsData.find((music) => music.id === musicId)
    ),
  };

  console.log(populatedChart);

  return res.json({
    message: "found successfully",
    status: "success",
    data: populatedChart,
  });
});

export default chartsRouter;
