import axios from 'axios';
import { API_BASE_URL } from '@env'; // Zmienna środowiskowa
import AsyncStorage from '@react-native-async-storage/async-storage'; // Aby pobrać token z AsyncStorage
import { jwtDecode } from "jwt-decode";

// Logowanie klienta
export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/Auth/login`, {
      email,
      password,
    });
    return response.data; // Zakładamy, że serwer zwraca obiekt z tokenem
  } catch (error) {
    console.error('Błąd logowania:', error.response?.data || error.message);
    throw error;
  }
};

// Rejestracja klienta
export const registerUser = async (form) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/Auth/register`, form);
    return response.data; // Możesz dostosować, w zależności od tego, co zwraca API
  } catch (error) {
    console.error('Błąd rejestracji:', error.response?.data || error.message);
    throw error;
  }
};

// Pobranie danych zalogowanego użytkownika
export const fetchUserProfile = async () => {
  try {
    const token = await AsyncStorage.getItem('token'); // Pobranie tokenu z AsyncStorage

    if (!token) {
      throw new Error('Brak tokenu autoryzacji');
    }

    // Dekodowanie tokenu JWT
    const decodedToken = jwtDecode(token);
    const userId = decodedToken.id; // Upewnij się, że właściwość `id` istnieje w tokenie

    // Pobranie danych użytkownika
    const response = await axios.get(`${API_BASE_URL}/api/Auth/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data; // Zakładamy, że serwer zwraca dane użytkownika
  } catch (error) {
    console.error(
      'Błąd podczas pobierania danych użytkownika:',
      error.response?.data || error.message
    );
    throw error;
  }
};


// Aktualizacja danych użytkownika
export const updateUserData = async (userData) => {
  try {
    const token = await AsyncStorage.getItem('token'); // Pobranie tokenu z AsyncStorage

    if (!token) {
      throw new Error('Brak tokenu autoryzacji');
    }

    // Pobranie ID użytkownika z tokenu JWT
    const decodedToken = jwtDecode(token);
    const userId = decodedToken.id;

    const response = await axios.put(`${API_BASE_URL}/api/Auth/update/${userId}`, userData, {
      headers: {
        Authorization: `Bearer ${token}`, // Token w nagłówku
      },
    });

    return response.data; // Zwracane dane użytkownika
  } catch (error) {
    console.error('Błąd podczas aktualizacji danych użytkownika:', error.response?.data || error.message);
    throw error;
  }
};

// Weryfikacja hasła użytkownika
export const verifyPassword = async (password) => {
  try {
    const token = await AsyncStorage.getItem('token'); // Pobranie tokenu z AsyncStorage
    if (!token) {
      throw new Error('Brak tokenu autoryzacji');
    }

    const response = await axios.post(
      `${API_BASE_URL}/api/Auth/verify-password`,
      { password }, // Wysyłamy tylko hasło
      {
        headers: {
          Authorization: `Bearer ${token}`, // Token w nagłówku
        },
      }
    );

    return response.data; // Zakładamy, że serwer zwraca potwierdzenie
  } catch (error) {
    console.error('Błąd podczas weryfikacji hasła:', error.response?.data || error.message);
    throw error;
  }
};


// Usunięcie konta użytkownika
export const deleteUserAccount = async (userId) => {
  try {
    const token = await AsyncStorage.getItem('token'); // Pobranie tokenu z AsyncStorage

    if (!token) {
      throw new Error('Brak tokenu autoryzacji');
    }

    const response = await axios.delete(`${API_BASE_URL}/api/Auth/delete/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`, // Token w nagłówku
      },
    });

    return response.data; // Zakładamy, że serwer zwraca potwierdzenie usunięcia
  } catch (error) {
    console.error('Błąd podczas usuwania konta:', error.response?.data || error.message);
    throw error;
  }
};



