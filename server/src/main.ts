import * as dotenv from 'dotenv';
dotenv.config({
    path: `config/.env`,
});

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { monoLogger } from 'mono-utils-core';
import { router } from './core/router';
import { config } from './core/config';
import { CustomLogger } from './core/utils/logger';

export const NS_APP = 'app-info';

async function bootstrap() {
    const app = await NestFactory.create(AppModule, { logger: new CustomLogger() });
    router(app);

    await app.listen(config.PORT, () => {
        monoLogger.log(NS_APP, `Current Mode: ${config.NODE_ENV}`);
        monoLogger.log(NS_APP, `Listening on port ${config.PORT}`);
        monoLogger.log(NS_APP, `Ready to service`);
    });
}
monoLogger.log(NS_APP, `---------------Configuration--------------------`);
monoLogger.log(NS_APP, config);
monoLogger.log(NS_APP, `-----------------------------------`);

bootstrap();
