import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { fetchUnfinishedOrders, markOrderAsPaid } from '../../../API/Manager_api';
import CustomButton from '../../../components/CustomButton'; // Używamy gotowego komponentu przycisku

export default function UnfinishedOrdersScreen() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadUnfinishedOrders = async () => {
    try {
      setLoading(true);
      const unfinishedOrders = await fetchUnfinishedOrders();
      setOrders(unfinishedOrders);
    } catch (error) {
      console.error('Błąd podczas pobierania zleceń:', error.message);
      Alert.alert('Błąd', 'Nie udało się pobrać listy zleceń.');
    } finally {
      setLoading(false);
    }
  };

  // Funkcja odświeżająca listę zleceń
  const refreshOrders = async () => {
    const updatedOrders = await fetchUnfinishedOrders();
    console.log('Odświeżone zlecenia:', updatedOrders);
    setOrders(updatedOrders);
  };

  useEffect(() => {
    loadUnfinishedOrders();
  }, []);

  const handleMarkAsPaid = async (orderId) => {
    try {
      const confirmation = await new Promise((resolve) => {
        Alert.alert(
          'Potwierdzenie',
          'Czy na pewno chcesz oznaczyć to zlecenie jako opłacone?',
          [
            { text: 'Anuluj', onPress: () => resolve(false), style: 'cancel' },
            { text: 'Tak', onPress: () => resolve(true) },
          ]
        );
      });

      if (!confirmation) return;

      await markOrderAsPaid(orderId);
      Alert.alert('Sukces', 'Zlecenie zostało oznaczone jako opłacone.');
      refreshOrders(); // Odświeżenie listy po zmianie statusu
    } catch (error) {
      console.error('Błąd podczas zmiany statusu płatności:', error.message);
      Alert.alert('Błąd', 'Nie udało się zmienić statusu płatności.');
    }
  };

  const renderOrder = ({ item }) => (
    <View className="bg-white p-4 mb-4 rounded-lg shadow">
      <Text className="text-lg font-bold">Zlecenie ID: {item.id}</Text>
      <Text className="text-sm text-gray-600">Data rozpoczęcia: {new Date(item.startDate).toLocaleString()}</Text>
      <Text className="text-sm text-gray-600">Status: {item.status}</Text>
      <Text className="text-sm text-gray-600">Pracownik: {item.employeeName}</Text>
      <Text className="text-sm text-gray-600">Status płatności: {item.paymentStatus}</Text>
      <CustomButton
        title="Zmień status płatności"
        onPress={() => handleMarkAsPaid(item.id)}
        className="bg-blue-500 mt-4"
      />
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-custom-light p-4">
      <Text className="text-2xl font-bold text-black text-center mb-6">Nieukończone zlecenia</Text>
      <Text className="text-2s font-bold text-black text-center mb-6">(ze statusem "oczekuje" oraz potwierdzone, ale nie opłacone)</Text>
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
