import React, { useState } from 'react';
import { View, Text, ScrollView, TextInput, Alert } from 'react-native';
import CustomButton from '../../components/CustomButton';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function EmployeeOrderDetailsScreen({ route }) {
  const { order } = route.params; // Dane przekazane z EmployeeOrderScreen
  const [status, setStatus] = useState(order.status);
  const [notes, setNotes] = useState(order.notes);

  const handleStatusChange = (newStatus) => {
    setStatus(newStatus);
    Alert.alert('Sukces', `Status zmieniono na: ${newStatus}`);
  };

  const handleSaveNotes = () => {
    Alert.alert('Sukces', 'Uwagi zostały zapisane.');
  };

  return (
    <SafeAreaView className="flex-1 bg-custom-light p-4">
      <ScrollView>
        <Text className="text-2xl font-bold text-black text-center mb-6">Szczegóły zlecenia</Text>

        {/* Informacje o pojeździe */}
        <View className="mb-6 bg-white p-4 rounded shadow">
          <Text className="text-lg font-semibold mb-2">Pojazd</Text>
          <Text className="text-sm">Marka: {order.car.make}</Text>
          <Text className="text-sm">Model: {order.car.model}</Text>
          <Text className="text-sm">Rocznik: {order.car.year}</Text>
          <Text className="text-sm">VIN: {order.car.vin}</Text>
        </View>

        {/* Rzeczy do wymiany */}
        <View className="mb-6 bg-white p-4 rounded shadow">
          <Text className="text-lg font-semibold mb-2">Rzeczy do wymiany</Text>
          {order.itemsToReplace.map((item, index) => (
            <Text key={index} className="text-sm">- {item}</Text>
          ))}
        </View>

        {/* Zmiana statusu */}
        <View className="mb-6 bg-white p-4 rounded shadow">
          <Text className="text-lg font-semibold mb-2">Status zlecenia</Text>
          <Text className="text-sm mb-2">Aktualny status: {status}</Text>
          <View className="flex-row justify-around">
            <CustomButton
              title="W realizacji"
              onPress={() => handleStatusChange('W realizacji')}
              className="bg-blue-500 w-1/3"
            />
            <CustomButton
              title="Gotowy do odbioru"
              onPress={() => handleStatusChange('Gotowy do odbioru')}
              className="bg-green-500 w-1/3"
            />
          </View>
        </View>

        {/* Uwagi */}
        <View className="mb-6 bg-white p-4 rounded shadow">
          <Text className="text-lg font-semibold mb-2">Uwagi</Text>
          <TextInput
            value={notes}
            onChangeText={setNotes}
            placeholder="Wpisz uwagi dotyczące zlecenia"
            className="bg-gray-100 p-2 rounded border"
            multiline
          />
          <CustomButton
            title="Zapisz uwagi"
            onPress={handleSaveNotes}
            className="bg-blue-500 mt-4"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
