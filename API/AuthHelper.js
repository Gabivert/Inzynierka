import AsyncStorage from '@react-native-async-storage/async-storage';

// Funkcja pomocnicza do pobierania tokenu z AsyncStorage
export const getAuthToken = async () => {
  try {
    const token = await AsyncStorage.getItem('token'); // Używaj klucza "token", tak jak w Client_api.js
    if (!token) {
      throw new Error('Brak tokenu autoryzacji');
    }
    return token;
  } catch (error) {
    console.error('Błąd podczas pobierania tokenu autoryzacji:', error.message);
    throw error;
  }
};

// Funkcja wylogowania
export const logout = async () => {
  try {
    // Usuń token z pamięci lokalnej
    await AsyncStorage.removeItem('token');
    // Usuń rolę użytkownika z pamięci lokalnej
    await AsyncStorage.removeItem('role');
    console.log('Wylogowano pomyślnie');
  } catch (error) {
    console.error('Błąd podczas wylogowania:', error.message);
    throw error; // Rzucenie błędu w przypadku problemów
  }
};