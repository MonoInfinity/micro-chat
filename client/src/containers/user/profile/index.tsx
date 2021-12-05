import { useQuery } from '@apollo/client';
import { getCurrentUser } from './action';
import * as React from 'react';
import { User } from '../../../core/interface/user.interface';
import UserProfile from '../../../core/components/user/profile';

interface UserProfilePageProps {}

const UserProfilePage: React.FunctionComponent<UserProfilePageProps> = () => {
      const { data } = useQuery<{ getCurrentUser: User }>(getCurrentUser);

      if (!data) return <div>Not Found</div>;

      return (
            <div>
                  <UserProfile
                        createDate={data.getCurrentUser.createDate}
                        email={data.getCurrentUser.email}
                        id={data.getCurrentUser.id}
                        name={data.getCurrentUser.name}
                  />
            </div>
      );
};

export default UserProfilePage;
