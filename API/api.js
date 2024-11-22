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

    // Dekodowanie tokenu JWT
    const decodedToken = jwtDecode(token);
    const userId = decodedToken.id; // ID użytkownika z tokenu

    const response = await axios.put(`${API_BASE_URL}/api/Auth/update/${userId}`, userData, {
      headers: {
        Authorization: `Bearer ${token}`, // Token w nagłówku
      },
    });

    return response.data; // Zakłada się, że serwer zwraca zaktualizowane dane użytkownika
  } catch (error) {
    console.error('Błąd podczas aktualizacji danych użytkownika:', error.response?.data || error.message);
    throw error;
  }
};



// Usunięcie konta użytkownika
export const deleteUserAccount = async () => {
  try {
    const token = await AsyncStorage.getItem('token'); // Pobranie tokenu z AsyncStorage

    if (!token) {
      throw new Error('Brak tokenu autoryzacji');
    }

    const response = await axios.delete(`${API_BASE_URL}/api/Auth/delete`, {
      headers: {
        Authorization: `Bearer ${token}`, // Token w nagłówku
      },
    });

    return response.data; // Zakłada się, że serwer zwraca potwierdzenie usunięcia
  } catch (error) {
    console.error('Błąd podczas usuwania konta:', error.response?.data || error.message);
    throw error;
  }
};



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
    const response = await axios.put(`${API_BASE_URL}/api/Vehicle/update/${vehicleId}`, vehicleData);
    return response.data; // Zakłada się, że serwer zwraca zaktualizowane dane pojazdu
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


