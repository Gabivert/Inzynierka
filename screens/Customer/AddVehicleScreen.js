import { View, Text, Alert, ScrollView } from 'react-native';
import React, { useState } from 'react';
import CustomButton from '../../components/CustomButton';
import FormField from '../../components/FormField';
import { SafeAreaView } from 'react-native-safe-area-context';
import { addVehicle } from '../../API/Vehicle_api'; // Import funkcji do dodawania pojazdu

export default function AddVehicleScreen({ navigation }) {
  const [form, setForm] = useState({
    brand: '',
    model: '',
    productionYear: '',
    vin: '',
    registrationNumber: '',
  });

  const handleAddVehicle = async () => {
    const { brand, model, productionYear, vin, registrationNumber } = form;

    // Walidacja formularza
    if (!brand || !model || !productionYear || !vin || !registrationNumber) {
      Alert.alert('Błąd', 'Uzupełnij wszystkie pola!');
      return;
    }

    if (brand.length > 20) {
      Alert.alert('Błąd', 'Marka może mieć maksymalnie 20 znaków.');
      return;
    }

    if (model.length > 25) {
      Alert.alert('Błąd', 'Model może mieć maksymalnie 25 znaków.');
      return;
    }

    if (!/^\d{4}$/.test(productionYear)) {
      Alert.alert('Błąd', 'Rocznik musi być 4-cyfrową liczbą.');
      return;
    }

    const productionYearInt = parseInt(productionYear, 10);
    if (isNaN(productionYearInt) || productionYearInt < 1900 || productionYearInt > 2030) {
      Alert.alert('Błąd', 'Podaj prawidłowy rocznik (1900-2030).');
      return;
    }

    if (vin.length !== 17) {
      Alert.alert('Błąd', 'VIN musi mieć dokładnie 17 znaków.');
      return;
    }

    if (registrationNumber.length > 8) {
      Alert.alert('Błąd', 'Nr rejestracyjny może mieć maksymalnie 8 znaków.');
      return;
    }

    try {
      const vehicleData = {
        brand,
        model,
        productionYear: productionYearInt, // Wysłanie rocznika jako liczby
        vin,
        registrationNumber,
      };

      await addVehicle(vehicleData);

      Alert.alert('Sukces', 'Pojazd został dodany!');
      navigation.goBack(); // Powrót do zakładki pojazdów
    } catch (error) {
      Alert.alert('Błąd', 'Nie udało się dodać pojazdu.');
      console.error('Błąd API:', error.response?.data || error.message);
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
          value={form.productionYear.toString()} // Zapewnienie, że rocznik jest ciągiem znaków
          handleChangeText={(e) => setForm({ ...form, productionYear: e })}
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
