import React, { useState } from 'react';
import { View, Text, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import FormField from '../../components/FormField';
import CustomButton from '../../components/CustomButton';
import { updateUserData, verifyPassword } from '../../API/api'; // Importujemy funkcje API

export default function AccountEditScreen({ route, navigation }) {
  const { userData } = route.params; // Dane użytkownika
  const [form, setForm] = useState({
    firstName: userData.firstName || '',
    lastName: userData.lastName || '',
    address: userData.address || '',
    phoneNumber: userData.phoneNumber || '',
  });
  const [verifyPasswordField, setVerifyPasswordField] = useState(''); // Hasło weryfikacyjne
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const errors = {};
    if (!form.firstName) errors.firstName = 'Imię jest wymagane';
    if (!form.lastName) errors.lastName = 'Nazwisko jest wymagane';
    if (!form.address) errors.address = 'Adres jest wymagany';
    if (!form.phoneNumber) errors.phoneNumber = 'Numer telefonu jest wymagany';
    if (!verifyPasswordField) errors.verifyPasswordField = 'Hasło weryfikacyjne jest wymagane';
    return errors;
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setErrors({});

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setIsSubmitting(false);
      return;
    }

    try {
      // Weryfikacja hasła użytkownika
      await verifyPassword(verifyPasswordField);

      // Aktualizacja danych użytkownika
      await updateUserData(form);

      Alert.alert('Sukces', 'Twoje dane zostały zaktualizowane.');
      navigation.goBack(); // Powrót do poprzedniego ekranu
    } catch (error) {
      Alert.alert('Błąd', error.response?.data || 'Nie udało się zweryfikować hasła.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <View className="flex-1 bg-custom-light">
      <SafeAreaView className="flex-1">
        <View className="px-4 py-6">
          <Text className="text-2xl font-bold text-black text-center mb-6">Edytuj dane</Text>

          <FormField
            title="Imię"
            value={form.firstName}
            handleChangeText={(e) => setForm({ ...form, firstName: e })}
            errorMessage={errors.firstName}
            otherStyle="mb-4"
          />
          <FormField
            title="Nazwisko"
            value={form.lastName}
            handleChangeText={(e) => setForm({ ...form, lastName: e })}
            errorMessage={errors.lastName}
            otherStyle="mb-4"
          />
          <FormField
            title="Adres"
            value={form.address}
            handleChangeText={(e) => setForm({ ...form, address: e })}
            errorMessage={errors.address}
            otherStyle="mb-4"
          />
          <FormField
            title="Numer telefonu"
            value={form.phoneNumber}
            handleChangeText={(e) => setForm({ ...form, phoneNumber: e })}
            keyboardType="phone-pad"
            errorMessage={errors.phoneNumber}
            otherStyle="mb-4"
          />
          <FormField
            title="Hasło weryfikacyjne"
            value={verifyPasswordField}
            handleChangeText={setVerifyPasswordField}
            secureTextEntry
            errorMessage={errors.verifyPasswordField}
            otherStyle="mb-6"
          />

          <CustomButton
            title={isSubmitting ? 'Zapisywanie...' : 'Zapisz zmiany'}
            onPress={handleSubmit}
            isLoading={isSubmitting}
            className="bg-green-500"
          />
        </View>
      </SafeAreaView>
    </View>
  );
}
