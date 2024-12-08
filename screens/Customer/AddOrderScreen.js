import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Alert, FlatList, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker'; // Import DateTimePicker
import CustomButton from '../../components/CustomButton';
import { SafeAreaView } from 'react-native-safe-area-context';
import { addOrder, fetchInitialData } from '../../API/Order_api'; // Importujemy funkcje API
import { fetchVehicles } from '../../API/Vehicle_api'; // Importujemy funkcje API

export default function AddOrderScreen({ navigation }) {
  const [vehicles, setVehicles] = useState([]);
  const [services, setServices] = useState([]);
  const [occupiedSlots, setOccupiedSlots] = useState([]);
  const [selectedCar, setSelectedCar] = useState(null);
  const [selectedServices, setSelectedServices] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date()); // Domyślna data to dzisiaj
  const [showDatePicker, setShowDatePicker] = useState(false); // Flaga do pokazania pickera
  const [totalTime, setTotalTime] = useState(0);
  const [totalCost, setTotalCost] = useState(0);

  useEffect(() => {
    const initializeData = async () => {
      try {
        const { services, occupiedSlots } = await fetchInitialData();
        setServices(services);
        setOccupiedSlots(occupiedSlots);
      } catch (error) {
        console.error('Błąd inicjalizacji danych:', error.message);
      }

      try {
        const vehiclesData = await fetchVehicles();
        setVehicles(vehiclesData);
      } catch (error) {
        console.error('Błąd podczas pobierania pojazdów:', error.message);
      }
    };

    initializeData();
  }, []);

  // Funkcja sprawdzająca dostępność terminu
  const isDateAvailable = (date) => {
    const overlappingSlots = occupiedSlots.filter(
      (slot) =>
        new Date(slot.startDate) < date &&
        date < new Date(slot.estimatedEndDate)
    );

    return overlappingSlots.length < 3; // Maksymalnie 3 stanowiska
  };

  const handleAddOrder = async () => {
    if (!selectedCar || selectedServices.length === 0 || !selectedDate) {
      Alert.alert('Błąd', 'Uzupełnij wszystkie pola!');
      return;
    }

    if (!isDateAvailable(selectedDate)) {
      Alert.alert('Błąd', 'Wybrana data jest już zajęta. Wybierz inną.');
      return;
    }

    const isoDate = selectedDate.toISOString(); // Konwersja na ISO

    try {
      const orderData = {
        carId: selectedCar.id,
        serviceIds: selectedServices.map((service) => service.id),
        preferredStartDate: isoDate,
      };

      console.log('Dane wysyłane do API:', orderData);
      const response = await addOrder(orderData);
      Alert.alert('Sukces', `Zlecenie zostało dodane! Planowane zakończenie: ${response.estimatedEndDate}`);
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
              <Text style={{ fontWeight: 'bold' }}>{item.brand}</Text>
              <Text>{item.model}</Text>
              <Text style={{ color: 'gray' }}>{item.registrationNumber}</Text>
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
                setTotalTime(totalTime - service.repairTimeInMinutes);
                setTotalCost(totalCost - service.price);
              } else {
                setSelectedServices([...selectedServices, service]);
                setTotalTime(totalTime + service.repairTimeInMinutes);
                setTotalCost(totalCost + service.price);
              }
            }}
          >
            <Text>{`${service.name} - ${service.price} PLN (${service.repairTimeInMinutes} min)`}</Text>
          </TouchableOpacity>
        ))}

        {/* Podsumowanie */}
        <Text className="text-lg font-bold mt-4 mb-2">Podsumowanie</Text>
        <Text>
          Samochód: {selectedCar ? `${selectedCar.brand} ${selectedCar.model} (${selectedCar.registrationNumber})` : 'Nie wybrano'}
        </Text>
        <Text>Usługi: {selectedServices.map((s) => s.name).join(', ') || 'Nie wybrano'}</Text>
        <Text>Czas naprawy: {totalTime} min</Text>
        <Text>Koszt: {totalCost} PLN</Text>

        {/* Wybór daty */}
        <Text className="text-lg font-bold mt-4 mb-2">Wybierz datę</Text>
        <CustomButton title="Wybierz datę" onPress={() => setShowDatePicker(true)} />
        <Text className="mt-2">Wybrana data: {selectedDate.toLocaleString()}</Text>

        {showDatePicker && (
          <DateTimePicker
            value={selectedDate}
            mode="datetime"
            is24Hour={true}
            display="default"
            onChange={(event, date) => {
              setShowDatePicker(false);
              if (date) {
                if (isDateAvailable(date)) {
                  setSelectedDate(date);
                } else {
                  Alert.alert('Błąd', 'Wybrana data jest zajęta. Wybierz inną.');
                }
              }
            }}
          />
        )}

        <CustomButton title="Zarezerwuj" onPress={handleAddOrder} className="bg-blue-500 mt-6" />
      </ScrollView>
    </SafeAreaView>
  );
}
