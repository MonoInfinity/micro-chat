import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import User from './user/entities/user.entity';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { GraphQLModule } from '@nestjs/graphql';
import { GraphQLError, GraphQLFormattedError } from 'graphql';
import { monoEnum } from 'mono-utils-core';

const Config = ConfigModule.forRoot({
    isGlobal: true,
    envFilePath: `config/.env`,
});

const DBConfig = TypeOrmModule.forRoot({
    type: 'postgres',
    host: process.env.DB_HOST || '',
    port: Number(process.env.DB_PORT) || 0,
    username: process.env.DB_USERNAME || '',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || '',
    synchronize: true,
    keepConnectionAlive: true,
    entities: [User],
    extra: { connectionLimit: 1 },
});

@Module({
    imports: [
        Config,
        DBConfig,
        GraphQLModule.forRoot({
            autoSchemaFile: true,
            playground: (process.env.NODE_ENV || '') !== monoEnum.NODE_ENV_MODE.PRODUCTION,
            debug: false,
            cors: {
                origin: (process.env.CLIENT_URL || '').split(','),
                credentials: true,
            },
            path: '/api/graphql',
            context: ({ req, res }) => ({
                req,
                res,
            }),
            formatError: (error: GraphQLError) => {
                const graphQLFormattedError: GraphQLFormattedError = {
                    message: error?.extensions?.details,
                    extensions: {
                        status: error?.extensions?.statusCode,
                    },
                };
                return graphQLFormattedError;
            },
        }),
        AuthModule,
        UserModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
