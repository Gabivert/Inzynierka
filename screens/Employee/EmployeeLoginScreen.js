import { View, Text, TouchableOpacity, Alert } from 'react-native';
import React, { useState } from 'react';
import FormField from '../../components/FormField';
import CustomButton from '../../components/CustomButton';
import { useNavigation } from '@react-navigation/native';
import { loginEmployee } from '../../API/Employee_api';

export default function EmployeeLoginScreen() {
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const navigation = useNavigation();

  const validateForm = () => {
    const errors = {};
    if (!form.email) {
      errors.email = 'Email jest wymagany';
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      errors.email = 'Email jest nieprawidłowy';
    }
    if (!form.password) {
      errors.password = 'Hasło jest wymagane';
    }
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
      // Wywołanie funkcji logowania dla pracownika
      const token = await loginEmployee(form.email, form.password);

      Alert.alert('Sukces', 'Zalogowano pomyślnie.', [
        { text: 'OK', onPress: () => navigation.replace('EmployeeTabNavigator') },
      ]);
    } catch (error) {
      Alert.alert('Błąd', error.response?.data || 'Nie udało się zalogować. Sprawdź dane logowania.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <View className="flex-1 justify-center px-4 py-6 bg-custom-light">
      <Text className="text-2xl font-bold text-black text-center mb-6">
        Zaloguj się do systemu dla pracowników
      </Text>

      <FormField
        title="Adres e-mail"
        value={form.email}
        handleChangeText={(e) => setForm({ ...form, email: e })}
        keyboardType="email-address"
        errorMessage={errors.email}
        otherStyle="mb-4"
      />

      <FormField
        title="Hasło"
        value={form.password}
        handleChangeText={(e) => setForm({ ...form, password: e })}
        secureTextEntry
        errorMessage={errors.password}
        otherStyle="mb-6"
      />

      <CustomButton
        title={isSubmitting ? 'Ładowanie...' : 'Zaloguj się'}
        onPress={handleSubmit}
        isLoading={isSubmitting}
        className="mt-6"
      />

      <View className="flex-row justify-center mt-4">
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text className="text-custom-dark text-lg font-semibold">Powrót do panelu klienta</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
