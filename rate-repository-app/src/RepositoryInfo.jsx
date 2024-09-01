import React from 'react';
import { View, StyleSheet } from 'react-native';
import Text from './Text'; // Adjust the import path as needed
import theme from './theme'; // Adjust the import path as needed

const styles = StyleSheet.create({
  info: {
    marginLeft: 15,
    flex: 1,
  },
  language: {
    color: theme.colors.backgroundWhite,
    backgroundColor: theme.colors.primary,
    alignSelf: 'flex-start',
    paddingVertical: 3,
    paddingHorizontal: 7,
    borderRadius: 5,
    marginBottom: 10,
  },
});

const RepositoryInfo = ({ fullName, description, language, testID }) => {
  return (
    <View style={styles.info} testID={testID}>
      <Text fontWeight="bold" fontSize="subheading" style={{ marginBottom: 5 }} testID="repository-full-name">
        {fullName}
      </Text>
      <Text color="textSecondary" style={{ marginBottom: 5 }} testID="repository-description">
        {description}
      </Text>
      <Text color="backgroundWhite" style={styles.language} testID="repository-language">
        {language}
      </Text>
    </View>
  );
};

export default RepositoryInfo;
