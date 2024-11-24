import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_BASE_URL } from '@env';

// Dodanie nowego zlecenia
export const addOrder = async (orderData) => {
  try {
    const token = await AsyncStorage.getItem('token');
    if (!token) {
      throw new Error('Brak tokena uwierzytelniającego. Zaloguj się ponownie.');
    }

    const response = await axios.post(
      `${API_BASE_URL}/api/Reservation/finalize`,
      orderData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log('Odpowiedź z API:', response.data);
    return response.data;
  } catch (error) {
    console.error('Błąd podczas dodawania zlecenia:', error.response?.data || error.message);
    throw error;
  }
};

// Pobieranie zleceń klienta
export const fetchClientOrders = async () => {
  try {
    const token = await AsyncStorage.getItem('token');
    if (!token) {
      throw new Error('Brak tokena uwierzytelniającego. Zaloguj się ponownie.');
    }

    const response = await axios.get(`${API_BASE_URL}/api/Reservation/client`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log('Otrzymane zlecenia:', response.data);
    return response.data;
  } catch (error) {
    console.error('Błąd podczas pobierania zleceń klienta:', error.response?.data || error.message);
    throw error;
  }
};
