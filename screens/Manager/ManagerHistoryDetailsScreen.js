import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, ActivityIndicator, Alert } from 'react-native';
import CustomButton from '../../components/CustomButton';
import { fetchOrderDetails } from '../../API/Order_api'; // Funkcja pobierająca szczegóły zlecenia
import { downloadFile } from '../../API/Client_api'; // Funkcja pobierająca pliki
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ManagerHistoryDetailsScreen({ route }) {
  const { orderId } = route.params;
  const [orderDetails, setOrderDetails] = useState(null); // Szczegóły zlecenia
  const [loading, setLoading] = useState(true); // Stan ładowania

  // Pobieranie szczegółów zlecenia
  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const details = await fetchOrderDetails(orderId);
        setOrderDetails(details);
      } catch (error) {
        console.error('Błąd podczas pobierania szczegółów zlecenia:', error.message);
        Alert.alert('Błąd', 'Nie udało się załadować szczegółów zlecenia.');
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [orderId]);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (!orderDetails) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-red-500">Nie znaleziono szczegółów zlecenia.</Text>
      </View>
    );
  }

  const handleDownloadFile = async (fileType, orderId) => {
    try {
      const fileName = `${fileType}_${orderId}.pdf`; // Ustalamy nazwę pliku na podstawie typu i ID zlecenia
      await downloadFile(`/api/Reservation/${orderId}/${fileType}`, fileName);
      console.log('Plik zapisany w:', `${FileSystem.documentDirectory}${fileName}`);
    } catch (error) {
      Alert.alert('Błąd', `Nie udało się pobrać ${fileType}.`);
    }
  };

  return (
    <ScrollView className="flex-1 bg-custom-light p-4">
      <SafeAreaView>
        <Text className="text-2xl font-bold text-black text-center mb-6">Szczegóły zlecenia</Text>

        {/* Szczegóły zlecenia */}
        <View className="bg-white p-4 mb-6 rounded-lg shadow">
          <Text className="text-lg font-bold">Zlecenie ID: {orderDetails.id}</Text>
          <Text className="text-sm text-gray-600">Data rozpoczęcia: {new Date(orderDetails.startDate).toLocaleString()}</Text>
          <Text className="text-sm text-gray-600">Data zakończenia: {new Date(orderDetails.estimatedEndDate).toLocaleString()}</Text>
          <Text className="text-sm text-gray-600">Status: {orderDetails.status}</Text>
          <Text className="text-sm text-gray-600">Klient: {orderDetails.client.firstName} {orderDetails.client.lastName}</Text>
        </View>

        {/* Szczegóły pojazdu */}
        {orderDetails.vehicle && (
          <View className="bg-white p-4 mb-6 rounded-lg shadow">
            <Text className="text-lg font-bold">Pojazd</Text>
            <Text className="text-sm text-gray-600">Marka: {orderDetails.vehicle.brand}</Text>
            <Text className="text-sm text-gray-600">Model: {orderDetails.vehicle.model}</Text>
            <Text className="text-sm text-gray-600">Rok produkcji: {orderDetails.vehicle.productionYear}</Text>
            <Text className="text-sm text-gray-600">VIN: {orderDetails.vehicle.vin}</Text>
            <Text className="text-sm text-gray-600">Numer rejestracyjny: {orderDetails.vehicle.registrationNumber}</Text>
          </View>
        )}

        {/* Dane klienta */}
        <View className="bg-white p-4 mb-6 rounded-lg shadow">
          <Text className="text-lg font-bold">Klient</Text>
          <Text className="text-sm text-gray-600">Imię: {orderDetails.client.firstName}</Text>
          <Text className="text-sm text-gray-600">Nazwisko: {orderDetails.client.lastName}</Text>
          <Text className="text-sm text-gray-600">Numer telefonu: {orderDetails.client.phoneNumber}</Text>
        </View>

        {/* Dane pracownika */}
        {orderDetails.employee && (
          <View className="bg-white p-4 mb-6 rounded-lg shadow">
            <Text className="text-lg font-bold">Pracownik</Text>
            <Text className="text-sm text-gray-600">Imię: {orderDetails.employee.firstName}</Text>
            <Text className="text-sm text-gray-600">Nazwisko: {orderDetails.employee.lastName}</Text>
          </View>
        )}

        {/* Lista usług */}
        <View className="bg-white p-4 mb-6 rounded-lg shadow">
          <Text className="text-lg font-bold">Usługi</Text>
          {orderDetails.services.map((service) => (
            <Text key={service.id} className="text-sm text-gray-700">
              - {service.name} ({service.price} PLN, {service.repairTime} min)
            </Text>
          ))}
        </View>

        {/* Części */}
        <View className="bg-white p-4 mb-6 rounded-lg shadow">
          <Text className="text-lg font-bold mt-4 mb-2">Użyte części:</Text>
          {orderDetails.parts.length > 0 ? (
            orderDetails.parts.map((part) => (
              <Text key={part.id} className="text-sm text-gray-700">
                - {part.name} x{part.quantity} ({part.price * part.quantity} PLN)
              </Text>
            ))
          ) : (
            <Text className="text-sm text-gray-500">Brak przypisanych części</Text>
          )}
        </View>

        {/* Koszty */}
        <View className="bg-white p-4 mb-6 rounded-lg shadow">
          <Text className="text-lg font-bold">Koszty</Text>
          <Text className="text-sm text-gray-600">Koszt usług: {orderDetails.totalServicesCost} PLN</Text>
          <Text className="text-sm text-gray-600">Koszt części: {orderDetails.totalPartsCost} PLN</Text>
          <Text className="text-sm text-gray-600">Całkowity koszt: {orderDetails.totalOrderCost} PLN</Text>
        </View>

        {/* Przyciski */}

        <CustomButton
          title="Pobierz protokół"
          onPress={() => handleDownloadFile('protocol', orderId)} // Wywołanie funkcji dla protokołu
          className="bg-green-500 mt-4"
        />

        <CustomButton
          title="Pobierz fakturę"
          onPress={() => handleDownloadFile('invoice', orderId)} // Wywołanie funkcji dla faktury
          className="bg-blue-500 mt-4"
        />
      </SafeAreaView>
    </ScrollView>
  );
}
