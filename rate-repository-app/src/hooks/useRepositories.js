import { useQuery, gql } from '@apollo/client';

const GET_REPOSITORIES = gql`
  query Repositories(
    $orderBy: AllRepositoriesOrderBy
    $orderDirection: OrderDirection
    $searchKeyword: String
  ) {
    repositories(
      orderBy: $orderBy
      orderDirection: $orderDirection
      searchKeyword: $searchKeyword
    ) {
      edges {
        node {
          id
          fullName
          description
          language
          forksCount
          stargazersCount
          ratingAverage
          reviewCount
          ownerAvatarUrl
        }
      }
    }
  }
`;

const useRepositories = (orderBy, orderDirection, searchKeyword) => {
  const variables = { orderBy, orderDirection, searchKeyword }; // Include searchKeyword
  console.log('useRepositories hook initialized', orderBy, orderDirection, searchKeyword);
  const { data, loading, refetch } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network',
    variables,
  });

  const repositories = data
    ? data.repositories.edges.map(edge => edge.node)
    : [];

  return { repositories, loading, refetch };
};

export default useRepositories;
