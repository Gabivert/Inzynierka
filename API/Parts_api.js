import axios from 'axios';
import { API_BASE_URL } from '@env';
import { getAuthToken } from './AuthHelper';

// Dodawanie nowej części do zlecenia
export const addPartToOrder = async (orderId, part) => {
    try {
      const token = await getAuthToken(); // Pobierz token autoryzacji
      const response = await axios.post(
        `${API_BASE_URL}/api/part/${orderId}`,
        {
          name: part.name,
          serialNumber: part.serialNumber,
          quantity: parseInt(part.quantity, 10), // Konwersja na int
          price: parseFloat(part.price), // Konwersja na decimal
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Token w nagłówkach
            'Content-Type': 'application/json', // Nagłówek JSON
          },
        }
      );
      return response.data; // Zwrot odpowiedzi API
    } catch (error) {
      console.error('Błąd podczas dodawania części do zlecenia:', error.response?.data || error.message);
      throw error;
    }
  };

  // Aktualizacja części przypisanej do zlecenia
export const updatePartInOrder = async (orderId, partId, partData) => {
    try {
      const token = await getAuthToken(); // Pobierz token autoryzacji
      const response = await axios.put(
        `${API_BASE_URL}/api/part/${orderId}/${partId}`,
        partData,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Dodaj token do nagłówków
          },
        }
      );
      return response.data; // Zwracamy odpowiedź
    } catch (error) {
      console.error('Błąd podczas aktualizacji części:', error.response?.data || error.message);
      throw error;
    }
  };
  
  // Usunięcie części przypisanej do zlecenia
  export const deletePartFromOrder = async (orderId, partId) => {
    try {
      const token = await getAuthToken(); // Pobierz token autoryzacji
      const response = await axios.delete(`${API_BASE_URL}/api/part/${orderId}/${partId}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Dodaj token do nagłówków
        },
      });
      return response.data; // Zwracamy odpowiedź
    } catch (error) {
      console.error('Błąd podczas usuwania części:', error.response?.data || error.message);
      throw error;
    }
  };