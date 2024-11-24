import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TextInput, Alert, FlatList, TouchableOpacity } from 'react-native';
import CustomButton from '../../components/CustomButton';
import { SafeAreaView } from 'react-native-safe-area-context';
import { addOrder } from '../../API/Order_api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { API_BASE_URL } from '@env';

export default function AddOrderScreen({ navigation }) {
  const [vehicles, setVehicles] = useState([]); // Lista pojazdów klienta
  const [services] = useState([
    { id: 1, name: 'Wymiana oleju', description: 'Wymiana oleju silnikowego', repairTime: 1, price: 200 },
    { id: 2, name: 'Filtr powietrza', description: 'Wymiana filtra powietrza', repairTime: 0.5, price: 50 },
    { id: 3, name: 'Hamulce', description: 'Wymiana klocków hamulcowych', repairTime: 1.5, price: 300 },
  ]); // Lista usług
  const [selectedCar, setSelectedCar] = useState(null);
  const [selectedServices, setSelectedServices] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [totalTime, setTotalTime] = useState(0);
  const [totalCost, setTotalCost] = useState(0);

  // Pobranie listy pojazdów klienta
  const fetchVehicles = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await axios.get(`${API_BASE_URL}/api/Vehicle/my-vehicles`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setVehicles(response.data);
    } catch (error) {
      console.error('Błąd podczas pobierania pojazdów:', error.message);
    }
  };

  useEffect(() => {
    fetchVehicles();
  }, []);

  const handleAddOrder = async () => {
    if (!selectedCar || selectedServices.length === 0 || !selectedDate) {
      Alert.alert('Błąd', 'Uzupełnij wszystkie pola!');
      return;
    }

    const isoDate = selectedDate.replace(' ', 'T') + ':00';

    try {
      const orderData = {
        CarId: selectedCar.id,
        ServiceIds: selectedServices.map((service) => service.id),
        PreferredStartDate: isoDate,
      };

      console.log('Dane wysyłane do API:', orderData);
      await addOrder(orderData);
      Alert.alert('Sukces', 'Zlecenie zostało dodane!');
      navigation.goBack();
    } catch (error) {
      console.error('Błąd podczas dodawania zlecenia:', error.message);
      Alert.alert('Błąd', 'Nie udało się dodać zlecenia.');
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-custom-light p-4">
      <ScrollView>
        <Text className="text-2xl font-bold text-black text-center mb-6">Dodaj Zlecenie</Text>

        {/* Wybór samochodu */}
        <Text className="text-lg font-bold mb-2">Wybierz samochód</Text>
        <FlatList
          data={vehicles}
          keyExtractor={(item) => item.id.toString()}
          horizontal
          renderItem={({ item }) => (
            <TouchableOpacity
              style={{
                padding: 10,
                margin: 5,
                borderWidth: 2,
                borderColor: selectedCar?.id === item.id ? 'blue' : 'gray',
                backgroundColor: selectedCar?.id === item.id ? '#dbeafe' : 'white',
                borderRadius: 5,
              }}
              onPress={() => setSelectedCar(item)}
            >
              <Text>{item.model}</Text>
            </TouchableOpacity>
          )}
        />

        {/* Wybór usług */}
        <Text className="text-lg font-bold mt-4 mb-2">Wybierz usługi</Text>
        {services.map((service) => (
          <TouchableOpacity
            key={service.id}
            style={{
              padding: 10,
              marginVertical: 5,
              borderWidth: 2,
              borderColor: selectedServices.includes(service) ? 'blue' : 'gray',
              backgroundColor: selectedServices.includes(service) ? '#dbeafe' : 'white',
              borderRadius: 5,
            }}
            onPress={() => {
              if (selectedServices.includes(service)) {
                setSelectedServices(selectedServices.filter((s) => s.id !== service.id));
                setTotalTime(totalTime - service.repairTime);
                setTotalCost(totalCost - service.price);
              } else {
                setSelectedServices([...selectedServices, service]);
                setTotalTime(totalTime + service.repairTime);
                setTotalCost(totalCost + service.price);
              }
            }}
          >
            <Text>{`${service.name} - ${service.price} PLN (${service.repairTime} h)`}</Text>
          </TouchableOpacity>
        ))}

        {/* Podsumowanie */}
        <Text className="text-lg font-bold mt-4 mb-2">Podsumowanie</Text>
        <Text>Samochód: {selectedCar?.model || 'Nie wybrano'}</Text>
        <Text>Usługi: {selectedServices.map((s) => s.name).join(', ') || 'Nie wybrano'}</Text>
        <Text>Czas naprawy: {totalTime} h</Text>
        <Text>Koszt: {totalCost} PLN</Text>

        {/* Wybór daty */}
        <Text className="text-lg font-bold mt-4 mb-2">Wybierz datę</Text>
        <TextInput
          placeholder="Wpisz datę (YYYY-MM-DD HH:mm)"
          value={selectedDate}
          onChangeText={setSelectedDate}
          style={{ backgroundColor: 'white', padding: 10, borderRadius: 5, borderWidth: 1 }}
        />

        <CustomButton title="Zarezerwuj" onPress={handleAddOrder} className="bg-blue-500 mt-6" />
      </ScrollView>
    </SafeAreaView>
  );
}
