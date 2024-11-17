import React, { useState } from 'react';
import { View, Text, Alert } from 'react-native';
import FormField from '../../components/FormField';
import CustomButton from '../../components/CustomButton';

export default function PasswordEditScreen() {
  const [form, setForm] = useState({
    newPassword: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const errors = {};
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

  const handleSubmit = () => {
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    Alert.alert('Sukces', 'Hasło zostało zmienione', [{ text: 'OK' }]);
  };

  return (
    <View className="flex-1 justify-center px-4 bg-custom-light">
      <Text className="text-2xl font-bold text-black text-center mb-6">Zmiana hasła</Text>

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

      <CustomButton title="Zmień hasło" onPress={handleSubmit} className="bg-custom-dark" />
    </View>
  );
}
