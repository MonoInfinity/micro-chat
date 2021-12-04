import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { GoogleStrategy } from './passport/google.strategy';
import { AuthController } from './auth.controller';
import { JwtService } from '@nestjs/jwt';

@Module({
      imports: [UserModule],
      controllers: [AuthController],
      providers: [
            AuthService,
            GoogleStrategy,
            {
                  provide: JwtService,
                  useFactory: () => {
                        return new JwtService({ secret: process.env.JWT_SECRET_KEY || '' });
                  },
            },
      ],
      exports: [AuthService],
})
export class AuthModule {}
