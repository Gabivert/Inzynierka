import React, { useState } from 'react';
import { View, Text, FlatList, Alert } from 'react-native';
import CustomButton from '../../../components/CustomButton';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function EmployeeOrderScreen({ navigation }) {
  const [orders, setOrders] = useState([
    {
      id: '1',
      car: { make: 'Toyota', model: 'Corolla', year: 2020, vin: 'JTDBR32EX10293012' },
      itemsToReplace: ['Olej silnikowy', 'Filtr powietrza'],
      status: 'W realizacji',
      notes: 'Klient prosił o szybkie wykonanie.',
    },
    {
      id: '2',
      car: { make: 'Honda', model: 'Civic', year: 2018, vin: 'SHHFK7H42KU201845' },
      itemsToReplace: ['Klocki hamulcowe', 'Tarcze hamulcowe'],
      status: 'Gotowy do odbioru',
      notes: 'Wszystkie części wymienione, pojazd gotowy.',
    },
  ]);

  const handleViewDetails = (order) => {
    navigation.navigate('EmployeeOrderDetails', { order });
  };

  const renderOrder = ({ item }) => (
    <View className="bg-white p-4 mb-4 rounded-lg shadow">
      <Text className="text-lg font-bold">{item.car.make} {item.car.model}</Text>
      <Text className="text-sm text-gray-600">Rocznik: {item.car.year}</Text>
      <Text className="text-sm text-gray-600">Status: {item.status}</Text>
      <CustomButton
        title="Zobacz szczegóły"
        onPress={() => handleViewDetails(item)}
        className="bg-custom-dark mt-4"
      />
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-custom-light p-4">
      <Text className="text-2xl font-bold text-black text-center mb-6">Zlecenia pracownika</Text>
      <FlatList
        data={orders}
        renderItem={renderOrder}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={<Text className="text-center text-gray-500">Brak zleceń do wyświetlenia.</Text>}
      />
    </SafeAreaView>
  );
}
