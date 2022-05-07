import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import partitionRouter from './routers/partitionRouter';
import producerRouter from './routers/producerRouter';
import topicRouter from './routers/topicsRouter';
import promPortRouter from './routers/promPortRouter';
import consumerRouter from './routers/consumerRouter';
import zookeeperRouter from './routers/zookeeperRouter';
import overviewRouter from './routers/overviewRouter';
import { ServerError } from '../types';
import 'dotenv/config';

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/prom-port', promPortRouter);
app.use('/api/consumer', consumerRouter);
app.use('/api/partition', partitionRouter);
app.use('/api/producer', producerRouter);
app.use('/api/topic', topicRouter);
app.use('/api/zookeeper', zookeeperRouter);
app.use('/api/overview', overviewRouter);

app.use((req, res) => res.sendStatus(404));


app.use((err: ServerError, req: Request, res: Response, next: NextFunction) => {
  return res.status(err.status ?? 500).json(err.message ?? 'Internal Server Error');
})

app.listen(PORT, () => console.log(`Listening on PORT ${PORT}...`));
