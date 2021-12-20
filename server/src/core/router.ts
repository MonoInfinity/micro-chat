import * as compression from 'compression';
import * as cookieParser from 'cookie-parser';
import * as helmet from 'helmet';
import * as morgan from 'morgan';
import { monoLogger } from 'mono-utils-core';

import { NextFunction, Request, Response } from 'express';
import { GraphqlExceptionHandler } from './exception/graphqlException';
import { INestApplication } from '@nestjs/common';
export const NS_HTTP = 'http-app';
import { monoEnum } from 'mono-utils-core';
import { config } from './config';

export function router(app: INestApplication) {
    //common middleware
    app.use(cookieParser());
    app.enableCors({ origin: config.CLIENT_URL, credentials: true });
    app.setGlobalPrefix('/api');

    app.use((req: Request, res: Response, next: NextFunction) => {
        //set header
        res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE');
        res.header('Access-Control-Allow-Headers', '*');

        next();
    });
    app.useGlobalFilters(new GraphqlExceptionHandler());
    if (config.NODE_ENV === monoEnum.NODE_ENV_MODE.PRODUCTION) {
        app.use(helmet());
        app.use(compression());
    }

    app.use(
        morgan('dev', {
            stream: { write: (msg) => monoLogger.log(NS_HTTP, msg) },
        })
    );
}
