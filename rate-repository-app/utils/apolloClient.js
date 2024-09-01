import { ApolloClient, InMemoryCache, ApolloLink, HttpLink, from } from '@apollo/client';
import Constants from 'expo-constants';
import AuthStorage from './authStorage'; // Adjust the import path as needed
import { relayStylePagination } from '@apollo/client/utilities';

// Instantiate AuthStorage
const authStorage = new AuthStorage();

// Create an Apollo Link that attaches the token to the headers
const authLink = new ApolloLink(async (operation, forward) => {
  try {
    // Retrieve the token from AuthStorage
    const token = await authStorage.getAccessToken();
    
    // Log the token to the console
    console.log('Current token:', token);
    
    // Use the token in the headers
    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : '',
      }
    });
  } catch (error) {
    console.error('Failed to set authorization header', error);
  }

  return forward(operation);
});

// Create the HttpLink for your GraphQL server
const httpLink = new HttpLink({
  uri: Constants.expoConfig.extra.apolloUri,
});

// Create the Apollo Client with cache configuration
const createApolloClient = () => {
  return new ApolloClient({
    link: from([authLink, httpLink]), // Combine authLink and httpLink
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            repositories: relayStylePagination(),
          },
        },
        Repository: {
          fields: {
            reviews: relayStylePagination(),
          },
        },
      },
    }),
  });
};

export default createApolloClient;
