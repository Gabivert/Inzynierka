import axios from 'axios';
import { getAuthToken } from './AuthHelper';
import { API_BASE_URL } from '@env';

// Pobieranie oczekujących rezerwacji
export const fetchPendingReservations = async () => {
  try {
    const token = await getAuthToken(); // Pobierz token autoryzacji
    const response = await axios.get(`${API_BASE_URL}/api/Reservation/pending`, {
      headers: {
        Authorization: `Bearer ${token}`, // Token w nagłówku
      },
    });
    return response.data; // Zwraca listę rezerwacji
  } catch (error) {
    console.error('Błąd podczas pobierania oczekujących rezerwacji:', error.response?.data || error.message);
    throw error;
  }
};

// Pobieranie listy dostępnych pracowników
export const fetchAvailableEmployees = async (start, end) => {
  try {
    const token = await getAuthToken(); // Pobranie tokenu autoryzacji
    const response = await axios.get(`${API_BASE_URL}/api/manager/available`, {
      headers: {
        Authorization: `Bearer ${token}`, // Token w nagłówku
      },
      params: {
        start, // Początek przedziału czasowego
        end,   // Koniec przedziału czasowego
      },
    });
    return response.data; // Zwracamy listę dostępnych pracowników
  } catch (error) {
    console.error('Błąd podczas pobierania listy dostępnych pracowników:', error.response?.data || error.message);
    throw error;
  }
};

// Przypisanie pracownika do zlecenia
export const assignEmployeeToOrder = async (orderId, employeeId) => {
  try {
    const token = await getAuthToken(); // Pobranie tokenu autoryzacji
    const response = await axios.patch(
      `${API_BASE_URL}/api/Reservation/${orderId}/assign-employee?employeeId=${employeeId}`, // employeeId w parametrze URL
      {}, // Puste ciało żądania
      {
        headers: {
          Authorization: `Bearer ${token}`, // Token w nagłówku
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data; // Zwracamy potwierdzenie przypisania
  } catch (error) {
    console.error(
      'Błąd podczas przypisywania pracownika do zlecenia:',
      error.response?.data || error.message
    );
    throw error;
  }
};

// Pobieranie zleceń w toku i nieopłaconych
export const fetchUnfinishedOrders = async () => {
  try {
    const token = await getAuthToken(); // Pobranie tokenu
    const response = await axios.get(`${API_BASE_URL}/api/reservation/schedule`, {
      headers: {
        Authorization: `Bearer ${token}`, // Dodanie tokenu w nagłówkach
      },
    });
    return response.data; // Zwracamy dane z odpowiedzi
  } catch (error) {
    console.error('Błąd podczas pobierania zleceń w toku:', error.response?.data || error.message);
    throw error;
  }
};

// Oznacz zlecenie jako opłacone
export const markOrderAsPaid = async (orderId) => {
  try {
    const token = await getAuthToken(); // Pobranie tokenu autoryzacji
    const response = await axios.patch(
      `${API_BASE_URL}/api/manager/${orderId}/mark-as-paid`,
      {}, // Puste ciało żądania
      {
        headers: {
          Authorization: `Bearer ${token}`, // Token w nagłówkach
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data; // Zwracamy dane z odpowiedzi
  } catch (error) {
    console.error(
      `Błąd podczas oznaczania zlecenia o ID ${orderId} jako opłacone:`,
      error.response?.data || error.message
    );
    throw error;
  }
}

// Pobieranie przypisanych zleceń do pracownika
export const fetchAssignedOrders = async (employeeId) => {
  try {
    const token = await getAuthToken(); // Pobranie tokenu autoryzacji
    const response = await axios.get(`${API_BASE_URL}/api/manager/${employeeId}/reservations`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data; // Zwracamy dane przypisanych zleceń
  } catch (error) {
    console.error(
      `Błąd podczas pobierania przypisanych zleceń dla pracownika o ID ${employeeId}:`,
      error.response?.data || error.message
    );
    throw error;
  }
};

// Pobieranie historii ukończonych zleceń
export const fetchCompletedOrders = async () => {
  try {
    const token = await getAuthToken(); // Pobieranie tokenu z AsyncStorage
    const response = await axios.get(`${API_BASE_URL}/api/reservation/history`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data; // Zwracanie ukończonych zleceń
  } catch (error) {
    console.error('Błąd podczas pobierania historii zleceń:', error.response?.data || error.message);
    throw error;
  }
};