import { useMutation, gql } from '@apollo/client';

const CREATE_REVIEW = gql`
  mutation CreateReview($review: CreateReviewInput!) {
    createReview(review: $review) {
      repositoryId
    }
  }
`;

const useCreateReview = () => {
  const [createReview, { data, loading, error }] = useMutation(CREATE_REVIEW);

  return {
    createReview,
    data,
    loading,
    error,
  };
};

export default useCreateReview;
