import { View, Text, FlatList, Alert, ActivityIndicator } from 'react-native';
import React, { useState, useEffect } from 'react';
import { fetchVehicles, deleteVehicle } from '../../../API/api.js'; // Zaimportowanie funkcji API
import CustomButton from '../../../components/CustomButton';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function VehiclesScreen({ navigation }) {
  const [vehicles, setVehicles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Funkcja do pobierania pojazdów
  const getVehicles = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const vehiclesData = await fetchVehicles();
      setVehicles(vehiclesData); // Zakłada się, że API zwraca tablicę pojazdów
    } catch (err) {
      setError('Nie udało się załadować pojazdów.');
      console.error(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Odświeżenie listy pojazdów po powrocie na ten ekran
    const focusListener = navigation.addListener('focus', () => {
      getVehicles(); // Załadowanie pojazdów po ponownym wejściu na ekran
    });

    // Czyszczenie listenera po wyjściu z ekranu
    return () => {
      focusListener();
    };
  }, [navigation]); // Listener będzie aktywowany, gdy komponent będzie w stanie 'focus'

  // Funkcja do usuwania pojazdu
  const handleDeleteVehicle = async (id) => {
    Alert.alert(
      'Potwierdzenie usunięcia',
      'Czy na pewno chcesz usunąć ten pojazd?',
      [
        { text: 'Nie', style: 'cancel' },
        {
          text: 'Tak',
          onPress: async () => {
            try {
              await deleteVehicle(id);
              Alert.alert('Sukces', 'Pojazd został usunięty.');
              getVehicles(); // Odświeżenie listy pojazdów
            } catch (err) {
              Alert.alert('Błąd', 'Nie udało się usunąć pojazdu.');
              console.error(err.message);
            }
          },
        },
      ]
    );
  };

  const handleEditVehicle = (vehicle) => {
    navigation.navigate('VehiclesEdit', { vehicle });
  };

  const renderVehicle = ({ item }) => (
    <View className="bg-white p-4 mb-4 rounded-lg shadow">
      <Text className="text-lg font-bold">{item.brand} {item.model}</Text>
      <Text className="text-sm text-gray-600">Rocznik: {item.productionYear}</Text>
      <Text className="text-sm text-gray-600">VIN: {item.vin}</Text>
      <Text className="text-sm text-gray-600">Nr rej.: {item.registrationNumber}</Text>

      <View className="flex-row mt-4 space-x-2">
        <CustomButton
          title="Edytuj"
          onPress={() => handleEditVehicle(item)}
          className="bg-custom-dark flex-1"
        />
        <CustomButton
          title="Usuń"
          onPress={() => handleDeleteVehicle(item.id)}
          className="bg-red-500 flex-1"
        />
      </View>
    </View>
  );

  if (isLoading) {
    return (
      <SafeAreaView className="flex-1 justify-center items-center bg-custom-light">
        <ActivityIndicator size="large" color="#0000ff" />
        <Text className="mt-4 text-gray-500">Ładowanie pojazdów...</Text>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView className="flex-1 justify-center items-center bg-custom-light">
        <Text className="text-red-500 mb-4">{error}</Text>
        <CustomButton title="Spróbuj ponownie" onPress={getVehicles} className="bg-blue-500" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-custom-light p-4">
      <Text className="text-2xl font-bold text-black text-center mb-6">Moje pojazdy</Text>

      {/* Przycisk Dodaj Pojazd */}
      <CustomButton
        title="Dodaj pojazd"
        onPress={() => navigation.navigate('AddVehicle')}
        className="bg-blue-500 mb-6"
      />

      <FlatList
        data={vehicles}
        renderItem={renderVehicle}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={<Text className="text-center text-gray-500">Brak pojazdów do wyświetlenia.</Text>}
      />
    </SafeAreaView>
  );
}
