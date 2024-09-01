import React, { useState } from 'react';
import { FlatList, View, StyleSheet, Text, Pressable, TextInput, Modal, Button,} from 'react-native';
import { useNavigate } from 'react-router-native';
import { useDebounce } from 'use-debounce';
import RepositoryItem from './RepositoryItem';
import theme from './theme';
import useRepositories from './hooks/useRepositories';
import { Picker } from '@react-native-picker/picker';

const styles = StyleSheet.create({
  separator: {
    height: 10,
    backgroundColor: theme.colors.separator,
  },
  searchContainer: {
    padding: theme.spacing.medium,
    backgroundColor: theme.colors.background,
    marginBottom: theme.spacing.medium,
  },
  searchInput: {
    height: 40,
    borderColor: theme.colors.separator,
    borderWidth: 1,
    paddingHorizontal: theme.spacing.medium,
    borderRadius: 4,
  },
  sortButton: {
    padding: theme.spacing.medium,
    backgroundColor: theme.colors.primary,
    alignItems: 'center',
    margin: theme.spacing.medium,
    borderRadius: 5,
  },
  sortButtonText: {
    color: theme.colors.white,
    fontSize: 16,
  },
  modalView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent black background
  },
  modalContent: {
    width: '80%',
    backgroundColor: theme.colors.background,
    borderRadius: 10,
    padding: theme.spacing.medium,
    elevation: 5,
  },
  picker: {
    height: 50,
    width: '100%',
    marginBottom: theme.spacing.small,
  },
});

const ItemSeparator = () => <View style={styles.separator} testID="separator" />;

const RepositoryList = () => {
  const [orderBy, setOrderBy] = useState('CREATED_AT'); // Default ordering
  const [orderDirection, setOrderDirection] = useState('DESC'); // Default direction
  const [searchKeyword, setSearchKeyword] = useState(''); // State for search keyword
  const [debouncedKeyword] = useDebounce(searchKeyword, 500); // Debounce the search keyword
  const [modalVisible, setModalVisible] = useState(false); // Modal visibility state
  const { repositories, loading } = useRepositories(orderBy, orderDirection, debouncedKeyword);
  const navigate = useNavigate();

  if (loading) {
    return <Text testID="loading-message">Loading...</Text>;
  }

  if (!repositories || repositories.length === 0) {
    return <Text testID="no-repositories-message">No repositories available</Text>;
  }

  const handlePress = (id) => {
    navigate(`/repository/${id}`);
  };

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <View style={{ flex: 1 }}>
      <Pressable style={styles.sortButton} onPress={openModal}>
        <Text style={styles.sortButtonText}>Sort By</Text>
      </Pressable>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search repositories"
          value={searchKeyword}
          onChangeText={setSearchKeyword}
          autoCapitalize="none"
          autoCorrect={false}
        />
      </View>
      <FlatList
        data={repositories}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={({ item }) => (
          <Pressable onPress={() => handlePress(item.id)} testID={`/repository/${item.id}`}>
            <RepositoryItem item={item} />
          </Pressable>
        )}
        keyExtractor={(item) => item.id}
        testID="repository-list"
        contentContainerStyle={{ flexGrow: 1 }}
      />
      <Modal
        transparent={true}
        visible={modalVisible}
        animationType="slide"
        onRequestClose={closeModal}
      >
        <View style={styles.modalView}>
          <View style={styles.modalContent}>
            <Text style={{ fontSize: 18, marginBottom: theme.spacing.medium }}>Sort and Order</Text>
            <Picker
              selectedValue={orderBy}
              style={styles.picker}
              onValueChange={(itemValue) => setOrderBy(itemValue)}
            >
              <Picker.Item label="Latest Repositories" value="CREATED_AT" />
              <Picker.Item label="Highest Rated Repositories" value="RATING_AVERAGE" />
              <Picker.Item label="Lowest Rated Repositories" value="RATING_AVERAGE" />
            </Picker>
            <Picker
              selectedValue={orderDirection}
              style={styles.picker}
              onValueChange={(itemValue) => setOrderDirection(itemValue)}
            >
              <Picker.Item label="Descending" value="DESC" />
              <Picker.Item label="Ascending" value="ASC" />
            </Picker>
            <Button title="Close" onPress={closeModal} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default RepositoryList;
