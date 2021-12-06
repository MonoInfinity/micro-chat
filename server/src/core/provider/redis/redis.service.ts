import { RedisClient } from 'redis';
import { Injectable, Inject } from '@nestjs/common';
import { monoRedis } from 'mono-utils-core';
const NS_REDIS_SERVICE = 'app-redis-service';

@Injectable()
export class RedisService extends monoRedis.RedisService {
    constructor(@Inject('RedisClient') redisRepository: RedisClient) {
        super(redisRepository, NS_REDIS_SERVICE);
    }
}
