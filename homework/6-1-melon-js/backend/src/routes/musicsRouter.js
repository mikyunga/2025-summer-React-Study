import { Router } from 'express';
import { musicsData } from '../data.js';

const musicsRouter = Router();
// Read
/**
 * [음악 전체 조회 API]
 * GET /api/musics
 *
 * - request
 *
 * - response
 *  - Body
 *      [
 *        {
 *          id: int,
 *          title: str,
 *          content: str[],
 *          coverImg: str
 *        },
 *      ]
 */
musicsRouter.get('/', (req, res) => {
  return res.json(musicsData);
});
export default musicsRouter;
