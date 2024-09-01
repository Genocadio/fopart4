// components/AppBar.jsx
import React, { useEffect } from 'react';
import { View, StyleSheet, Pressable, ScrollView } from 'react-native';
import { Link } from 'react-router-native'; // Import Link from react-router-native
import Text from './Text'; // Import the custom Text component
import Constants from 'expo-constants';
import theme from './theme';
import useSignOut from './hooks/signOut'; // Import the useSignOut hook
import useMe from './hooks/useMe'; // Import the useMe hook

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.primary,
    padding: 10,
    flexDirection: 'row',
  },
  scrollContainer: {
    flexDirection: 'row', // Ensure the tabs are laid out in a row
  },
  tab: {
    fontSize: theme.fontSizes.subheading,
    fontWeight: theme.fontWeights.bold,
    color: 'white',
    marginRight: 15, // Add some margin to space out the tabs
  },
});

const AppBar = () => {
  const { data, loading, error, isSignedIn } = useMe();
  const signOut = useSignOut(); // Hook for sign-out functionality

  useEffect(() => {
    if (!loading && !error) {
      console.log('User data:', data);
    } else if (error) {
      console.error('Error fetching user data:', error);
    }
  }, [data, loading, error]);

  if (loading) return null; // Optionally, you can show a loading spinner here

  return (
    <View style={styles.container}>
      <ScrollView horizontal contentContainerStyle={styles.scrollContainer}>
        <Link to="/" component={Pressable}>
          <Text style={styles.tab}>Repositories</Text>
        </Link>
        <Link to="/addRev">
        <Text style={styles.tab}> Create a review</Text>
        </Link>
        <Link to="/signup">
        <Text style={styles.tab}>SignUp</Text>
        </Link>
        <Link to="/myreviews">
        <Text style={styles.tab}>My Reviews</Text>
        </Link>
        {isSignedIn ? (
          <Pressable onPress={signOut}>
            <Text style={styles.tab}>Sign Out</Text>
          </Pressable>
        ) : (
          <Link to="/signin" component={Pressable}>
            <Text style={styles.tab}>Sign In</Text>
          </Link>
        )}
      </ScrollView>
    </View>
  );
};

export default AppBar;
