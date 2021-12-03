import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { monoLogger } from 'mono-utils-core';
import { router } from './router';

export const NS_APP = 'app-main';

async function bootstrap() {
      const app = await NestFactory.create(AppModule);
      router(app);
      const port = process.env.PORT || 4000;

      await app.listen(port, () => {
            monoLogger.log(NS_APP, `---------------Configuration--------------------`);
            monoLogger.printEnv(NS_APP, {
                  //db
                  DB_HOST: process.env.DB_HOST || '',
                  DB_USERNAME: process.env.DB_USERNAME || '',
                  DB_PASSWORD: process.env.DB_PASSWORD || '',
                  DB_NAME: process.env.DB_NAME || '',
                  DB_PORT: process.env.DB_PORT || '',
                  //app
                  PORT: process.env.PORT || '',
                  NODE_ENV: process.env.NODE_ENV || '',
                  DEBUG: process.env.DEBUG || '',
            });
            monoLogger.log(NS_APP, `-----------------------------------`);
            monoLogger.log(NS_APP, `Current Mode: ${process.env.NODE_ENV}`);
            monoLogger.log(NS_APP, `Listening on port ${port}`);
            monoLogger.log(NS_APP, `Ready to service`);
      });
}
bootstrap();
