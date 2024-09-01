import { useMutation, gql } from '@apollo/client';

const CREATE_USER = gql`
  mutation CreateUser($user: CreateUserInput!) {
    createUser(user: $user) {
      id
      username
    }
  }
`;

const useCreateUser = () => {
  const [createUser, { loading, error, data }] = useMutation(CREATE_USER);

  // Log to ensure hook is being used
  console.log('useCreateUser hook initialized');

  return { createUser, loading, error, data };
};

export default useCreateUser;
