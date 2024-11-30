import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Alert, TouchableOpacity, Modal, FlatList } from 'react-native';
import CustomButton from '../../components/CustomButton';
import { SafeAreaView } from 'react-native-safe-area-context';
import { fetchAvailableEmployees, assignEmployeeToOrder } from '../../API/Manager_api';

export default function ManagerOrderDetailsScreen({ route, navigation }) {
  const { order } = route.params;
  const [employees, setEmployees] = useState([]); // Lista pracowników
  const [selectedEmployee, setSelectedEmployee] = useState(null); // Wybrany pracownik
  const [isModalVisible, setIsModalVisible] = useState(false); // Widoczność modala

  const loadAvailableEmployees = async () => {
    try {
      const availableEmployees = await fetchAvailableEmployees();
      setEmployees(availableEmployees);
    } catch (error) {
      console.error('Błąd podczas pobierania pracowników:', error.message);
      Alert.alert('Błąd', 'Nie udało się pobrać listy pracowników.');
    }
  };

  useEffect(() => {
    loadAvailableEmployees();
  }, []);

  const handleAssignEmployee = async () => {
    if (!selectedEmployee) {
      Alert.alert('Błąd', 'Wybierz pracownika przed przypisaniem.');
      return;
    }

    try {
      await assignEmployeeToOrder(order.id, selectedEmployee.id);
      Alert.alert('Sukces', 'Pracownik został przypisany do zlecenia.');
      navigation.goBack();
    } catch (error) {
      console.error('Błąd podczas przypisywania pracownika:', error.message);
      Alert.alert('Błąd', 'Nie udało się przypisać pracownika.');
    }
  };

  return (
    <ScrollView className="flex-1 bg-custom-light p-4">
      <SafeAreaView>
        <Text className="text-2xl font-bold text-black text-center mb-6">Szczegóły zlecenia</Text>

        {/* Szczegóły zlecenia */}
        <View className="bg-white p-4 mb-6 rounded-lg shadow">
          <Text className="text-lg font-bold">Zlecenie ID: {order.id}</Text>
          <Text className="text-sm text-gray-600">Data rozpoczęcia: {order.startDate}</Text>
          <Text className="text-sm text-gray-600">Status: {order.status}</Text>
          <Text className="text-sm text-gray-600">Klient: {order.clientName}</Text>
        </View>

        {/* Wybór pracownika */}
        <Text className="text-lg font-bold mb-2">Przypisz pracownika</Text>
        <TouchableOpacity
          onPress={() => setIsModalVisible(true)}
          className="p-4 bg-gray-200 rounded-lg mb-4"
        >
          <Text className="text-gray-600">
            {selectedEmployee ? `${selectedEmployee.firstName} ${selectedEmployee.lastName}` : 'Wybierz pracownika'}
          </Text>
        </TouchableOpacity>

        {/* Przyciski akcji */}
        <CustomButton
          title="Przypisz pracownika"
          onPress={handleAssignEmployee}
          className="bg-blue-500 mt-6"
        />
        <CustomButton
          title="Powrót"
          onPress={() => navigation.goBack()}
          className="bg-gray-400 mt-4"
        />

        {/* Modal z listą pracowników */}
        <Modal visible={isModalVisible} transparent animationType="slide">
          <View className="flex-1 justify-center items-center bg-black bg-opacity-50">
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
                    <Text>{`${item.firstName} ${item.lastName}`}</Text>
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
