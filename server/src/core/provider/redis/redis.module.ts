import { Module } from '@nestjs/common';
import { createClient } from 'redis';

//---- Service
import { RedisService } from './redis.service';

@Module({
    imports: [],
    controllers: [],
    providers: [
        RedisService,
        {
            provide: 'RedisClient',
            useFactory: () => {
                const redisPort = Number(process.env.REDIS_PORT) || 7000;
                const redis = createClient({ port: redisPort, host: process.env.REDIS_HOST || '' });
                redis.select(process.env.REDIS_DB_NUMBER || 1);
                return redis;
            },
        },
    ],
    exports: [RedisService],
})
export class RedisModule {}
