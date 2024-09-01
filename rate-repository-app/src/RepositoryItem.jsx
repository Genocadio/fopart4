import React from 'react';
import { View, StyleSheet } from 'react-native';
import Avatar from './Avatar';
import RepositoryInfo from './RepositoryInfo';
import RepositoryStats from './RepositoryStats';
import theme from './theme';

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: theme.colors.backgroundWhite,
  },
  header: {
    flexDirection: 'row',
    marginBottom: 10,
  },
});

const RepositoryItem = ({ item, testID }) => {
  return (
    <View style={styles.container} testID={testID}>
      <View style={styles.header}>
        <Avatar uri={item.ownerAvatarUrl} testID={`avatar-${item.id}`} />
        <RepositoryInfo 
          fullName={item.fullName} 
          description={item.description} 
          language={item.language} 
          testID={`repository-info-${item.id}`} 
        />
      </View>
      <RepositoryStats 
        stars={item.stargazersCount} 
        forks={item.forksCount} 
        rating={item.ratingAverage} 
        reviews={item.reviewCount} 
        testID={`repository-stats-${item.id}`}
      />
    </View>
  );
};

export default RepositoryItem;
