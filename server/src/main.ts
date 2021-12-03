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
