import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request, Response } from 'express';
import { GqlExecutionContext } from '@nestjs/graphql';
//---- Service
import { AuthService } from './auth.service';

//---- Common
import { apiResponse } from '../core/interface/apiResponse';
import User from 'src/user/entities/user.entity';
import { StatusCodes } from 'http-status-codes';

@Injectable()
export class UserGuard implements CanActivate {
    private readonly AUTH_TOKEN_STRING = 'auth-token';

    constructor(private authService: AuthService) {}

    async canActivate(context: ExecutionContext) {
        const { req, res } = GqlExecutionContext.create(context).getContext<{ req: Request; res: Response }>();

        const authToken = req.cookies[this.AUTH_TOKEN_STRING] || '';
        if (!authToken) throw apiResponse.sendError(StatusCodes.UNAUTHORIZED, { errorMessage: 'Login failed' });

        const user = await this.authService.verifyToken<User>(authToken);
        if (!user) {
            res.cookie(this.AUTH_TOKEN_STRING, '', { maxAge: -999 });
            throw apiResponse.sendError(StatusCodes.UNAUTHORIZED, {});
        }

        req.user = user;

        return true;
    }
}
