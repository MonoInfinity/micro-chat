import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response, Request } from 'express';

//---- Service

import { AuthService } from './auth.service';

import { constant } from '../core/constant';
import { config } from 'src/core/config';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    //---------------------------------- 3rd authentication -----------------------------------------------------------
    @Get('/google')
    @UseGuards(AuthGuard('google'))
    cGoogleAuth() {
        //
    }

    @Get('/google/callback')
    @UseGuards(AuthGuard('google'))
    async cGoogleAuthRedirect(@Req() req: Request, @Res() res: Response) {
        const authToken = await this.authService.createAuthToken(req.user);
        return res
            .cookie('auth-token', authToken, { maxAge: constant.authController.googleUserCookieTime })
            .redirect(config.GOOGLE_CLIENT_REDIRECT_URL);
    }
}
