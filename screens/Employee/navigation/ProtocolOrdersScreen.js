import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator, Alert, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { fetchEmployeeReservations } from '../../../API/Employee_api';
import CustomButton from '../../../components/CustomButton'; // Przyciski
import { downloadFile } from "../../../API/Client_api";

export default function ProtocolOrdersScreen({ navigation }) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  // Pobieranie zleceń przypisanych do mechanika
  const loadReservations = async () => {
    try {
      setLoading(true);
      const assignedOrders = await fetchEmployeeReservations();
      setOrders(assignedOrders); // Ustaw dane o zleceniach w stanie
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

  const handleDownloadProtocol = async (orderId) => {
    try {
      const fileName = `protocol_${orderId}.pdf`;
      const fileUri = await downloadFile(`/api/Reservation/${orderId}/protocol`, fileName);
      console.log('Plik zapisany w:', fileUri);
    } catch (error) {
      Alert.alert('Błąd', 'Nie udało się pobrać protokołu.');
    }
  };

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

      {/* Przycisk do generowania protokołu */}
      <CustomButton
        title="Utwórz protokół przyjęcia"
        onPress={() => navigation.navigate('CreateProtocol', { orderId: item.id })}
        className="bg-blue-500 mt-4"
      />

      {/* Przycisk do pobrania protokołu */}
      <CustomButton
        title="Pobierz protokół"
        onPress={() => handleDownloadProtocol(item.id)}
        className="bg-green-500 mt-4"
      />
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-custom-light p-4">
      <Text className="text-2xl font-bold text-black text-center mb-6">Zlecenia do protokołu</Text>
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
