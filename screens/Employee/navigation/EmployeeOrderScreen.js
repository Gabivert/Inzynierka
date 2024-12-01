import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { fetchEmployeeReservations } from '../../../API/Employee_api';
import CustomButton from '../../../components/CustomButton'; // Przyciski

export default function EmployeeOrderScreen({ navigation }) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  // Pobieranie zleceń przypisanych do mechanika
  const loadReservations = async () => {
    try {
      setLoading(true);
      const assignedOrders = await fetchEmployeeReservations();
      //console.log('Dane z API:', assignedOrders); // Debug
      setOrders(assignedOrders);
    } catch (error) {
      console.error('Błąd podczas pobierania przypisanych zleceń:', error.message);
      Alert.alert('Błąd', 'Nie udało się pobrać przypisanych zleceń.');
    } finally {
      setLoading(false);
    }
  };
  

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      loadReservations(); // Odświeżenie danych po powrocie na ekran
    });

    return unsubscribe;
  }, [navigation]);

  const renderOrder = ({ item }) => (
    <View className="bg-white p-4 mb-4 rounded-lg shadow">
      <Text className="text-lg font-bold">Zlecenie ID: {item.id}</Text>
      <Text className="text-sm text-gray-600">Data rozpoczęcia: {new Date(item.startDate).toLocaleString()}</Text>
      <Text className="text-sm text-gray-600">Data zakończenia: {new Date(item.estimatedEndDate).toLocaleString()}</Text>
      <Text className="text-sm text-gray-600">Status: {item.status}</Text>
      <Text className="text-sm text-gray-600">
        Pojazd: {item.vehicle.brand} {item.vehicle.model} ({item.vehicle.registrationNumber})
      </Text>
      <Text className="text-sm text-gray-600">Klient: {item.client.firstName} {item.client.lastName}</Text>
      <Text className="text-sm text-gray-600 font-bold">Zadania:</Text>
      {item.tasks.map((task, index) => (
        <Text key={index} className="text-sm text-gray-700">
          - {task.name}
        </Text>
      ))}
      <CustomButton
        title="Szczegóły"
        onPress={() => navigation.navigate('EmployeeOrderDetails', { orderId: item.id })}
        className="bg-blue-500 mt-4"
      />
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-custom-light p-4">
      <Text className="text-2xl font-bold text-black text-center mb-6">Moje zlecenia</Text>
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
