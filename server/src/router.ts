import * as compression from 'compression';
import * as cookieParser from 'cookie-parser';
import * as helmet from 'helmet';
import * as morgan from 'morgan';
import { monoLogger } from 'mono-utils-core';

import { NextFunction, Request, Response } from 'express';
import { INestApplication } from '@nestjs/common';
export const NS_HTTP = 'http-app';

export function router(app: INestApplication) {
      const serverServiceUrl = process.env.SERVICE_SERVER_URL ? process.env.SERVICE_SERVER_URL : '';

      //common middleware
      app.setGlobalPrefix('/api');
      app.use(cookieParser());
      app.enableCors({ origin: serverServiceUrl.split(','), credentials: true });
      app.use(helmet({ contentSecurityPolicy: process.env.NODE_ENV === 'production' ? undefined : false }));
      app.use(compression());
      app.use(
            morgan('dev', {
                  stream: { write: (msg) => monoLogger.log(NS_HTTP, msg) },
            })
      );

      app.use((req: Request, res: Response, next: NextFunction) => {
            //set header
            res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE');
            res.header('Access-Control-Allow-Headers', '*');

            next();
      });
}
