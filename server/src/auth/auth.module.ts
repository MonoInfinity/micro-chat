import { Module, forwardRef } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { GoogleStrategy } from './passport/google.strategy';
import { AuthController } from './auth.controller';
import { JwtService } from '@nestjs/jwt';
import { config } from '../core/config';

@Module({
    imports: [forwardRef(() => UserModule)],
    controllers: [AuthController],
    providers: [
        AuthService,
        GoogleStrategy,
        {
            provide: JwtService,
            useFactory: () => {
                return new JwtService({ secret: config.JWT_SECRET_KEY });
            },
        },
    ],
    exports: [AuthService],
})
export class AuthModule {}
