import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_BASE_URL } from '@env';

// Pobranie dostępnych pracowników
export const fetchAvailableEmployees = async () => {
  try {
    const token = await AsyncStorage.getItem('token');
    if (!token) {
      throw new Error('Brak tokena uwierzytelniającego. Zaloguj się ponownie.');
    }

    const response = await axios.get(`${API_BASE_URL}/api/Employee/available`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data; // Zwraca listę dostępnych pracowników
  } catch (error) {
    console.error('Błąd podczas pobierania dostępnych pracowników:', error.response?.data || error.message);
    throw error;
  }
};

// Pobranie zleceń oczekujących (status: "oczekuje")
export const fetchPendingReservations = async () => {
  try {
    const token = await AsyncStorage.getItem('token');
    if (!token) {
      throw new Error('Brak tokena uwierzytelniającego. Zaloguj się ponownie.');
    }

    const response = await axios.get(`${API_BASE_URL}/api/Reservation/pending`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data; // Zwraca listę oczekujących zleceń
  } catch (error) {
    console.error('Błąd podczas pobierania zleceń oczekujących:', error.response?.data || error.message);
    throw error;
  }
};

// Przypisanie pracownika do zlecenia
export const assignEmployeeToOrder = async (orderId, employeeId) => {
  try {
    const token = await AsyncStorage.getItem('token');
    if (!token) {
      throw new Error('Brak tokena uwierzytelniającego. Zaloguj się ponownie.');
    }

    const response = await axios.patch(
      `${API_BASE_URL}/api/Reservation/${orderId}/assign-employee`,
      { employeeId },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    return response.data; // Zwraca potwierdzenie przypisania
  } catch (error) {
    console.error('Błąd podczas przypisywania pracownika:', error.response?.data || error.message);
    throw error;
  }
};
