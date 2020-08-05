import config2 from '../config2';
import AsyncStorage from '@react-native-community/async-storage';

const TokenService = {
  async saveAuthToken(token) {
    return await AsyncStorage.setItem("parkfinder-auth-token", token);
  },
  async getAuthToken() {
    return await AsyncStorage.getItem("parkfinder-auth-token");
  },
  async clearAuthToken() {
    return await AsyncStorage.removeItem("parkfinder-auth-token");
  },
  hasAuthToken() {
    return !!TokenService.getAuthToken();
  },
};

export default TokenService;