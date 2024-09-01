import React from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';
import { useParams } from 'react-router-native';
import RepositoryItem from './RepositoryItem';
import useRepository from './hooks/useRepository';
import { Linking } from 'react-native';
import theme from './theme';
import ReviewItem from './ReviewItem';

const RepositoryView = () => {
  const { id } = useParams();
  const { repository, reviews, loading, error, loadMoreReviews, hasNextPage } = useRepository(id);

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  const handleOpenInGitHub = () => {
    Linking.openURL(repository.url);
  };

  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      ListHeaderComponent={
        <View>
          <RepositoryItem item={repository} showGitHubButton />
          <Button title="Open in GitHub" onPress={handleOpenInGitHub} />
        </View>
      }
      contentContainerStyle={styles.contentContainer}
      onEndReached={hasNextPage ? loadMoreReviews : null}
      onEndReachedThreshold={0.1} // Trigger load more when near end of list
    />
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    padding: theme.spacing.medium,
    backgroundColor: theme.colors.backgroundWhite,
  },
  separator: {
    height: 10,
    backgroundColor: theme.colors.separator,
  },
});

export default RepositoryView;
