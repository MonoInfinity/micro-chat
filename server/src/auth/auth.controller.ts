import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response, Request } from 'express';

//---- Service

import { AuthService } from './auth.service';

import { config } from '../config';

@Controller('auth')
export class AuthController {
    private readonly CLIENT_URL: string[];
    constructor(private readonly authService: AuthService) {
        this.CLIENT_URL = (process.env.CLIENT_URL || '').split(',');
    }

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
            .cookie('auth-token', authToken, { maxAge: config.authController.googleUserCookieTime })
            .redirect(this.CLIENT_URL[0] || '');
    }
}
