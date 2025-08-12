import { Router } from 'express';
import chartsData from '../../../frontend/data';
const chartsRouter = Router();

// Read
/**
 * [차트 불러오기 API]
 * GET /api/charts/:chartId
 *
 * - request
 *  - Path Parameter
 *    - chartId: int
 *
 * - response
 *  - body
 *      {
 *        id: int,
 *        title: str,
 *        musics: num[]
 *       }
 *
 * - response example
 *   {
    id: 1,
    title: 'TOP100',
    musics: [
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
    ],
  },
 */
chartsRouter.get('/:chartId', (req, res) => {
  // 1단계
  const { chartId } = req.params;

  // 유효성 검사
  if (!chartId)
    return res.status(400).json({
      status: 'failed',
      message: 'chartId must exist',
    });

  const foundChart = chartsData.find((item) => item.id === parseInt(chartId));
  if (!foundChart)
    return res
      .status(404)
      .json({ status: 'failed', message: 'chart not found' });

  // 2,3단계
  return res.status(200).json({
    status: 'success',
    message: 'read successfully',
    data: foundChart,
  });
});

export default chartsRouter;
