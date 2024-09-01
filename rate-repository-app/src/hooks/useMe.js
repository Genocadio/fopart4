// hooks/useMe.js
import { useQuery, gql } from '@apollo/client';

// Define the me query with optional reviews inclusion
const ME_QUERY = gql`
  query getMe($includeReviews: Boolean = false) {
    me {
      id
      username
      reviews @include(if: $includeReviews) {
        edges {
          node {
            id
            text
            rating
            createdAt
            repositoryId
            repository {
              id
              fullName
              description
              language
              stargazersCount
              forksCount
              reviewCount
              ratingAverage
              ownerAvatarUrl
            }
          }
        }
      }
    }
  }
`;

const useMe = (includeReviews = false) => {
  const { data, loading, error, refetch } = useQuery(ME_QUERY, {
    variables: { includeReviews },
  });

  return {
    data,
    loading,
    error,
    refetch,
    isSignedIn: data?.me !== null,
    reviews: data?.me?.reviews?.edges || [], // Extract reviews if available
  };
};

export default useMe;
