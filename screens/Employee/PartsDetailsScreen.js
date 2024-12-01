import React, { useState } from 'react';
import { View, Text, TextInput, Alert, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { updatePartInOrder, deletePartFromOrder } from '../../API/Parts_api';
import CustomButton from '../../components/CustomButton';

export default function PartsDetailsScreen({ route, navigation }) {
  const { orderId, parts } = route.params; // Pobranie zlecenia i części
  const [selectedPart, setSelectedPart] = useState(null); // Wybrana część
  const [partData, setPartData] = useState({ name: '', serialNumber: '', quantity: '', price: '' });

  const handleSelectPart = (part) => {
    setSelectedPart(part);
    setPartData({
      name: part.name,
      serialNumber: part.serialNumber,
      quantity: String(part.quantity),
      price: String(part.price),
    });
  };

  const handleUpdatePart = async () => {
    try {
      if (!selectedPart) {
        Alert.alert('Błąd', 'Wybierz część do edycji.');
        return;
      }

      const updatedPart = {
        ...partData,
        quantity: parseInt(partData.quantity, 10),
        price: parseFloat(partData.price),
      };

      await updatePartInOrder(orderId, selectedPart.id, updatedPart);
      Alert.alert('Sukces', 'Część została zaktualizowana.');
      navigation.goBack(); // Powrót po edycji
    } catch (error) {
      console.error('Błąd podczas aktualizacji części:', error.message);
      Alert.alert('Błąd', 'Nie udało się zaktualizować części.');
    }
  };

  const handleDeletePart = async () => {
    try {
      if (!selectedPart) {
        Alert.alert('Błąd', 'Wybierz część do usunięcia.');
        return;
      }

      const confirmation = await new Promise((resolve) => {
        Alert.alert(
          'Potwierdzenie',
          `Czy na pewno chcesz usunąć część "${selectedPart.name}"?`,
          [
            { text: 'Anuluj', onPress: () => resolve(false), style: 'cancel' },
            { text: 'Tak', onPress: () => resolve(true) },
          ]
        );
      });

      if (!confirmation) return;

      await deletePartFromOrder(orderId, selectedPart.id);
      Alert.alert('Sukces', 'Część została usunięta.');
      navigation.goBack(); // Powrót po usunięciu
    } catch (error) {
      console.error('Błąd podczas usuwania części:', error.message);
      Alert.alert('Błąd', 'Nie udało się usunąć części.');
    }
  };

  return (
    <ScrollView className="flex-1 bg-custom-light p-4">
      <SafeAreaView>
        <Text className="text-lg font-bold text-black text-center mb-6">Wybierz część do edycji lub usunięcia</Text>

        {/* Lista części */}
        <View className="bg-white p-4 mb-6 rounded-lg shadow">
          {parts.map((part) => (
            <CustomButton
              key={part.id}
              title={`${part.name}`}
              onPress={() => handleSelectPart(part)}
              className="bg-gray-300 mb-2"
            />
          ))}
        </View>

        {/* Formularz edycji */}
        {selectedPart && (
          <View className="bg-white p-4 mb-6 rounded-lg shadow">
            <TextInput
              placeholder="Nazwa części"
              value={partData.name}
              onChangeText={(text) => setPartData((prev) => ({ ...prev, name: text }))}
              className="border p-2 mb-2 rounded"
            />
            <TextInput
              placeholder="Numer seryjny"
              value={partData.serialNumber}
              onChangeText={(text) => setPartData((prev) => ({ ...prev, serialNumber: text }))}
              className="border p-2 mb-2 rounded"
            />
            <TextInput
              placeholder="Ilość"
              value={partData.quantity}
              keyboardType="numeric"
              onChangeText={(text) => setPartData((prev) => ({ ...prev, quantity: text }))}
              className="border p-2 mb-2 rounded"
            />
            <TextInput
              placeholder="Cena"
              value={partData.price}
              keyboardType="decimal-pad"
              onChangeText={(text) => setPartData((prev) => ({ ...prev, price: text }))}
              className="border p-2 mb-4 rounded"
            />

            <CustomButton
              title="Zaktualizuj część"
              onPress={handleUpdatePart}
              className="bg-green-500"
            />
            <CustomButton
              title="Usuń część"
              onPress={handleDeletePart}
              className="bg-red-500 mt-2"
            />
          </View>
        )}

        <CustomButton
          title="Powrót"
          onPress={() => navigation.goBack()}
          className="bg-custom-dark mt-4"
        />
      </SafeAreaView>
    </ScrollView>
  );
}
