/**
 *----------------------------------------------------------------------------------------------------
 *----------------------------------------------------------------------------------------------------
 *----- This is a global config file contains constant of every routers in this project
 *----- Please read the document carefully before changing any thing in this file
 *----- This file is not an environment variable file, please do not store any sensitive configuration in this file
 *----------------------------------------------------------------------------------------------------
 *----------------------------------------------------------------------------------------------------
 */

export const config: Config = {
    authController: {
        // /google/callback
        googleUserCookieTime: 1000 * 60 * 60 * 24 * 30,
    },
};

interface Config {
    authController: AuthControllerConfig;
}

interface AuthControllerConfig {
    /**
     *@description time of cookie when users login with google
     *@description  milliseconds 1h = 60 * 60 * 1000
     */
    readonly googleUserCookieTime: number;
}
