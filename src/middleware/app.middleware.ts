import * as cookieParser from 'cookie-parser';
import * as qs from 'qs';
import * as express from 'express';
import { INestApplication } from '@nestjs/common';

export function setupMiddlewares(app: INestApplication) {
  (app.getHttpAdapter().getInstance() as express.Express).set(
    'query parser',
    (str) => qs.parse(str),
  );

  app.use(cookieParser());
  app.use((req: express.Request, res, next: express.NextFunction) => {
    console.log(`Request: ${req.method} ${req.url}`);
    next();
  });

  app.useLogger(['log', 'warn', 'error']);
}
