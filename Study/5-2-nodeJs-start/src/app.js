import express from 'express';
import usersRouter from './routes/usersRouter';
import postsRouter from './routes/postsRouter';

const app = express();

app.use(express.json());

app.use('/api/users', usersRouter);
app.use('/api/posts', postsRouter);

// app.get('/test', (req, res) => {
//   res.send('hi');
// });

// API 명세서
// GET /test 경로
// Request: No
// Response : "hi"

export default app;
