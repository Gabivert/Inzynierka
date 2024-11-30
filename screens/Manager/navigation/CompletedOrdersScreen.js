import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { fetchCompletedOrders } from '../../../API/Manager_api';
import CustomButton from '../../../components/CustomButton'; // Komponent przycisku

export default function CompletedOrdersScreen({ navigation }) {
  const [orders, setOrders] = useState([]); // Lista ukończonych zleceń
  const [loading, setLoading] = useState(false); // Stan ładowania

  const loadCompletedOrders = async () => {
    try {
      setLoading(true);
      const completedOrders = await fetchCompletedOrders(); // Pobieranie z API
      setOrders(completedOrders);
    } catch (error) {
      console.error('Błąd podczas pobierania historii zleceń:', error.message);
      Alert.alert('Błąd', 'Nie udało się pobrać historii zleceń.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCompletedOrders(); // Załaduj historię zleceń przy montowaniu komponentu
  }, []);

  const renderOrder = ({ item }) => (
    <View className="bg-white p-4 mb-4 rounded-lg shadow">
      <Text className="text-lg font-bold">Zlecenie ID: {item.id}</Text>
      <Text className="text-sm text-gray-600">Data rozpoczęcia: {new Date(item.startDate).toLocaleString()}</Text>
      <Text className="text-sm text-gray-600">Status: {item.status}</Text>
      <Text className="text-sm text-gray-600">Status płatności: {item.paymentStatus}</Text>
      <Text className="text-sm text-gray-600">Klient: {item.clientName}</Text>

      {/* Przycisk szczegółów */}
      <CustomButton
        title="Szczegóły"
        onPress={() => navigation.navigate('ManagerOrderDetails', { orderId: item.id })}
        className="bg-blue-500 mt-4"
      />
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-custom-light p-4">
      <Text className="text-2xl font-bold text-black text-center mb-6">Historia zleceń</Text>
      <Text className="text-2s font-bold text-black text-center mb-6">(zlecenia ze statusem "ukończone" oraz "opłacone")</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={orders}
          renderItem={renderOrder}
          keyExtractor={(item) => item.id.toString()}
          ListEmptyComponent={<Text className="text-center text-gray-500">Brak ukończonych zleceń do wyświetlenia.</Text>}
        />
      )}
    </SafeAreaView>
  );
}
