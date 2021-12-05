import * as React from 'react';

interface UserProfileProps {
      id: string;
      name: string;
      email: string;
      createDate: string;
}

const UserProfile: React.FunctionComponent<UserProfileProps> = ({ createDate, email, id, name }) => {
      return (
            <div>
                  <div>Profile</div>
                  <div>{id}</div>
                  <div>{name}</div>
                  <div>{email}</div>
                  <div>{createDate}</div>
            </div>
      );
};

export default UserProfile;
