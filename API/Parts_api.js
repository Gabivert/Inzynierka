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
