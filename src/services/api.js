import { create } from 'apisauce'
import AsyncStorage from '@react-native-async-storage/async-storage';

const api = create({
  baseURL: 'baseUrl',
  timeout: 15000
})

api.addAsyncRequestTransform(async request => {
  try {
    const token = await AsyncStorage.getItem('@TOKEN');

    if (token) {
      request.headers['Authorization'] = `Bearer ${token}`;
    }
  } catch (error) {
    console.error(error);
  }
});

export default api;