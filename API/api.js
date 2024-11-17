import axios from 'axios';

const API_BASE_URL = '  https://f0e4-77-255-54-77.ngrok-free.app/api';

// Tworzymy instancję axios z podstawową konfiguracją
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
});

// Funkcja rejestracji użytkownika
export const registerUser = async (data) => {
  try {
    const response = await apiClient.post('/Auth/register', data);
    return response.data;
  } catch (error) {
    console.log("Error in registerUser:", error.response?.data || error.message);
    throw new Error(error.response?.data || 'Błąd rejestracji.');
  }
};


// Funkcja logowania użytkownika
export const loginUser = async (data) => {
  try {
    const response = await apiClient.post('/Auth/login', data);
    return response.data; // Zwracamy odpowiedź
  } catch (error) {
    throw new Error(error.response?.data || 'Błąd logowania.');
  }
};

export const testConnection = async () => {
  try {
    const response = await apiClient.get('/');
    console.log("Odpowiedź backendu:", response.status, response.data);
    return response.data;
  } catch (error) {
    console.log("Błąd połączenia z backendem:", error.message);
    console.log("Szczegóły błędu:", error);
    throw new Error("Nie można połączyć się z backendem.");
  }
};
