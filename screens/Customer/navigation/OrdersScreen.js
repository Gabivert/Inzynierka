import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import CustomButton from '../../../components/CustomButton';
import { SafeAreaView } from 'react-native-safe-area-context';
import { fetchClientOrders } from '../../../API/Order_api'; // Import funkcji z API

export default function OrdersScreen({ navigation }) {
  const [orders, setOrders] = useState([]); // Lista zleceń
  const [loading, setLoading] = useState(false); // Stan ładowania

  // Funkcja pobierania zleceń
  const loadOrders = async () => {
    try {
      setLoading(true);
      const ordersData = await fetchClientOrders(); // Pobranie danych z API
      setOrders(ordersData); // Ustawienie stanu
    } catch (error) {
      console.error('Błąd podczas pobierania zleceń:', error.message);
    } finally {
      setLoading(false);
    }
  };

  // Funkcja odświeżająca listę zleceń
  const refreshOrders = async () => {
    try {
      const updatedOrders = await fetchClientOrders(); // Pobranie aktualnych danych
      console.log('Odświeżone zlecenia:', updatedOrders);
      setOrders(updatedOrders); // Ustawienie nowej listy zleceń
    } catch (error) {
      console.error('Błąd podczas odświeżania zleceń:', error.message);
    }
  };

  useEffect(() => {
    loadOrders(); // Załaduj dane przy pierwszym renderowaniu ekranu
  }, []);

  // Renderowanie pojedynczego zlecenia
  const renderOrder = ({ item }) => (
    <View className="bg-white p-4 mb-4 rounded-lg shadow">
      <Text className="text-lg font-bold">Zlecenie ID: {item.id}</Text>
      <Text className="text-sm text-gray-600">Data rozpoczęcia: {item.startDate}</Text>
      <Text className="text-sm text-gray-600">Data zakończenia: {item.estimatedEndDate}</Text>
      <Text className="text-sm text-gray-600">Status: {item.status}</Text>
      <Text className="text-sm text-gray-600">Status płatności: {item.paymentStatus}</Text>
      <Text className="text-sm text-gray-600">Pojazd: {item.vehicle.brand} {item.vehicle.model}</Text>

      {/* Wyświetlanie listy usług */}
      <Text className="text-sm text-gray-600 font-bold mt-2">Usługi:</Text>
      {item.services.length > 0 ? (
        item.services.map((service) => (
          <Text key={service.id} className="text-sm text-gray-700">
            - {service.name} ({service.price} PLN)
          </Text>
        ))
      ) : (
        <Text className="text-sm text-gray-500">Brak usług</Text>
      )}

      <CustomButton
        title="Zobacz szczegóły"
        onPress={() => navigation.navigate('OrderDetails', { orderId: item.id })}
        className="bg-custom-dark mt-4"
      />
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-custom-light p-4">
      <Text className="text-2xl font-bold text-black text-center mb-6">Moje zlecenia</Text>

      {/* Przycisk Dodaj Zlecenie */}
      <CustomButton
        title="Dodaj zlecenie"
        onPress={() => navigation.navigate('AddOrder')}
        className="bg-blue-500 mb-6"
      />

      {/* Przycisk odświeżania */}
      <CustomButton
        title="Odśwież zlecenia"
        onPress={refreshOrders}
        className="bg-green-500 mb-6"
      />

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={orders}
          renderItem={renderOrder}
          keyExtractor={(item) => item.id.toString()}
          ListEmptyComponent={
            <Text className="text-center text-gray-500">Brak zleceń do wyświetlenia.</Text>
          }
        />
      )}
    </SafeAreaView>
  );
}
