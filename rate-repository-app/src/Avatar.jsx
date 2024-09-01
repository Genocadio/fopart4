import React from 'react';
import { Image, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 5,
  },
});

const Avatar = ({ uri, testID }) => {
  return <Image source={{ uri }} style={styles.avatar} testID={testID} />;
};

export default Avatar;
