import { Module, forwardRef } from '@nestjs/common';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './entities/user.repository';
import { UserResolver } from './user.reslover';
import { AuthModule } from '../auth/auth.module';

@Module({
      imports: [TypeOrmModule.forFeature([UserRepository]), AuthModule],
      providers: [UserService, UserResolver],
      exports: [UserService, TypeOrmModule],
})
export class UserModule {}
