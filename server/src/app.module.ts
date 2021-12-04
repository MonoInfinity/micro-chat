import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import User from './user/entities/user.entity';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

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
      imports: [Config, DBConfig, UserModule, AuthModule],
      controllers: [AppController],
      providers: [AppService],
})
export class AppModule {}
