import { monoEnum } from 'mono-utils-core';

export const config = {
    DB_HOST: process.env.DB_HOST || 'localhost',
    DB_USERNAME: process.env.DB_USERNAME || 'myuser',
    DB_PASSWORD: process.env.DB_PASSWORD || 'hello123',
    DB_NAME: process.env.DB_NAME || 'microchat',
    DB_PORT: Number(process.env.DB_PORT) || 5432,

    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID || '',
    GOOGLE_SECRET: process.env.GOOGLE_SECRET || '',
    GOOGLE_CLIENT_REDIRECT_URL: process.env.GOOGLE_CLIENT_REDIRECT || 'http://localhost:4001',
    JWT_SECRET_KEY: process.env.JWT_SECRET_KEY || 'this is secret',
    CLIENT_URL: (process.env.CLIENT_URL || 'http://localhost:4000').split(','),
    SERVER_URL: process.env.SERVER_URL || 'http://localhost:4001',

    REDIS_PORT: Number(process.env.REDIS_PORT) || 6379,
    REDIS_DB_NUMBER: Number(process.env.REDIS_DB_NUMBER) || 1,
    REDIS_HOST: process.env.REDIS_HOST || 'localhost',

    PORT: Number(process.env.PORT) || 4000,
    NODE_ENV: process.env.NODE_ENV || monoEnum.NODE_ENV_MODE.DEVELOPMENT,
    DEBUG: process.env.DEBUG || '',
};
