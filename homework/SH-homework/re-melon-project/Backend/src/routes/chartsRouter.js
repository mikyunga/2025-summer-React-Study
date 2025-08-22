// 클릭한 탭에 따른 차트 순위 (id, title, music: [id])
import { Router } from "express";
import chartsData from "../data/chartsData";

const chartsRouter = Router();

// READ (1)
/**
 * [음악 정보 전체 조회 API]
 * GET /api/charts
 *
 * - Request
 *
 * - Response
 * Body
 * [
 *    {
 *      - id: int,
 *      - title: str,
 *      - musics: str[]
 *    }
 * ]
 */

chartsRouter.get("/", (req, res) => {
  // 이건 유효성 검사를 어케하죠
  return res.status(200).json({
    status: "success",
    message: "read successfully",
    data: chartsData,
  });
});

// READ (2)
/**
 * [선택한 카테고리 별 음악 정보 조회 API]
 * GET /api/charts/:id
 *
 * - Request
 *  Path Parameter
 *    - chartId: int
 *
 * - Response
 * Body
 *    {
 *      - id: int,
 *      - title: str,
 *      - musics: str[]
 *    }
 */

chartsRouter.get("/:chartId", (req, res) => {
  const { chartId } = req.params;

  // 유효성 검사
  if (!chartId)
    return res.status(400).json({
      status: "failed",
      message: "charId must exist",
    });

  // Id 값에 맞는 차트 데이터 찾기
  const foundChart = chartsData.find((chart) => chart.id === parseInt(chartId));

  // 유효성 검사
  if (!foundChart)
    return res.status(400).json({
      status: "failed",
      message: "chart not found",
    });

  return res.status(200).json({
    status: "success",
    message: "read successfully",
    data: foundChart,
  });
});

export default chartsRouter;
