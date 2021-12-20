import { TypeOrmModule } from '@nestjs/typeorm';
import User from './user/entities/user.entity';
import { GraphQLModule } from '@nestjs/graphql';
import { GraphQLError, GraphQLFormattedError } from 'graphql';
import { monoEnum } from 'mono-utils-core';
import { config } from './core/config';

export const dbModuleConfig = TypeOrmModule.forRoot({
    type: 'postgres',
    host: config.DB_HOST,
    port: config.DB_PORT,
    username: config.DB_USERNAME,
    password: config.DB_PASSWORD,
    database: config.DB_NAME,
    synchronize: true,
    keepConnectionAlive: true,
    entities: [User],
    extra: { connectionLimit: 1 },
});

export const graphQLModuleConfig = GraphQLModule.forRoot({
    autoSchemaFile: true,
    playground: config.NODE_ENV !== monoEnum.NODE_ENV_MODE.PRODUCTION,
    debug: false,
    cors: {
        origin: config.CLIENT_URL,
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
});
