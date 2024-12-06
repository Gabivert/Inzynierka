import axios from 'axios';
import { API_BASE_URL } from '@env';
import { getAuthToken } from './AuthHelper';

// Przesyłanie opisu protokołu
export const addProtocolDescription = async (orderId, description) => {
    try {
      const token = await getAuthToken();
      const response = await axios.post(
        `${API_BASE_URL}/api/Protocol/${orderId}/description`,
        { description }, // Wysyłamy obiekt z polem `description`
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json', // Typ treści jako JSON
          },
        }
      );
      return response.data; // Zwracamy odpowiedź serwera
    } catch (error) {
      console.error('Błąd podczas przesyłania opisu protokołu:', error.message);
      throw error;
    }
  };
  

// Pobieranie danych protokołu
export const fetchProtocolData = async (orderId) => {
    try {
        const token = await getAuthToken();
        const response = await axios.get(`${API_BASE_URL}/api/Protocol/${orderId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data; // Zwraca szczegóły protokołu
    } catch (error) {
        console.error('Błąd podczas pobierania danych protokołu:', error.message);
        throw error;
    }
};

// Generowanie PDF protokołu
export const generateProtocolPDF = async (orderId) => {
    try {
        const token = await getAuthToken();
        const response = await axios.post(
            `${API_BASE_URL}/api/Protocol/${orderId}/generate-pdf`,
            {},
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return response.data; // Zwraca link do wygenerowanego PDF-a
    } catch (error) {
        console.error('Błąd podczas generowania protokołu PDF:', error.message);
        throw error;
    }
};

// Przesyłanie zdjęcia do protokołu
export const uploadProtocolPhoto = async (orderId, photoUri) => {
    try {
        const token = await getAuthToken();

        // Tworzenie formData dla przesyłania zdjęcia
        const formData = new FormData();
        formData.append('photo', {
            uri: photoUri,
            name: 'photo.jpg', // Możesz zmienić nazwę pliku w zależności od wymagań
            type: 'image/jpeg', // Typ pliku
        });

        const response = await axios.post(
            `${API_BASE_URL}/api/protocol/${orderId}/upload-photo`,
            formData,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            }
        );

        return response.data; // Zwraca odpowiedź serwera
    } catch (error) {
        console.error('Błąd podczas przesyłania zdjęcia:', error.message);
        throw error;
    }
};