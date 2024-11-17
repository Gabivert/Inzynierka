import { View, Text, ScrollView, TextInput, Button, Alert } from 'react-native';
import React, { useState } from 'react';
import CustomButton from '../../components/CustomButton';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function AddOrderScreen({ navigation }) {
  const [selectedCar, setSelectedCar] = useState('');
  const [selectedServices, setSelectedServices] = useState([]);
  const [totalTime, setTotalTime] = useState(0);
  const [totalCost, setTotalCost] = useState(0);
  const [selectedDate, setSelectedDate] = useState('');

  const cars = ['Toyota Corolla', 'Honda Civic'];
  const services = [
    { name: 'Olej silnikowy', time: 1, cost: 200 },
    { name: 'Filtr powietrza', time: 0.5, cost: 50 },
    { name: 'Klocki hamulcowe', time: 1.5, cost: 300 },
  ];

  const handleAddOrder = () => {
    if (!selectedCar || selectedServices.length === 0 || !selectedDate) {
      Alert.alert('Błąd', 'Uzupełnij wszystkie pola!');
      return;
    }

    Alert.alert('Sukces', 'Zlecenie zostało dodane!');
    navigation.goBack(); // Powrót do ekranu "Moje zlecenia"
  };

  return (
    <SafeAreaView className="flex-1 bg-custom-light p-4">
      <ScrollView>
        <Text className="text-2xl font-bold text-black text-center mb-6">Dodaj Zlecenie</Text>

        {/* Wybór samochodu */}
        <Text className="text-lg font-bold mb-2">Wybierz samochód</Text>
        {cars.map((car, index) => (
          <Button
            key={index}
            title={car}
            onPress={() => setSelectedCar(car)}
            color={selectedCar === car ? 'blue' : 'gray'}
          />
        ))}

        {/* Wybór usług */}
        <Text className="text-lg font-bold mt-4 mb-2">Wybierz usługi</Text>
        {services.map((service, index) => (
          <Button
            key={index}
            title={`${service.name} - ${service.cost} PLN (${service.time} h)`}
            onPress={() => {
              if (selectedServices.includes(service)) {
                setSelectedServices(selectedServices.filter((s) => s !== service));
                setTotalTime(totalTime - service.time);
                setTotalCost(totalCost - service.cost);
              } else {
                setSelectedServices([...selectedServices, service]);
                setTotalTime(totalTime + service.time);
                setTotalCost(totalCost + service.cost);
              }
            }}
            color={selectedServices.includes(service) ? 'blue' : 'gray'}
          />
        ))}

        {/* Podsumowanie */}
        <Text className="text-lg font-bold mt-4 mb-2">Podsumowanie</Text>
        <Text>Samochód: {selectedCar || 'Nie wybrano'}</Text>
        <Text>Usługi: {selectedServices.map((s) => s.name).join(', ') || 'Nie wybrano'}</Text>
        <Text>Czas naprawy: {totalTime} h</Text>
        <Text>Koszt: {totalCost} PLN</Text>

        {/* Wybór daty */}
        <Text className="text-lg font-bold mt-4 mb-2">Wybierz datę</Text>
        <TextInput
          placeholder="Wpisz datę (YYYY-MM-DD HH:mm)"
          value={selectedDate}
          onChangeText={setSelectedDate}
          className="bg-white p-2 rounded border"
        />

        {/* Przycisk dodania */}
        <CustomButton
          title="Zarezerwuj"
          onPress={handleAddOrder}
          className="bg-blue-500 mt-6"
        />
      </ScrollView>
    </SafeAreaView>
  );
}
