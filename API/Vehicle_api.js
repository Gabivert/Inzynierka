import axios from 'axios';
import { API_BASE_URL } from '@env'; // Zmienna środowiskowa
import AsyncStorage from '@react-native-async-storage/async-storage'; // Aby pobrać token z AsyncStorage
import { jwtDecode } from "jwt-decode";

// Pobieranie pojazdów użytkownika
export const fetchVehicles = async () => {
    try {
      // Pobranie tokenu z AsyncStorage
      const token = await AsyncStorage.getItem('token'); 
      
      if (!token) {
        throw new Error('Brak tokenu autoryzacji');
      }
  
      const response = await axios.get(`${API_BASE_URL}/api/Vehicle/my-vehicles`, {
        headers: {
          Authorization: `Bearer ${token}` // Wysyłanie tokenu w nagłówku
        }
      });
  
      return response.data; // Zakłada się, że serwer zwraca tablicę pojazdów
    } catch (error) {
      console.error('Błąd podczas pobierania pojazdów:', error.response?.data || error.message);
      throw error;
    }
  };
  
  // Dodanie pojazdu - używamy tokenów do nagłówków aby zapewnić autoryzację klienta
  export const addVehicle = async (vehicleData) => {
    try {
      // Logowanie danych pojazdu przed wysłaniem do backendu
      console.log("Dane do serializacji:", vehicleData);
      
      const token = await AsyncStorage.getItem('token'); // Pobranie tokenu z AsyncStorage
      
      if (!token) {
        throw new Error('Brak tokenu autoryzacji');
      }
  
      const response = await axios.post(
        `${API_BASE_URL}/api/Vehicle/add`,
        JSON.stringify({
          ...vehicleData,
          productionYear: vehicleData.productionYear,  // Zmieniamy nazwę z "year" na "productionYear"
        }), // Serializacja danych
        {
          headers: {
            Authorization: `Bearer ${token}`, // Token do nagłówka autoryzacji
            'Content-Type': 'application/json', // Ustawienie odpowiedniego nagłówka
          },
        }
      );
      
      return response.data; // Zakłada się, że serwer zwraca dane nowo dodanego pojazdu
    } catch (error) {
      // Logowanie błędów
      console.error('Błąd podczas dodawania pojazdu:', error.response?.data || error.message);
      throw error;
    }
  };
  
  
  // Aktualizacja pojazdu
  export const updateVehicle = async (vehicleId, vehicleData) => {
    try {
      const token = await AsyncStorage.getItem('token'); // Pobranie tokena z pamięci
      if (!token) {
        throw new Error('Brak tokena uwierzytelniającego');
      }
  
      const response = await axios.put(
        `${API_BASE_URL}/api/Vehicle/update/${vehicleId}`,
        vehicleData,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Dodanie tokena JWT do nagłówka
          },
        }
      );
  
      return response.data; // Zwracanie danych z odpowiedzi
    } catch (error) {
      console.error('Błąd podczas aktualizacji pojazdu:', error.response?.data || error.message);
      throw error;
    }
  };
  
  // Usunięcie pojazdu
  export const deleteVehicle = async (vehicleId) => {
    try {
      const token = await AsyncStorage.getItem('token'); // Pobranie tokenu z AsyncStorage
      if (!token) {
        throw new Error('Brak tokenu autoryzacji');
      }
  
      const response = await axios.delete(`${API_BASE_URL}/api/Vehicle/delete/${vehicleId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      return response.data; // Możesz tutaj dostosować, co zwraca API po usunięciu pojazdu
    } catch (error) {
      console.error('Błąd podczas usuwania pojazdu:', error.response?.data || error.message);
      throw error;
    }
  };