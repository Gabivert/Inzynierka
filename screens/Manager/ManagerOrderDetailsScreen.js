import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, ActivityIndicator, Alert, Modal, FlatList, TouchableOpacity } from 'react-native';
import CustomButton from '../../components/CustomButton';
import { fetchAvailableEmployees, assignEmployeeToOrder } from '../../API/Manager_api';
import { fetchOrderDetails } from '../../API/Order_api'
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ManagerOrderDetailsScreen({ route, navigation }) {
  const { orderId } = route.params;
  const [orderDetails, setOrderDetails] = useState(null); // Szczegóły zlecenia
  const [employees, setEmployees] = useState([]); // Lista pracowników
  const [selectedEmployee, setSelectedEmployee] = useState(null); // Wybrany pracownik
  const [isModalVisible, setIsModalVisible] = useState(false); // Widoczność modala
  const [loading, setLoading] = useState(true); // Stan ładowania

  // Pobieranie szczegółów zlecenia
  useEffect(() => {
    const loadOrderDetails = async () => {
      try {
        const details = await fetchOrderDetails(orderId);
        setOrderDetails(details);

        // Pobranie dostępnych pracowników
        const availableEmployees = await fetchAvailableEmployees(details.startDate, details.estimatedEndDate);
        setEmployees(availableEmployees);
      } catch (error) {
        console.error('Błąd podczas ładowania szczegółów zlecenia:', error.message);
        Alert.alert('Błąd', 'Nie udało się załadować szczegółów zlecenia.');
      } finally {
        setLoading(false);
      }
    };

    loadOrderDetails();
  }, [orderId]);

  // Obsługa przypisania pracownika
  const handleAssignEmployee = async () => {
    if (!selectedEmployee) {
      Alert.alert('Błąd', 'Wybierz pracownika przed przypisaniem.');
      return;
    }
  
    console.log('Próba przypisania pracownika:', {
      orderId: orderDetails.id,
      employeeId: selectedEmployee.id,
    });
  
    try {
      await assignEmployeeToOrder(orderDetails.id, selectedEmployee.id);
      Alert.alert('Sukces', 'Pracownik został przypisany do zlecenia.');
      navigation.goBack();
    } catch (error) {
      console.error('Błąd podczas przypisywania pracownika:', error.response?.data || error.message);
      Alert.alert('Błąd', error.response?.data?.message || 'Nie udało się przypisać pracownika.');
    }
  };

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

      {/* Usługi */}
      <Text className="text-lg font-bold mb-2">Usługi:</Text>
      {orderDetails.services.map((service) => (
        <Text key={service.id} className="text-sm text-gray-700">
          - {service.name} ({service.price} PLN, {service.repairTime} min)
        </Text>
      ))}

      {/* Części */}
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

      {/* Koszty */}
      <Text className="text-lg font-bold mt-4 mb-2">Koszty:</Text>
      <Text className="text-sm text-gray-700">Koszt usług: {orderDetails.totalServicesCost} PLN</Text>
      <Text className="text-sm text-gray-700">Koszt części: {orderDetails.totalPartsCost} PLN</Text>
      <Text className="text-sm text-gray-700">Całkowity koszt: {orderDetails.totalOrderCost} PLN</Text>

      {/* Przypisanie pracownika */}
      <Text className="text-lg font-bold mt-4 mb-2">Przypisz pracownika:</Text>
      <TouchableOpacity
        onPress={() => setIsModalVisible(true)}
        className="p-4 bg-gray-200 rounded-lg mb-4"
      >
        <Text className="text-gray-600">
          {selectedEmployee ? selectedEmployee.fullName : 'Wybierz pracownika'}
        </Text>
      </TouchableOpacity>

      <CustomButton
        title="Przypisz pracownika"
        onPress={handleAssignEmployee}
        className="bg-blue-500 mt-6"
      />

      {/* Modal z listą pracowników */}
      <Modal visible={isModalVisible} transparent animationType="slide">
        <View className="flex-1 justify-center items-center bg-custom-light bg-opacity-50">
          <View className="w-3/4 bg-white rounded-lg p-4">
            <Text className="text-lg font-bold mb-4">Wybierz pracownika</Text>
            <FlatList
              data={employees}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => {
                    setSelectedEmployee(item);
                    setIsModalVisible(false);
                  }}
                  className="p-2 border-b border-gray-300"
                >
                  <Text>{item.fullName}</Text>
                </TouchableOpacity>
              )}
            />
            <CustomButton
              title="Anuluj"
              onPress={() => setIsModalVisible(false)}
              className="bg-red-500 mt-4"
            />
          </View>
        </View>
      </Modal>
      </SafeAreaView>
    </ScrollView>
  );
}
