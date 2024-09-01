import AuthStorage from '../../utils/authStorage'; // Import AuthStorage
import { useApolloClient } from '@apollo/client'; // Import useApolloClient

const useSignOut = () => {
  const apolloClient = useApolloClient();
  const authStorage = new AuthStorage();

  const signOut = async () => {
    try {
      // Remove the access token
      await authStorage.removeAccessToken();

      // Reset Apollo Client store
      await apolloClient.resetStore();

      console.log("Sign-out successful");
    } catch (error) {
      console.error("Sign-out failed", error);
    }
  };

  return signOut;
};

export default useSignOut;
