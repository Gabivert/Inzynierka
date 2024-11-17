import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import CustomButton from '../../components/CustomButton';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function OrdersScreen({ navigation }) {
  const [orders, setOrders] = useState([
    {
      id: '1',
      car: 'Toyota Corolla',
      startDate: '2023-11-01 08:30',
      endDate: '2023-11-02 16:00',
      itemsToReplace: ['Olej silnikowy', 'Filtr powietrza'],
      status: 'Zakończone',
      price: '500 PLN',
    },
    {
      id: '2',
      car: 'Honda Civic',
      startDate: '2023-11-03 09:00',
      endDate: '2023-11-04 14:00',
      itemsToReplace: ['Klocki hamulcowe', 'Tarcze hamulcowe'],
      status: 'W trakcie',
      price: '800 PLN',
    },
  ]);

  const handleViewDetails = (order) => {
    navigation.navigate('OrderDetails', { order });
  };

  const renderOrder = ({ item }) => (
    <View className="bg-white p-4 mb-4 rounded-lg shadow">
      <Text className="text-lg font-bold">{item.car}</Text>
      <Text className="text-sm text-gray-600">Data rozpoczęcia: {item.startDate}</Text>
      <Text className="text-sm text-gray-600">Data zakończenia: {item.endDate}</Text>
      <Text className="text-sm text-gray-600">Status: {item.status}</Text>
      <Text className="text-sm text-gray-600">Cena: {item.price}</Text>
      <CustomButton
        title="Zobacz szczegóły"
        onPress={() => handleViewDetails(item)}
        className="bg-custom-dark mt-4"
      />
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-custom-light p-4">
      <Text className="text-2xl font-bold text-black text-center mb-6">Moje zlecenia</Text>

      {/* Przycisk Dodaj Zlecenie */}
      <CustomButton
        title="Dodaj zlecenie"
        onPress={() => navigation.navigate('AddOrder')}
        className="bg-blue-500 mb-6"
      />

      <FlatList
        data={orders}
        renderItem={renderOrder}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={<Text className="text-center text-gray-500">Brak zleceń do wyświetlenia.</Text>}
      />
    </SafeAreaView>
  );
}
