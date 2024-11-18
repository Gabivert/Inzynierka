import { View, Text, FlatList, Alert } from 'react-native';
import React, { useState } from 'react';
import CustomButton from '../../../components/CustomButton';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function VehiclesScreen({ navigation }) {
  const [vehicles, setVehicles] = useState([
    {
      id: '1',
      make: 'Toyota',
      model: 'Corolla',
      year: 2020,
      vin: 'JTDBR32E200123456',
      registrationNumber: 'LU12345',
    },
    {
      id: '2',
      make: 'Honda',
      model: 'Civic',
      year: 2019,
      vin: '19XFC2F69KE012345',
      registrationNumber: 'KR98765',
    },
  ]);

  const handleDeleteVehicle = (id) => {
    Alert.alert(
      'Potwierdzenie usunięcia',
      'Czy na pewno chcesz usunąć ten pojazd?',
      [
        { text: 'Nie', style: 'cancel' },
        {
          text: 'Tak',
          onPress: () => {
            setVehicles((prevVehicles) => prevVehicles.filter((v) => v.id !== id));
            Alert.alert('Sukces', 'Pojazd został usunięty.');
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
      <Text className="text-lg font-bold">{item.make} {item.model}</Text>
      <Text className="text-sm text-gray-600">Rocznik: {item.year}</Text>
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
        keyExtractor={(item) => item.id}
        ListEmptyComponent={<Text className="text-center text-gray-500">Brak pojazdów do wyświetlenia.</Text>}
      />
    </SafeAreaView>
  );
}
