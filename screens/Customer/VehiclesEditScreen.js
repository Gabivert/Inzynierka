import { View, Text, Alert, ScrollView } from 'react-native';
import React, { useState } from 'react';
import FormField from '../../components/FormField'; // Komponent formularza
import CustomButton from '../../components/CustomButton'; // Przyciski z Tailwind
import { SafeAreaView } from 'react-native-safe-area-context';

export default function VehiclesEditScreen({ route, navigation }) {
  const { vehicle } = route.params; // Dane pojazdu przekazane przez nawigację
  const [form, setForm] = useState(vehicle);

  // Funkcja do obsługi zapisu zmian
  const handleSaveChanges = () => {
    Alert.alert('Sukces', 'Dane pojazdu zostały zaktualizowane.');
    navigation.goBack(); // Powrót do ekranu listy pojazdów
  };

  return (
    <ScrollView className="flex-1 px-4 py-6 bg-custom-light">
     <SafeAreaView>
      <Text className="text-2xl font-bold text-black text-center mb-6">Edycja pojazdu</Text>

      <FormField
        title="Marka"
        value={form.make}
        handleChangeText={(e) => setForm({ ...form, make: e })}
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
        value={form.year.toString()}
        handleChangeText={(e) => setForm({ ...form, year: e })}
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
