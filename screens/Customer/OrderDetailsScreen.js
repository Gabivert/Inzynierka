import { View, Text, ScrollView, Alert } from 'react-native';
import React from 'react';
import CustomButton from '../../components/CustomButton';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function OrderDetailsScreen({ route, navigation }) {
  const { order } = route.params;

  const handleDownloadInvoice = () => {
    Alert.alert('Sukces', 'Faktura została pobrana.');
  };

  const handlePayNow = () => {
    Alert.alert('Przekierowanie', 'Zostaniesz przekierowany do pośrednika płatności.');
    navigation.goBack(); // Przykładowe działanie
  };

  return (
    <ScrollView className="flex-1 bg-custom-light p-4">
      <SafeAreaView>
      <Text className="text-2xl font-bold text-black text-center mb-6">Szczegóły zlecenia</Text>

      <View className="bg-white p-4 mb-6 rounded-lg shadow">
        <Text className="text-lg font-bold">Samochód: {order.car}</Text>
        <Text className="text-sm text-gray-600">Data rozpoczęcia: {order.startDate}</Text>
        <Text className="text-sm text-gray-600">Data zakończenia: {order.endDate}</Text>
        <Text className="text-sm text-gray-600">Status: {order.status}</Text>
        <Text className="text-sm text-gray-600">Cena: {order.price}</Text>
        <Text className="text-sm text-gray-600 mt-4">Elementy do wymiany:</Text>
        {order.itemsToReplace.map((item, index) => (
          <Text key={index} className="text-sm text-gray-700">
            - {item}
          </Text>
        ))}
      </View>

      <View className="bg-white p-4 rounded-lg shadow">
        <Text className="text-lg font-bold">Uwagi od pracownika</Text>
        <Text className="text-sm text-gray-600 mt-2">
          Wymienione części są zgodne z zaleceniami producenta. Proszę upewnić się, że samochód działa poprawnie po odbiorze.
        </Text>

        <Text className="text-lg font-bold mt-6">Protokół przyjęcia pojazdu</Text>
        <Text className="text-sm text-gray-600 mt-2">Stan techniczny pojazdu oceniony na dobry. Brak dodatkowych uszkodzeń.</Text>
      </View>

      <CustomButton title="Pobierz fakturę" onPress={handleDownloadInvoice} className="bg-green-500 mt-6" />
      {order.status === 'Zakończone' && (
        <CustomButton title="Zapłać teraz" onPress={handlePayNow} className="bg-blue-500 mt-4" />
      )}
      </SafeAreaView>
    </ScrollView>
  );
}
