// hooks/useSignIn.js
import { useMutation, useApolloClient } from '@apollo/client';
import { gql } from 'graphql-tag';
import AuthStorage from '../../utils/authStorage'; // Import the AuthStorage class

// Define the authenticate mutation
const AUTHENTICATE_MUTATION = gql`
  mutation Authenticate($credentials: AuthenticateInput!) {
    authenticate(credentials: $credentials) {
      accessToken
    }
  }
`;

const useSignIn = () => {
  const [mutate, result] = useMutation(AUTHENTICATE_MUTATION);
  const apolloClient = useApolloClient(); // Access Apollo Client
  const authStorage = new AuthStorage(); // Instantiate AuthStorage

  const signIn = async ({ username, password }) => {
    try {
      const { data } = await mutate({
        variables: {
          credentials: { username, password },
        },
      });
      console.log('data', data);
      const accessToken = data?.authenticate?.accessToken;
      console.log('accessToken', accessToken);

      if (accessToken) {
        await authStorage.setAccessToken(accessToken); // Store the token
        await apolloClient.resetStore(); // Reset Apollo Client's store
      }

      return data; // Return the result from the mutation
    } catch (error) {
      console.error("Sign-in error:", error);
      throw error; // Re-throw the error to be handled in the component
    }
  };

  return [signIn, result];
};

export default useSignIn;
