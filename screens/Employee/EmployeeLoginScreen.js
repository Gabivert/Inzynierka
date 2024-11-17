import { View, Text, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import FormField from '../../components/FormField'; // Komponent do pól formularza
import CustomButton from '../../components/CustomButton'; // Komponent przycisku
import { useNavigation } from '@react-navigation/native'; // Hook do nawigacji

export default function EmployeeLoginScreen() {
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false); // Stan dla przycisku "Ładowanie"
  const [errors, setErrors] = useState({}); // Stan dla błędów formularza

  const navigation = useNavigation(); // Hook do nawigacji

  // Funkcja do walidacji formularza
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

  // Funkcja do obsługi wysyłania formularza
  const handleSubmit = () => {
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setIsSubmitting(true);
    // Simulacja logowania
    setTimeout(() => {
      alert('Zalogowano pomyślnie');
      setIsSubmitting(false);
    }, 2000);
  };

  return (
    <View className="flex-1 justify-center px-4 py-6 bg-custom-light">
      <Text className="text-2xl font-bold text-black text-center mb-6">
        Zaloguj się do systemu
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
        className="mt-6"
        isLoading={isSubmitting}
      />
      
      <View className="flex-row justify-center mt-4">
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text className="text-custom-dark text-lg font-semibold">Powrót do panelu klienta</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
