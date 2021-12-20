import { LoggerService } from '@nestjs/common';
import { monoLogger } from 'mono-utils-core';
const NS_APP_INFO = 'app-info';
const NS_APP_ERROR = 'app-error';
const NS_APP_WARN = 'app-warn';

export class CustomLogger implements LoggerService {
    /**
     * Write a 'log' level log.
     */
    log(message: any, ...optionalParams: any[]) {
        monoLogger.log(NS_APP_INFO, message);
    }

    /**
     * Write an 'error' level log.
     */
    error(message: any, ...optionalParams: any[]) {
        monoLogger.log(NS_APP_ERROR, message);
    }

    /**
     * Write a 'warn' level log.
     */
    warn(message: any, ...optionalParams: any[]) {
        monoLogger.log(NS_APP_WARN, message);
    }
}
