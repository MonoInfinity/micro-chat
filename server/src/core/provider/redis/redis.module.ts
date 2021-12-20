import { Module } from '@nestjs/common';
import { createClient } from 'redis';
import { config } from 'src/core/config';

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
                const redis = createClient({ port: config.REDIS_PORT, host: config.REDIS_HOST });
                redis.select(config.REDIS_DB_NUMBER);
                return redis;
            },
        },
    ],
    exports: [RedisService],
})
export class RedisModule {}
