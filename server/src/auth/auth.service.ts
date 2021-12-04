import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

//---- Entity
import { User } from '../user/entities/user.entity';

@Injectable()
export class AuthService {
      constructor(private readonly jwtService: JwtService) {}

      //-------------------------------Token Service --------------------------------------

      createAuthToken(user: User) {
            const encryptUser = this.encryptToken(user);
            return encryptUser;
      }

      //--------------------------------Encrypt Decrypt Service -------------------------------

      encryptToken(tokenData: Record<any, any>) {
            try {
                  return this.jwtService.sign(JSON.stringify(tokenData));
            } catch (err) {
                  return null;
            }
      }

      verifyToken<T>(tokenData: string) {
            try {
                  return this.jwtService.verify<any>(tokenData) as T;
            } catch (err) {
                  return null;
            }
      }
}
