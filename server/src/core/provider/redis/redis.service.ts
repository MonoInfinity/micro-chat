import { RedisClient } from 'redis';
import { Injectable, Inject } from '@nestjs/common';
import * as flat from 'flat';
import { Promise as BPromise } from 'bluebird';
import { monoLogger } from 'mono-utils-core';

const NS_REDIS_SERVICE = 'app-redis-service';

@Injectable()
export class RedisService {
    constructor(@Inject('RedisClient') private readonly redisRepository: RedisClient) {}

    setObjectByKey(key: string, value: Record<string, any>, expireInSecond?: number) {
        const flatValue: Record<string, any> = flat(value);
        const convertToString = JSON.stringify(flatValue);

        return new BPromise<boolean>((res, rej) => {
            this.redisRepository.set(key, convertToString, (error) => {
                if (error) {
                    monoLogger.log(NS_REDIS_SERVICE, error);
                    return rej(false);
                }
                if (expireInSecond) this.redisRepository.expire(key, expireInSecond);
                return res(true);
            });
        });
    }

    deleteByKey(key: string) {
        return new BPromise<boolean>((res, rej) => {
            this.redisRepository.del(key, (error) => {
                if (error) {
                    monoLogger.log(NS_REDIS_SERVICE, error);
                    return rej(false);
                }
                return res(true);
            });
        });
    }

    getObjectByKey<T>(key: string) {
        return new BPromise<T>((res, rej) => {
            this.redisRepository.get(key, (error, data) => {
                if (error) {
                    monoLogger.log(NS_REDIS_SERVICE, error);
                    return rej(null);
                }

                const convertToJson = flat.unflatten(JSON.parse(data));
                res(convertToJson as T);
            });
        });
    }

    setByValue(key: string, value: number | string, expireInSecond?: number) {
        return new BPromise<boolean>((res, rej) => {
            this.redisRepository.set(key, String(value), (error) => {
                if (error) {
                    monoLogger.log(NS_REDIS_SERVICE, error);
                    return rej(false);
                }
                if (expireInSecond) this.redisRepository.expire(key, expireInSecond);
                return res(true);
            });
        });
    }

    getByKey(key: string): Promise<string> {
        return new BPromise((res, rej) => {
            this.redisRepository.get(key, (error, data) => {
                if (error) {
                    monoLogger.log(NS_REDIS_SERVICE, error);
                    return rej(null);
                }

                res(data);
            });
        });
    }

    getAllKeyWithPattern(pattern: string): Promise<string[]> {
        return new BPromise((res, rej) => {
            this.redisRepository.keys(pattern, (error, data) => {
                if (error) {
                    monoLogger.log(NS_REDIS_SERVICE, error);
                    return rej(null);
                }

                res(data);
            });
        });
    }
}
