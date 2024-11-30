import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomButton from '../../components/CustomButton';
import { fetchOrderDetails } from '../../API/Order_api'; // Import funkcji z API

export default function OrderDetailsScreen({ route }) {
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
    return <Text className="text-center text-gray-500">Nie znaleziono szczegółów zlecenia.</Text>;
  }

  return (
    <ScrollView className="flex-1 bg-custom-light p-4">
      <SafeAreaView>
        <Text className="text-2xl font-bold text-black text-center mb-6">Szczegóły zlecenia</Text>

        {/* Główne informacje */}
        <View className="bg-white p-4 mb-6 rounded-lg shadow">
          <Text className="text-lg font-bold">Zlecenie ID: {orderDetails.id}</Text>
          <Text className="text-sm text-gray-600">Data rozpoczęcia: {orderDetails.startDate}</Text>
          <Text className="text-sm text-gray-600">Data zakończenia: {orderDetails.estimatedEndDate}</Text>
          <Text className="text-sm text-gray-600">Status: {orderDetails.status}</Text>
          <Text className="text-sm text-gray-600">Status płatności: {orderDetails.paymentStatus}</Text>
          <Text className="text-sm text-gray-600">Komentarz: {orderDetails.comment || 'Brak komentarza'}</Text>
        </View>

        {/* Dane pojazdu */}
        <View className="bg-white p-4 mb-6 rounded-lg shadow">
          <Text className="text-lg font-bold">Pojazd</Text>
          <Text className="text-sm text-gray-600">Marka: {orderDetails.vehicle.brand}</Text>
          <Text className="text-sm text-gray-600">Model: {orderDetails.vehicle.model}</Text>
          <Text className="text-sm text-gray-600">Rok produkcji: {orderDetails.vehicle.productionYear}</Text>
          <Text className="text-sm text-gray-600">VIN: {orderDetails.vehicle.vin}</Text>
          <Text className="text-sm text-gray-600">Numer rejestracyjny: {orderDetails.vehicle.registrationNumber}</Text>
        </View>

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

        {/* Lista części */}
        <View className="bg-white p-4 mb-6 rounded-lg shadow">
          <Text className="text-lg font-bold">Części</Text>
          {orderDetails.parts.map((part) => (
            <Text key={part.id} className="text-sm text-gray-700">
              - {part.name} (x{part.quantity}, {part.price * part.quantity} PLN)
            </Text>
          ))}
        </View>

        {/* Koszty */}
        <View className="bg-white p-4 mb-6 rounded-lg shadow">
          <Text className="text-lg font-bold">Koszty</Text>
          <Text className="text-sm text-gray-600">Koszt usług: {orderDetails.totalServicesCost} PLN</Text>
          <Text className="text-sm text-gray-600">Koszt części: {orderDetails.totalPartsCost} PLN</Text>
          <Text className="text-sm text-gray-600">Całkowity koszt: {orderDetails.totalOrderCost} PLN</Text>
        </View>

        {/* Przyciski */}
        <CustomButton title="Pobierz protokół" onPress={() => alert('Protokół pobrany')} className="mb-4" />
        <CustomButton title="Pobierz fakturę" onPress={() => alert('Faktura pobrana')} className="mb-4" />
        <CustomButton title="Zapłać" onPress={() => alert('Przejście do płatności')} />
      </SafeAreaView>
    </ScrollView>
  );
}
