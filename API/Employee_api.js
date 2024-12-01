import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_BASE_URL } from '@env';
import { jwtDecode } from "jwt-decode";
import { getAuthToken } from './AuthHelper';

// Logowanie pracownika
export const loginEmployeeOrManager = async (email, password) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/EmployeeAuth/login`, {
        email,
        password,
      });
  
      const { token } = response.data;
  
      // Dekodujemy token, aby sprawdzić rolę
      const decodedToken = jwtDecode(token);
      if (decodedToken.role !== 'Employee' && decodedToken.role !== 'Manager') {
        throw new Error('Nie masz uprawnień do logowania w tym panelu.');
      }
  
      // Zapisujemy token w pamięci lokalnej
      await AsyncStorage.setItem('token', token);
  
      return { token, role: decodedToken.role }; // Zwracamy token i rolę
    } catch (error) {
      console.error('Błąd logowania:', error.response?.data || error.message);
      throw error;
    }
  };
  
// Pobieranie zleceń przypisanych do zalogowanego mechanika
export const fetchEmployeeReservations = async () => {
  try {
    const token = await getAuthToken(); // Pobierz token autoryzacji
    const response = await axios.get(`${API_BASE_URL}/api/Employee/reservations`, {
      headers: {
        Authorization: `Bearer ${token}`, // Dodaj token do nagłówków
      },
    });
    return response.data; // Zwracamy dane o zleceniach
  } catch (error) {
    console.error('Błąd podczas pobierania zleceń przypisanych do mechanika:', error.message);
    throw error;
  }
};

// Oznaczenie zlecenia jako ukończone
export const markOrderAsComplete = async (orderId) => {
  try {
    const token = await getAuthToken(); // Pobierz token autoryzacji
    const response = await axios.patch(
      `${API_BASE_URL}/api/employee/reservations/${orderId}/complete`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data; // Zwróć odpowiedź serwera
  } catch (error) {
    console.error(
      'Błąd podczas oznaczania zlecenia jako ukończone:',
      error.response?.data || error.message
    );
    throw error;
  }
}