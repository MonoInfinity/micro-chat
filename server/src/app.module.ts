import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';

const Config = ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `config/.env`,
});

@Module({
      imports: [Config],
      controllers: [AppController],
      providers: [AppService],
})
export class AppModule {}
