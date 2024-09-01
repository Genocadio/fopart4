import React from 'react';
import { View, StyleSheet } from 'react-native';
import Text from './Text'; // Import the custom Text component

const styles = StyleSheet.create({
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statText: {
    fontWeight: 'bold',
  },
});

const RepositoryStats = ({ stars, forks, rating, reviews, testID }) => {
  const formatCount = (count) => {
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}k`;
    }
    return count.toString();
  };

  return (
    <View style={styles.stats} testID={testID}>
      <View style={styles.statItem}>
        <Text style={styles.statText} testID={`${testID}-stars-count`}>
          {formatCount(stars)}
        </Text>
        <Text testID={`${testID}-stars-label`}>Stars</Text>
      </View>
      <View style={styles.statItem}>
        <Text style={styles.statText} testID={`${testID}-forks-count`}>
          {formatCount(forks)}
        </Text>
        <Text testID={`${testID}-forks-label`}>Forks</Text>
      </View>
      <View style={styles.statItem}>
        <Text style={styles.statText} testID={`${testID}-rating-count`}>
          {rating}
        </Text>
        <Text testID={`${testID}-rating-label`}>Rating</Text>
      </View>
      <View style={styles.statItem}>
        <Text style={styles.statText} testID={`${testID}-reviews-count`}>
          {reviews}
        </Text>
        <Text testID={`${testID}-reviews-label`}>Reviews</Text>
      </View>
    </View>
  );
};

export default RepositoryStats;
