import { gql } from '@apollo/client';

const CURRENT_USER = gql`
  query CurrentUser {
    user {
      id
      name
      email
    }
  }
`;

export { CURRENT_USER };
