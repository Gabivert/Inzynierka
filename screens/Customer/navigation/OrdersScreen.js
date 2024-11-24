import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import CustomButton from '../../../components/CustomButton';
import { SafeAreaView } from 'react-native-safe-area-context';
import { fetchClientOrders } from '../../../API/Order_api'; // Import funkcji z API

export default function OrdersScreen({ navigation }) {
  const [orders, setOrders] = useState([]); // Lista zleceń
  const [loading, setLoading] = useState(false); // Stan ładowania

  // Funkcja pobierania zleceń
  const fetchOrders = async () => {
    try {
      setLoading(true);
      const ordersData = await fetchClientOrders();

      // Mapowanie danych do wyświetlenia
      const mappedOrders = ordersData.map((order) => ({
        id: order.id.toString(),
        startDate: order.startDate,
        endDate: order.estimatedEndDate,
        status: order.status,
        price: `${order.totalCost} PLN`,
      }));

      setOrders(mappedOrders);
    } catch (error) {
      console.error('Błąd podczas pobierania zleceń:', error.message);
    } finally {
      setLoading(false);
    }
  };


  // Pobieranie zleceń przy pierwszym uruchomieniu i po dodaniu zlecenia
  useFocusEffect(
    useCallback(() => {
      fetchOrders();
    }, [])
  );

  // Renderowanie pojedynczego zlecenia
  const renderOrder = ({ item }) => (
    <View className="bg-white p-4 mb-4 rounded-lg shadow">
      <Text className="text-lg font-bold">Zlecenie ID: {item.id}</Text>
      <Text className="text-sm text-gray-600">Data rozpoczęcia: {item.startDate}</Text>
      <Text className="text-sm text-gray-600">Data zakończenia: {item.endDate}</Text>
      <Text className="text-sm text-gray-600">Status: {item.status}</Text>
      <Text className="text-sm text-gray-600">Cena całkowita: {item.price}</Text>
      <CustomButton
        title="Zobacz szczegóły"
        onPress={() => navigation.navigate('OrderDetails', { order: item })}
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

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={orders}
          renderItem={renderOrder}
          keyExtractor={(item) => item.id}
          ListEmptyComponent={
            <Text className="text-center text-gray-500">Brak zleceń do wyświetlenia.</Text>
          }
        />
      )}
    </SafeAreaView>
  );
}