import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { RedisModule } from './core/provider/redis/redis.module';
import { dbModuleConfig, graphQLModuleConfig } from './module.config';

@Module({
    imports: [dbModuleConfig, graphQLModuleConfig, AuthModule, UserModule, RedisModule],
    controllers: [],
    providers: [],
})
export class AppModule {}
