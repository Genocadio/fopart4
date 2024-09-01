import React from 'react';
import { FlatList, View, StyleSheet, Text, Pressable } from 'react-native';
import { useNavigate } from 'react-router-native';
// import { Picker } from '@react-native-picker/picker'; // Import Picker for ordering selection
import RepositoryItem from './RepositoryItem';
import theme from './theme';
import useRepositories from './hooks';
import RepositoryListHeader from './RepositoryListHeader'; // Create this component

const styles = StyleSheet.create({
  separator: {
    height: 10,
    backgroundColor: theme.colors.separator,
  },
});

const ItemSeparator = () => <View style={styles.separator} testID="separator" />;

export class RepositoryListContainer extends React.Component {
  state = {
    orderBy: 'CREATED_AT', // Default ordering
    orderDirection: 'DESC', // Default direction
    searchKeyword: '', // Default search keyword
  };

  handleOrderByChange = (orderBy) => {
    this.setState({ orderBy });
  };

  handleOrderDirectionChange = (orderDirection) => {
    this.setState({ orderDirection });
  };

  handleSearchKeywordChange = (searchKeyword) => {
    this.setState({ searchKeyword });
  };

  renderHeader = () => {
    const { orderBy, orderDirection, searchKeyword } = this.state;
    return (
      <RepositoryListHeader
        orderBy={orderBy}
        orderDirection={orderDirection}
        searchKeyword={searchKeyword}
        onOrderByChange={this.handleOrderByChange}
        onOrderDirectionChange={this.handleOrderDirectionChange}
        onSearchKeywordChange={this.handleSearchKeywordChange}
      />
    );
  };

  render() {
    const { orderBy, orderDirection, searchKeyword } = this.state;
    const { repositories, loading } = useRepositories(orderBy, orderDirection, searchKeyword);
    const navigate = useNavigate();

    if (loading) {
      return <Text testID="loading-message">Loading...</Text>;
    }

    if (!repositories || repositories.length === 0) {
      return <Text testID="no-repositories-message">No repositories available</Text>;
    }

    return (
      <FlatList
        data={repositories}
        ItemSeparatorComponent={ItemSeparator}
        ListHeaderComponent={this.renderHeader}
        renderItem={({ item }) => (
          <Pressable onPress={() => navigate(`/repository/${item.id}`)} testID={`/repository/${item.id}`}>
            <RepositoryItem item={item} />
          </Pressable>
        )}
        keyExtractor={(item) => item.id}
        testID="repository-list"
      />
    );
  }
}
