import express from 'express';
import postsRouter from './routes/postsRouter';
import path from 'path';
import postsSSRRouter from './routes/postsSSRRouter';
import morgan from 'morgan';
const app = express();

// pug 사용법
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));

// REST API = 앞에 /api가 붙음
app.use('/api/posts', postsRouter);

// SSR
app.use('/posts', postsSSRRouter);

app.use((err, req, res, next) => {
  return res.status(400).json({
    status: 'failed',
    message: err.message,
  });
});

export default app;
