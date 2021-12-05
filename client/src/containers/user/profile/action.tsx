import gql from 'graphql-tag';

export const getCurrentUser = gql`
      query getUser {
            getCurrentUser {
                  id
                  name
                  email
                  createDate
            }
      }
`;
