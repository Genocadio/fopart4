import { useQuery } from '@apollo/client';
import { GET_REPOSITORY } from '../graphql/queries';

const useRepository = (id, first = 10, after = '') => {
  const { data, loading, error, fetchMore } = useQuery(GET_REPOSITORY, {
    variables: { id, first, after: after || undefined },
    fetchPolicy: 'cache-and-network',
  });

  const repository = data ? data.repository : null;
  const reviews = repository ? repository.reviews.edges.map(edge => edge.node) : [];
  const hasNextPage = repository?.reviews.pageInfo.hasNextPage;
  const endCursor = repository?.reviews.pageInfo.endCursor;

  const loadMoreReviews = () => {
    if (hasNextPage) {
      fetchMore({
        variables: {
          id,
          first,
          after: endCursor || '', // Ensure after is not null
        },
      });
    }
  };

  return {
    repository,
    reviews,
    loading,
    error,
    loadMoreReviews,
    hasNextPage,
  };
};

export default useRepository;
