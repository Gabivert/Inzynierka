import React, { useState } from 'react';
import { View, Text, Alert } from 'react-native';
import FormField from '../../components/FormField';
import CustomButton from '../../components/CustomButton';
import { verifyPassword, updateUserData } from '../../API/Client_api'; // Importujemy funkcje API

export default function PasswordEditScreen() {
  const [form, setForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const errors = {};
    if (!form.currentPassword) {
      errors.currentPassword = 'Obecne hasło jest wymagane';
    }
    if (!form.newPassword) {
      errors.newPassword = 'Nowe hasło jest wymagane';
    } else if (form.newPassword.length < 6) {
      errors.newPassword = 'Hasło musi mieć co najmniej 6 znaków';
    }
    if (!form.confirmPassword) {
      errors.confirmPassword = 'Potwierdzenie hasła jest wymagane';
    } else if (form.newPassword !== form.confirmPassword) {
      errors.confirmPassword = 'Hasła muszą być takie same';
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
      // Weryfikacja obecnego hasła
      await verifyPassword(form.currentPassword);

      // Jeśli weryfikacja się powiodła, zmieniamy hasło
      await updateUserData({ password: form.newPassword });
      Alert.alert('Sukces', 'Hasło zostało zmienione', [{ text: 'OK' }]);
    } catch (error) {
      Alert.alert(
        'Błąd',
        error.response?.data || 'Nie udało się zmienić hasła. Sprawdź obecne hasło i spróbuj ponownie.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <View className="flex-1 justify-center px-4 bg-custom-light">
      <Text className="text-2xl font-bold text-black text-center mb-6">Zmiana hasła</Text>

      <FormField
        title="Obecne hasło"
        value={form.currentPassword}
        handleChangeText={(text) => setForm({ ...form, currentPassword: text })}
        secureTextEntry
        errorMessage={errors.currentPassword}
        otherStyle="mb-4"
      />

      <FormField
        title="Nowe hasło"
        value={form.newPassword}
        handleChangeText={(text) => setForm({ ...form, newPassword: text })}
        secureTextEntry
        errorMessage={errors.newPassword}
        otherStyle="mb-4"
      />

      <FormField
        title="Potwierdź nowe hasło"
        value={form.confirmPassword}
        handleChangeText={(text) => setForm({ ...form, confirmPassword: text })}
        secureTextEntry
        errorMessage={errors.confirmPassword}
        otherStyle="mb-6"
      />

      <CustomButton
        title={isSubmitting ? 'Zapisywanie...' : 'Zmień hasło'}
        onPress={handleSubmit}
        isLoading={isSubmitting}
        className="bg-custom-dark"
      />
    </View>
  );
}
