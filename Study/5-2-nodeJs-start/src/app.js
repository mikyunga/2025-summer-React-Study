import express from 'express';
import usersRouter from './routes/usersRouter';
import postsRouter from './routes/postsRouter';
import logger from './middlewares/logger';

const app = express();

app.use(express.json(), logger('basic'));

app.use('/api/users', logger('specific'), usersRouter);
app.use('/api/posts', postsRouter);

app.use((err, req, res, next) => {
  return res.status(400).json({
    status: 'failed',
    message: err.message,
  });
});
// app.get('/test', (req, res) => {
//   res.send('hi');
// });

// API 명세서
// GET /test 경로
// Request: No
// Response : "hi"

export default app;
