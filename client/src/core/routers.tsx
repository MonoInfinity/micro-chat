import React, { FunctionComponent } from 'react';
import UserProfilePage from '../containers/user/profile';

const LoginPage = React.lazy(() => import('../containers/auth/login'));

export interface RouterItem {
      link: string;
      Component: FunctionComponent;
}

export type RouterPage = 'LoginPage' | 'UserProfilePage';

export const routers: Record<RouterPage, RouterItem> = {
      LoginPage: {
            Component: LoginPage,
            link: '/auth/login',
      },
      UserProfilePage: {
            Component: UserProfilePage,
            link: '/user/me',
      },
};
