// 음악 정보 (id, title, authors, coverImg)
import { Router } from "express";
import musicsData from "../data/musicsData";

const musicsRouter = Router();

// READ
/**
 * [노래 정보 전체 조회 API]
 * GET /api/musics
 *
 * - Request
 *
 * - Response
 * Body
 * [
 *    {
 *      - id: int,
 *      - title: str,
 *      - authors: str[],
 *      - coverImg: str
 *    }
 * ]
 */

musicsRouter.get("/", (req, res) => {
  // 얘...도?
  return res.status(200).json({
    status: "success",
    message: "read successfully",
    data: musicsData,
  });
});

export default musicsRouter;
