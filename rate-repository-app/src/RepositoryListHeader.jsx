import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker'; // Import Picker for ordering selection
import theme from './theme';

const styles = StyleSheet.create({
  pickerContainer: {
    padding: theme.spacing.medium,
    backgroundColor: theme.colors.background,
  },
  picker: {
    height: 50,
    width: '100%',
    marginBottom: theme.spacing.small,
  },
  searchInput: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    paddingLeft: 10,
    borderRadius: 5,
    marginBottom: theme.spacing.small,
  },
});

const RepositoryListHeader = ({ orderBy, orderDirection, searchKeyword, onOrderByChange, onOrderDirectionChange, onSearchKeywordChange }) => {
  return (
    <View style={styles.pickerContainer}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search repositories..."
        value={searchKeyword}
        onChangeText={onSearchKeywordChange}
      />
      <Picker
        selectedValue={orderBy}
        style={styles.picker}
        onValueChange={onOrderByChange}
      >
        <Picker.Item label="Latest Repositories" value="CREATED_AT" />
        <Picker.Item label="Highest Rated Repositories" value="RATING_AVERAGE" />
        <Picker.Item label="Lowest Rated Repositories" value="RATING_AVERAGE" />
      </Picker>
      <Picker
        selectedValue={orderDirection}
        style={styles.picker}
        onValueChange={onOrderDirectionChange}
      >
        <Picker.Item label="Descending" value="DESC" />
        <Picker.Item label="Ascending" value="ASC" />
      </Picker>
    </View>
  );
};

export default RepositoryListHeader;
