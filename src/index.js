import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger/swagger.json'
import routes from './routes/index.js';
import database from './config/database.js';
import clientRedis from './config/redis.js';

import {
    appErrorHandler,
    genericErrorHandler,
    notFound
} from './middlewares/error.middleware.js';

import logger, { logStream } from './config/logger.js';

import morgan from 'morgan';

const app = express();
const port = process.env.APP_PORT;
const host = process.env.APP_HOST;
const api_version = process.env.API_VERSION;

app.use(cors());
app.use(helmet());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan('combined', { stream: logStream }));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

clientRedis();
database();

app.use(`/api/${api_version}`, routes());
app.use(appErrorHandler);
app.use(genericErrorHandler);
app.use(notFound);

app.listen(port, () => {
    logger.info(`Server started at ${host}:${port}/api/${api_version}/`);
});

export default app;