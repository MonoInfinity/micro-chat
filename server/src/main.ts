import * as dotenv from 'dotenv';
dotenv.config({
    path: `config/.env`,
});

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { monoLogger } from 'mono-utils-core';
import { router } from './core/router';
import { config } from './core/config';

export const NS_APP = 'app-main';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    router(app);

    await app.listen(config.PORT, () => {
        monoLogger.log(NS_APP, `Current Mode: ${config.NODE_ENV}`);
        monoLogger.log(NS_APP, `Listening on port ${config.PORT}`);
        monoLogger.log(NS_APP, `Ready to service`);
    });
}
monoLogger.log(NS_APP, `---------------Configuration--------------------`);
console.log(config);

bootstrap();
