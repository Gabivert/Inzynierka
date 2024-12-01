import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, ActivityIndicator, Alert, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { fetchOrderDetails } from '../../API/Order_api';
import { markOrderAsComplete } from '../../API/Employee_api';
import { addPartToOrder } from '../../API/Parts_api';
import CustomButton from '../../components/CustomButton';

export default function EmployeeOrderDetailsScreen({ route, navigation }) {
  const { orderId } = route.params; // ID zlecenia
  const [orderDetails, setOrderDetails] = useState(null); // Szczegóły zlecenia
  const [loading, setLoading] = useState(true); // Stan ładowania
  const [updating, setUpdating] = useState(false); // Stan aktualizacji statusu
  const [isAddingPart, setIsAddingPart] = useState(false); // Kontrola widoczności formularza
  const [part, setPart] = useState({ name: '', serialNumber: '', quantity: '', price: '' });

  // Pobranie szczegółów zlecenia
  const loadOrderDetails = async () => {
    try {
      setLoading(true); // Włącz ładowanie
      const details = await fetchOrderDetails(orderId);
      setOrderDetails(details);
    } catch (error) {
      console.error('Błąd podczas pobierania szczegółów zlecenia:', error.message);
      Alert.alert('Błąd', 'Nie udało się pobrać szczegółów zlecenia.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      loadOrderDetails(); // Odśwież dane po powrocie na ekran
    });
    return unsubscribe;
  }, [navigation]);

  // Funkcja dodawania części
  const handleAddPart = async () => {
    try {
      if (!part.name || !part.serialNumber || !part.quantity || !part.price) {
        Alert.alert('Błąd', 'Wszystkie pola są wymagane.');
        return;
      }

      const newPart = {
        ...part,
        quantity: parseInt(part.quantity, 10),
        price: parseFloat(part.price),
      };

      await addPartToOrder(orderId, newPart);
      Alert.alert('Sukces', 'Część została dodana do zlecenia.');
      setPart({ name: '', serialNumber: '', quantity: '', price: '' }); // Resetowanie formularza
      setIsAddingPart(false); // Ukryj formularz
      loadOrderDetails(); // Odśwież szczegóły zlecenia
    } catch (error) {
      console.error('Błąd podczas dodawania części do zlecenia:', error.message);
      Alert.alert('Błąd', 'Nie udało się dodać części do zlecenia.');
    }
  };

  // Funkcja zmiany statusu zlecenia na "ukończone"
  const handleCompleteOrder = async () => {
    try {
      setUpdating(true);
      const confirmation = await new Promise((resolve) => {
        Alert.alert(
          'Potwierdzenie',
          'Czy na pewno chcesz oznaczyć to zlecenie jako ukończone?',
          [
            { text: 'Anuluj', onPress: () => resolve(false), style: 'cancel' },
            { text: 'Tak', onPress: () => resolve(true) },
          ]
        );
      });

      if (!confirmation) return;

      await markOrderAsComplete(orderId);
      Alert.alert('Sukces', 'Zlecenie zostało oznaczone jako ukończone.');
      navigation.goBack(); // Powrót do listy
      navigation.navigate('Tasks', { refresh: true }); // Wywołanie odświeżenia
    } catch (error) {
      console.error('Błąd podczas zmiany statusu zlecenia:', error.message);
      Alert.alert('Błąd', 'Nie udało się oznaczyć zlecenia jako ukończone.');
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (!orderDetails) {
    return (
      <SafeAreaView className="flex-1 bg-custom-light p-4">
        <Text className="text-center text-gray-500">Nie znaleziono szczegółów zlecenia.</Text>
      </SafeAreaView>
    );
  }

  return (
    <ScrollView className="flex-1 bg-custom-light p-4">
      <SafeAreaView>
        <Text className="text-2xl font-bold text-black text-center mb-6">Szczegóły zlecenia</Text>

        {/* Sekcja szczegółów zlecenia */}
        <View className="bg-white p-4 mb-6 rounded-lg shadow">
          <Text className="text-lg font-bold">Zlecenie</Text>
          <Text className="text-sm text-gray-600">Zlecenie ID: {orderDetails.id}</Text>
          <Text className="text-sm text-gray-600">Data rozpoczęcia: {new Date(orderDetails.startDate).toLocaleString()}</Text>
          <Text className="text-sm text-gray-600">Data zakończenia: {new Date(orderDetails.estimatedEndDate).toLocaleString()}</Text>
          <Text className="text-sm text-gray-600">Status: {orderDetails.status}</Text>
          <Text className="text-sm text-gray-600">Komentarz: {orderDetails.comment || 'Brak komentarzy'}</Text>
        </View>

        {/* Sekcja pojazdu */}
        <View className="bg-white p-4 mb-6 rounded-lg shadow">
          <Text className="text-lg font-bold">Pojazd</Text>
          <Text className="text-sm text-gray-600">Marka: {orderDetails.vehicle.brand}</Text>
          <Text className="text-sm text-gray-600">Model: {orderDetails.vehicle.model}</Text>
          <Text className="text-sm text-gray-600">Rok produkcji: {orderDetails.vehicle.productionYear}</Text>
          <Text className="text-sm text-gray-600">VIN: {orderDetails.vehicle.vin}</Text>
          <Text className="text-sm text-gray-600">Numer rejestracyjny: {orderDetails.vehicle.registrationNumber}</Text>
        </View>

        {/* Sekcja usług */}
        <View className="bg-white p-4 mb-6 rounded-lg shadow">
          <Text className="text-lg font-bold">Usługi</Text>
          {orderDetails.services.length > 0 ? (
            orderDetails.services.map((service) => (
              <Text key={service.id} className="text-sm text-gray-700">
                - {service.name} ({service.price} PLN, {service.repairTime} min)
              </Text>
            ))
          ) : (
            <Text className="text-sm text-gray-500">Brak usług</Text>
          )}
        </View>

        {/* Lista części */}
        <View className="bg-white p-4 mb-6 rounded-lg shadow">
          <Text className="text-lg font-bold">Części</Text>
          {orderDetails.parts.length > 0 ? (
            orderDetails.parts.map((part) => (
              <Text key={part.id} className="text-sm text-gray-700">
                - {part.name} (x{part.quantity}, {part.price * part.quantity} PLN)
              </Text>
            ))
          ) : (
            <Text className="text-sm text-gray-500">Brak części</Text>
          )}

          {/* Przycisk dodawania części */}
          {!isAddingPart && (
            <CustomButton
              title="Dodaj nową część"
              onPress={() => setIsAddingPart(true)}
              className="bg-blue-500 mt-4"
            />
          )}

          <CustomButton
            title="Edycja"
            onPress={() => navigation.navigate('PartsDetails', { orderId, parts: orderDetails.parts })}
            className="bg-custom-blue mt-2"
          />

          {/* Formularz dodawania części */}
          {isAddingPart && (
            <View className="mt-4">
              <TextInput
                placeholder="Nazwa części"
                value={part.name}
                onChangeText={(text) => setPart((prev) => ({ ...prev, name: text }))}
                className="border p-2 mb-2 rounded"
              />
              <TextInput
                placeholder="Numer seryjny"
                value={part.serialNumber}
                onChangeText={(text) => setPart((prev) => ({ ...prev, serialNumber: text }))}
                className="border p-2 mb-2 rounded"
              />
              <TextInput
                placeholder="Ilość"
                value={String(part.quantity)}
                keyboardType="numeric"
                onChangeText={(text) => setPart((prev) => ({ ...prev, quantity: text }))}
                className="border p-2 mb-2 rounded"
              />
              <TextInput
                placeholder="Cena"
                value={String(part.price)}
                keyboardType="decimal-pad"
                onChangeText={(text) => setPart((prev) => ({ ...prev, price: text }))}
                className="border p-2 mb-4 rounded"
              />
              <CustomButton
                title="Dodaj część"
                onPress={handleAddPart}
                className="bg-green-500"
              />
              <CustomButton
                title="Anuluj"
                onPress={() => setIsAddingPart(false)}
                className="bg-red-500 mt-2"
              />
            </View>
          )}
        </View>

        {/* Koszty */}
        <View className="bg-white p-4 mb-6 rounded-lg shadow">
          <Text className="text-lg font-bold">Koszty</Text>
          <Text className="text-sm text-gray-600">Koszt usług: {orderDetails.totalServicesCost} PLN</Text>
          <Text className="text-sm text-gray-600">Koszt części: {orderDetails.totalPartsCost} PLN</Text>
          <Text className="text-sm text-gray-600 font-bold">Całkowity koszt: {orderDetails.totalOrderCost} PLN</Text>
        </View>

        {/* Przycisk oznaczenia jako ukończone */}
        {orderDetails.status !== 'Ukończone' && (
          <CustomButton
            title={updating ? 'Oznaczanie...' : 'Oznacz jako ukończone'}
            onPress={handleCompleteOrder}
            className="bg-green-500 mt-4"
            disabled={updating}
          />
        )}

        <CustomButton
          title="Powrót"
          onPress={() => navigation.goBack()}
          className="bg-custom-dark mt-4"
        />
      </SafeAreaView>
    </ScrollView>
  );
}
