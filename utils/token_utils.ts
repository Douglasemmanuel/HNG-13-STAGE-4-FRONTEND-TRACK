import AsyncStorage from '@react-native-async-storage/async-storage';

const TOKEN_KEY = '@user_token';

export const TokenStorage = {
  // Save token
setToken: async (token?: string): Promise<void> => {
  if (!token) return;
  try {
    await AsyncStorage.setItem(TOKEN_KEY, token);
    console.log('Token saved successfully.');
  } catch (error) {
    console.error('Error saving token:', error);
  }
},


  // Get token
  getToken: async (): Promise<string | null> => {
    try {
      const token = await AsyncStorage.getItem(TOKEN_KEY);
      return token;
    } catch (error) {
      console.error('Error retrieving token:', error);
      return null;
    }
  },

  // Clear token
  clearToken: async (): Promise<void> => {
    try {
      await AsyncStorage.removeItem(TOKEN_KEY);
      console.log('Token cleared successfully.');
    } catch (error) {
      console.error('Error clearing token:', error);
    }
  },
};
