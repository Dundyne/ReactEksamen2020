import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import hpp from 'hpp';
import xssClean from 'xss-clean';

import mongoSanitize from 'express-mongo-sanitize';
import rateLimit from 'express-rate-limit';

import { PORT } from './constants/index.js';
import 'dotenv/config.js';

import connectDatabase from './config/db.js';

const app = express();
app.use(helmet());
app.use(mongoSanitize());
app.use(xssClean());
app.use(hpp());

const limiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 100,
});

app.use(limiter);

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());
app.use(express.static(`${__dirname}/public`));
/*
app.use(
  cors({
    origin: 'http://localhost:3000',
    allowedHeaders: ['Content-Type', 'Authorization', 'x-csrf-token'],
    credentials: true,
  })
);
*/
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(cookieParser());
// app.use(csrf({ cookie: true }));

connectDatabase();

const server = app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);

process.on('unhandledRejection', (err) => {
  console.log(`Error: ${err.message}`);
  console.log('Shutting down server due to Unhandled Promise Rejection');
  server.close(() => {
    process.exit(1);
  });
});
