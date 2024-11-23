import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_BASE_URL } from '@env';
import { jwtDecode } from "jwt-decode";

// Logowanie pracownika
export const loginEmployee = async (email, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/EmployeeAuth/login`, {
      email,
      password,
    });

    const { token } = response.data;

    // Dekodujemy token, aby sprawdzić rolę
    const decodedToken = jwtDecode(token);
    if (decodedToken.role !== 'Employee') {
      throw new Error('Nie masz uprawnień do logowania w tym panelu.');
    }

    // Zapisujemy token w pamięci lokalnej
    await AsyncStorage.setItem('token', token);

    return token; // Zwracamy token
  } catch (error) {
    console.error('Błąd logowania pracownika:', error.response?.data || error.message);
    throw error;
  }
};
