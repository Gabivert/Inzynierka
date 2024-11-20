import { View, Text, Alert, ScrollView } from 'react-native';
import React, { useState } from 'react';
import CustomButton from '../../components/CustomButton';
import FormField from '../../components/FormField';
import { SafeAreaView } from 'react-native-safe-area-context';
import { addVehicle } from '../../API/api.js'; // Import funkcji do dodawania pojazdu

export default function AddVehicleScreen({ navigation }) {
  const [form, setForm] = useState({
    brand: '',
    model: '',
    year: '',
    vin: '',
    registrationNumber: '',
  });

  const handleAddVehicle = async () => {
    const { brand, model, year, vin, registrationNumber } = form;

    console.log("Rocznik przed wysłaniem:", year); // Sprawdzenie wartości przed wysłaniem

    // Walidacja formularza
    if (!brand || !model || !year || !vin || !registrationNumber) {
      Alert.alert('Błąd', 'Uzupełnij wszystkie pola!');
      return;
    }

    try {
      // Konwersja rocznika na liczbę
      const vehicleData = { 
        brand, 
        model, 
        year: parseInt(year, 10), 
        vin, 
        registrationNumber 
      };

      // Wywołanie funkcji do dodania pojazdu
      await addVehicle(vehicleData); 

      Alert.alert('Sukces', 'Pojazd został dodany!');
      navigation.goBack(); // Powrót do zakładki pojazdów
    } catch (error) {
      Alert.alert('Błąd', 'Nie udało się dodać pojazdu.');
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-custom-light p-4">
      <ScrollView>
        <Text className="text-2xl font-bold text-black text-center mb-6">Dodaj Pojazd</Text>

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
          value={form.year.toString()} // Zapewnienie, że rocznik jest ciągiem znaków
          handleChangeText={(e) => setForm({ ...form, year: e })}
          keyboardType="numeric" // Klawiatura numeryczna dla roku
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

        <CustomButton
          title="Dodaj pojazd"
          onPress={handleAddVehicle}
          className="bg-blue-500 mt-6"
        />
      </ScrollView>
    </SafeAreaView>
  );
}
