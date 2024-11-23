import { View, Text, Alert, ScrollView } from 'react-native';
import React, { useState } from 'react';
import FormField from '../../components/FormField'; // Komponent formularza
import CustomButton from '../../components/CustomButton'; // Przyciski z Tailwind
import { SafeAreaView } from 'react-native-safe-area-context';
import { updateVehicle } from '../../API/Vehicle_api'; // Import funkcji API

export default function VehiclesEditScreen({ route, navigation }) {
  const { vehicle } = route.params; // Dane pojazdu przekazane przez nawigację
  const [form, setForm] = useState({
    ...vehicle,
    productionYear: vehicle.productionYear.toString(), // Zamiana liczby na string dla formularza
  });

  // Funkcja do obsługi zapisu zmian
  const handleSaveChanges = async () => {
    try {
      // Walidacja pól
      if (!form.brand || !form.model || !form.productionYear || !form.vin || !form.registrationNumber) {
        Alert.alert('Błąd', 'Wszystkie pola są wymagane.');
        return;
      }

      const updatedVehicle = {
        brand: form.brand,
        model: form.model,
        productionYear: parseInt(form.productionYear, 10), // Zamiana na liczbę
        vin: form.vin,
        registrationNumber: form.registrationNumber,
      };

      // Wywołanie API do aktualizacji pojazdu
      await updateVehicle(vehicle.id, updatedVehicle);

      Alert.alert('Sukces', 'Dane pojazdu zostały zaktualizowane.');
      navigation.goBack(); // Powrót do ekranu listy pojazdów
    } catch (error) {
      console.error('Błąd podczas aktualizacji pojazdu:', error.message);
      Alert.alert('Błąd', 'Nie udało się zaktualizować pojazdu. Spróbuj ponownie.');
    }
  };

  return (
    <ScrollView className="flex-1 px-4 py-6 bg-custom-light">
      <SafeAreaView>
        <Text className="text-2xl font-bold text-black text-center mb-6">Edycja pojazdu</Text>

        <FormField
          title="Marka"
          value={form.brand}
          handleChangeText={(e) => setForm({ ...form, brand: e })}
          otherStyle="mb-4"
        />
        <FormField
          title="Model"
          value={form.model}
          handleChangeText={(e) => setForm({ ...form, model: e })}
          otherStyle="mb-4"
        />
        <FormField
          title="Rocznik"
          value={form.productionYear}
          handleChangeText={(e) => setForm({ ...form, productionYear: e })}
          keyboardType="numeric"
          otherStyle="mb-4"
        />
        <FormField
          title="VIN"
          value={form.vin}
          handleChangeText={(e) => setForm({ ...form, vin: e })}
          otherStyle="mb-4"
        />
        <FormField
          title="Nr rejestracyjny"
          value={form.registrationNumber}
          handleChangeText={(e) => setForm({ ...form, registrationNumber: e })}
          otherStyle="mb-4"
        />

        <CustomButton title="Zapisz zmiany" onPress={handleSaveChanges} className="mt-6" />
      </SafeAreaView>
    </ScrollView>
  );
}
