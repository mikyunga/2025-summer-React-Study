import express from 'express';
import chartsRouter from './routes/chartsRouter';
import musicsRouter from './routes/musicsRouter';

const app = express();
app.use(express.json());

app.use('/api/charts', chartsRouter);
app.use('/api/musics', musicsRouter);

export default app;
