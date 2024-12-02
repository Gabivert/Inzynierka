import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import CustomButton from '../../../components/CustomButton';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native'; // Import hooka focus
import { fetchPendingReservations } from '../../../API/Manager_api';

export default function AssignEmployeeScreen({ navigation }) {
  const [orders, setOrders] = useState([]); // Lista oczekujących zleceń
  const [loading, setLoading] = useState(false); // Stan ładowania

  // Funkcja do ładowania oczekujących zleceń
  const loadPendingOrders = async () => {
    try {
      setLoading(true);
      const pendingOrders = await fetchPendingReservations(); // Pobieranie z API
      setOrders(pendingOrders);
    } catch (error) {
      console.error('Błąd podczas pobierania zleceń:', error.message);
    } finally {
      setLoading(false);
    }
  };

  // Wywoływanie ładowania zleceń przy każdym powrocie do ekranu
  useFocusEffect(
    React.useCallback(() => {
      loadPendingOrders();
    }, [])
  );

  // Renderowanie pojedynczego zlecenia
  const renderOrder = ({ item }) => (
    <View className="bg-white p-4 mb-4 rounded-lg shadow">
      <Text className="text-lg font-bold">Zlecenie ID: {item.id}</Text>
      <Text className="text-sm text-gray-600">Data rozpoczęcia: {new Date(item.startDate).toLocaleString()}</Text>
      <Text className="text-sm text-gray-600">Data zakończenia: {new Date(item.estimatedEndDate).toLocaleString()}</Text>
      <Text className="text-sm text-gray-600">Status: {item.status}</Text>
      <Text className="text-sm text-gray-600">Klient: {item.clientName}</Text>
      
      <CustomButton
        title="Szczegóły"
        onPress={() => navigation.navigate('ManagerOrderDetails', { orderId: item.id })}
        className="bg-blue-500 mt-4"
      />
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-custom-light p-4">
      <Text className="text-2xl font-bold text-black text-center mb-6">Przypisz pracownika</Text>
      <Text className="text-2s font-bold text-black text-center mb-6">(zlecenia ze statusem "oczekuje")</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={orders}
          renderItem={renderOrder}
          keyExtractor={(item) => item.id.toString()}
          ListEmptyComponent={<Text className="text-center text-gray-500">Brak zleceń do wyświetlenia.</Text>}
        />
      )}
    </SafeAreaView>
  );
}
