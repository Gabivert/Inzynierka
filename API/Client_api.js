import axios from 'axios';
import { API_BASE_URL } from '@env'; // Zmienna środowiskowa
import { getAuthToken } from './AuthHelper'; // Import pomocniczej funkcji
import { jwtDecode } from "jwt-decode";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import { Buffer } from "buffer"; // Import pakietu buffer
import * as Linking from 'expo-linking';
import AsyncStorage from '@react-native-async-storage/async-storage';


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
    const token = await getAuthToken(); // Pobierz token
    const decodedToken = jwtDecode(token); // Dekodowanie tokenu JWT
    const userId = decodedToken.id; // Sprawdź, czy token zawiera `id`

    const response = await axios.get(`${API_BASE_URL}/api/Auth/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`, // Token w nagłówku
      },
    });

    return response.data;
  } catch (error) {
    console.error(
      'Błąd podczas pobierania danych użytkownika:',
      error.response?.data || error.message
    );
    throw error;
  }
}


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

// // Pobieranie protokołu przyjęcia pojazdu
// export const fetchProtocolLink = async (orderId) => {
//   try {
//       const token = await getAuthToken();
//       const response = await axios.get(`${API_BASE_URL}/api/Reservation/${orderId}/protocol`, {
//           headers: {
//               Authorization: `Bearer ${token}`,
//           },
//       });
//       return response.data; // Zakładamy, że zwraca link do protokołu
//   } catch (error) {
//       console.error('Błąd podczas pobierania protokołu:', error.message);
//       throw error;
//   }
// };

// // Pobieranie faktury
// export const fetchInvoiceLink = async (orderId) => {
//   try {
//       const token = await getAuthToken();
//       const response = await axios.get(`${API_BASE_URL}/api/Reservation/${orderId}/invoice`, {
//           headers: {
//               Authorization: `Bearer ${token}`,
//           },
//       });
//       return response.data; // Zakładamy, że zwraca link do faktury
//   } catch (error) {
//       console.error('Błąd podczas pobierania faktury:', error.message);
//       throw error;
//   }
// };

// Pobieranie i zapisywanie pliku (protokół lub faktura)
export const downloadFile = async (endpoint, filename) => {
  try {
      const token = await getAuthToken();
      const response = await axios.get(`${API_BASE_URL}${endpoint}`, {
          headers: {
              Authorization: `Bearer ${token}`,
              "Cache-Control": "no-cache",
          },
          responseType: "arraybuffer",
      });
      const base64Data = Buffer.from(response.data, "binary").toString("base64");
      const fileUri = `${FileSystem.documentDirectory}${filename}`;
      await FileSystem.writeAsStringAsync(fileUri, base64Data, {
          encoding: FileSystem.EncodingType.Base64,
      });
      if (await Sharing.isAvailableAsync()) {
          await Sharing.shareAsync(fileUri);
      } else {
          console.log("Udostępnianie plików nie jest dostępne na tym urządzeniu.");
      }
  } catch (error) {
      console.error("Błąd podczas pobierania pliku:", error.message);
      throw error;
  }
};

// Przekierowanie na stronę paypala
const redirectToPayPal = async () => {
  const payPalUrl = 'https://www.paypal.com'; // Statyczny link PayPala lub strona płatności

  try {
    const supported = await Linking.canOpenURL(payPalUrl);
    if (supported) {
      await Linking.openURL(payPalUrl); // Otwórz PayPala w domyślnej przeglądarce
    } else {
      Alert.alert('Błąd', 'Nie można otworzyć strony PayPala.');
    }
  } catch (error) {
    console.error('Błąd podczas przekierowania do PayPala:', error);
    Alert.alert('Błąd', 'Wystąpił problem z przekierowaniem do PayPala.');
  }
};