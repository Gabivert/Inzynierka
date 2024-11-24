import { View, Text, ScrollView } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function OrderDetailsScreen({ route }) {
  const { order } = route.params;

  return (
    <ScrollView className="flex-1 bg-custom-light p-4">
      <SafeAreaView>
        <Text className="text-2xl font-bold text-black text-center mb-6">Szczegóły zlecenia</Text>
        <View className="bg-white p-4 mb-6 rounded-lg shadow">
          <Text className="text-lg font-bold">Zlecenie ID: {order?.id || 'Brak danych'}</Text>
          <Text className="text-sm text-gray-600">Data rozpoczęcia: {order?.startDate || 'Nieznana'}</Text>
          <Text className="text-sm text-gray-600">Data zakończenia: {order?.endDate || 'Nieznana'}</Text>
          <Text className="text-sm text-gray-600">Status: {order?.status || 'Nieznany'}</Text>
          <Text className="text-sm text-gray-600">Cena całkowita: {order?.price || 'Nieznana'}</Text>
          <Text className="text-sm text-gray-600 mt-4">Lista usług:</Text>
          {Array.isArray(order?.services) && order.services.length > 0 ? (
            order.services.map((service, index) => (
              <Text key={index} className="text-sm text-gray-700">
                - {service.name} ({service.price} PLN)
              </Text>
            ))
          ) : (
            <Text className="text-sm text-gray-500">Brak usług do wyświetlenia.</Text>
          )}
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}
