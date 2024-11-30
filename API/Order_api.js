import axios from 'axios';
import { API_BASE_URL } from '@env';
import { getAuthToken } from './AuthHelper'; // Import pomocniczej funkcji

// Pobieranie listy zleceń klienta
export const fetchClientOrders = async () => {
  try {
    const token = await getAuthToken(); // Pobierz token
    const response = await axios.get(`${API_BASE_URL}/api/Reservation/client`, {
      headers: {
        Authorization: `Bearer ${token}`, // Dodaj token do nagłówków
      },
    });
    return response.data; // Bez dodatkowego mapowania
  } catch (error) {
    console.error('Błąd podczas pobierania zleceń klienta:', error.response?.data || error.message);
    throw error;
  }
};


// Pobieranie szczegółów konkretnego zlecenia
export const fetchOrderDetails = async (orderId) => {
  try {
    const token = await getAuthToken(); // Pobierz token
    const response = await axios.get(`${API_BASE_URL}/api/Reservation/${orderId}`, {
      headers: {
        Authorization: `Bearer ${token}`, // Dodaj token do nagłówków
      },
    });
    return response.data;
  } catch (error) {
    console.error('Błąd podczas pobierania szczegółów zlecenia:', error.response?.data || error.message);
    throw error;
  }
};

// Pobieranie danych początkowych (zajęte sloty i dostępne usługi)
export const fetchInitialData = async () => {
  try {
    const token = await getAuthToken(); // Pobranie tokenu przez AuthHelper
    const response = await axios.get(`${API_BASE_URL}/api/reservation/init`, {
      headers: {
        Authorization: `Bearer ${token}`, // Dodanie tokenu w nagłówku
      },
    });
    return response.data; // Zwróć dane z API
  } catch (error) {
    console.error('Błąd podczas pobierania danych początkowych:', error.response?.data || error.message);
    throw error;
  }
};

// Finalizacja rezerwacji (dodawanie nowego zlecenia)
export const addOrder = async (orderData) => {
  try {
    const token = await getAuthToken(); // Pobranie tokenu przez AuthHelper
    const response = await axios.post(`${API_BASE_URL}/api/reservation/finalize`, orderData, {
      headers: {
        Authorization: `Bearer ${token}`, // Dodanie tokenu w nagłówku
      },
    });
    return response.data; // Zwróć dane z odpowiedzi API
  } catch (error) {
    console.error('Błąd podczas finalizacji rezerwacji:', error.response?.data || error.message);
    throw error;
  }
};
