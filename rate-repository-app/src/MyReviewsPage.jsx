import React, { useEffect } from 'react';
import { View, Text, Button, StyleSheet, Alert, FlatList } from 'react-native';
import useMe from './hooks/useMe'; // Adjust path as necessary
import useDeleteReview from './hooks/useDeleteReview'; // Adjust path as necessary
import { useNavigate } from 'react-router-native';
import theme from './theme';

const MyReviewsPage = () => {
  const navigate = useNavigate();
  const { data, loading, error, refetch, isSignedIn, reviews } = useMe(true); // Fetch reviews
  const { deleteReviewHandler, loading: deleteLoading, error: deleteError } = useDeleteReview();

  useEffect(() => {
    // Refetch data if needed (e.g., after deletion)
    if (data && data.me) {
      refetch();
    }
  }, [data, refetch]);

  const handleDelete = (reviewId) => {
    console.log('Delete review:', reviewId);
    Alert.alert(
      'Confirm Deletion',
      'Are you sure you want to delete this review?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: async () => {
            try {
              await deleteReviewHandler(reviewId);
              refetch(); // Refresh the list of reviews
            } catch (error) {
              console.error('Error deleting review:', error.message);
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  if (!isSignedIn) {
    return <Text>You need to be signed in to view your reviews.</Text>;
  }

  return (
    <View style={styles.container}>
      {deleteLoading && <Text>Deleting review...</Text>}
      {deleteError && <Text>Error deleting review: {deleteError.message}</Text>}
      <FlatList
        data={reviews}
        keyExtractor={(item) => item.node.id}
        renderItem={({ item }) => (
          <View style={styles.reviewCard}>
            <Text style={styles.repositoryName}>{item.node.repository.fullName}</Text>
            <Text style={styles.rating}>Rating: {item.node.rating}</Text>
            <Text style={styles.text}>{item.node.text}</Text>
            <View style={styles.actions}>
              <Button
                title="View Repository"
                onPress={() => navigate(`/repository/${item.node.repositoryId}`)}
              />
              <Button
                title="Delete"
                color="red"
                onPress={() => handleDelete(item.node.id)}
              />
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: theme.spacing.medium,
  },
  reviewCard: {
    marginBottom: theme.spacing.medium,
    padding: theme.spacing.small,
    borderWidth: 1,
    borderColor: theme.colors.textSecondary,
    borderRadius: theme.spacing.small,
  },
  repositoryName: {
    fontWeight: 'bold',
    marginBottom: theme.spacing.small,
  },
  rating: {
    marginBottom: theme.spacing.small,
  },
  text: {
    marginBottom: theme.spacing.small,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default MyReviewsPage;
