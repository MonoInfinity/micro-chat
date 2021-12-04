import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request, Response } from 'express';
import { GqlExecutionContext } from '@nestjs/graphql';
//---- Service
import { AuthService } from './auth.service';

//---- Common
import { apiResponse } from '../app/interface/apiResponse';
import User from 'src/user/entities/user.entity';

@Injectable()
export class UserGuard implements CanActivate {
      constructor(private authService: AuthService) {}

      async canActivate(context: ExecutionContext) {
            const { req, res } = GqlExecutionContext.create(context).getContext<{ req: Request; res: Response }>();

            const authToken = req.cookies['auth-token'] || '';
            if (!authToken) throw apiResponse.sendError(401, {});

            const user = await this.authService.verifyToken<User>(authToken);
            if (!user) {
                  res.cookie('re-token', '', { maxAge: -999 });
                  throw apiResponse.sendError(403, {});
            }

            req.user = user;

            return true;
      }
}
