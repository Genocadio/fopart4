import { useMutation, gql } from '@apollo/client';

// Define the GraphQL mutation to delete a review
export const DELETE_REVIEW = gql`
  mutation deleteReview($id: ID!) {
    deleteReview(id: $id)
  }
`;

const useDeleteReview = () => {
  const [deleteReview, { loading, error }] = useMutation(DELETE_REVIEW);

  // Log the results for debugging
  console.log("Delete Review Loading:", loading);
  console.log("Delete Review Error:", error);

  const deleteReviewHandler = async (id) => {
    try {
      const { data } = await deleteReview({ variables: { id } });
      console.log("Deleted Review Data:", data);
      return data;
    } catch (err) {
      console.error('Error deleting review:', err.message);
    }
  };

  return {
    deleteReviewHandler,
    loading,
    error,
  };
};

export default useDeleteReview;
