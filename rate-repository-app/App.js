import React from 'react';
import { StyleSheet, View } from 'react-native';
import { NativeRouter, Route, Routes } from 'react-router-native';
import RepositoryList from './src/RepositoryList';
import AppBar from './src/AppBar';
import SignIn from './src/SignIn'; // Import the SignIn component
import theme from './src/theme';
import RepositoryView from './src/RepositoryView';
import { ApolloProvider } from '@apollo/client';
import createApolloClient from './utils/apolloClient';
import Constants from 'expo-constants'
import ReviewForm from './src/ReviewForm';
import SignUpForm from './src/SignUpForm';
import MyReviewsPage from './src/MyReviewsPage';

const appolloClient = createApolloClient();

export default function App() {
  console.log(Constants.expoConfig);
  return (
    <NativeRouter>
      <ApolloProvider client={appolloClient}>
      <View style={styles.container}>
        <AppBar />
        <Routes>
          <Route path="/" element={<RepositoryList />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/repository/:id" element={<RepositoryView />} />
          <Route path="/addRev" element={<ReviewForm/>} />
          <Route path="/signup" element={<SignUpForm/>} />
          <Route path="/myreviews" element={<MyReviewsPage/>} />
        </Routes>
      </View>
      </ApolloProvider>
    </NativeRouter>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.backgroundWhite, // Ensure correct background color from the theme
  },
});
