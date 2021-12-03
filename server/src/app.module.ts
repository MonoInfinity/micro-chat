import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

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
      entities: [],
      extra: { connectionLimit: 1 },
});

@Module({
      imports: [Config, DBConfig],
      controllers: [AppController],
      providers: [AppService],
})
export class AppModule {}
