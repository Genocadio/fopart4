import { gql } from '@apollo/client';

export const GET_CURRENT_USER = gql`
  query getCurrentUser($includeReviews: Boolean = false) {
    me {
      id
      username
      reviews @include(if: $includeReviews) {
        edges {
          node {
            id
            ownerName
            repositoryName
            rating
            text
          }
        }
      }
    }
  }
`;
