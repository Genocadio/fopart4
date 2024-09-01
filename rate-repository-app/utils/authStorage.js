import AsyncStorage from '@react-native-async-storage/async-storage';

class AuthStorage {
  constructor(namespace = 'auth') {
    this.namespace = namespace;
  }

  // Get the access token from storage
  async getAccessToken() {
    try {
      const token = await AsyncStorage.getItem(`${this.namespace}:accessToken`);
      return token;
    } catch (error) {
      console.error("Failed to retrieve access token from storage", error);
      return null;
    }
  }

  // Set the access token in storage
  async setAccessToken(accessToken) {
    try {
      await AsyncStorage.setItem(`${this.namespace}:accessToken`, accessToken);
    } catch (error) {
      console.error("Failed to save access token to storage", error);
    }
  }

  // Remove the access token from storage
  async removeAccessToken() {
    try {
      await AsyncStorage.removeItem(`${this.namespace}:accessToken`);
    } catch (error) {
      console.error("Failed to remove access token from storage", error);
    }
  }
}

export default AuthStorage;
