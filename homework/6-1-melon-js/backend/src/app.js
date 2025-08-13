import express from 'express';
import cors from 'cors';
import chartsRouter from './routes/chartsRouter.js';
import musicsRouter from './routes/musicsRouter.js';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/charts', chartsRouter);
app.use('/api/musics', musicsRouter);

export default app;
