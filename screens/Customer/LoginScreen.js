import { View, Text, TouchableOpacity, Alert } from 'react-native';
import React, { useState } from 'react';
import FormField from '../../components/FormField'; // Komponent do pól formularza
import CustomButton from '../../components/CustomButton'; // Komponent przycisku
import { useNavigation } from '@react-navigation/native'; // Hook do nawigacji
import AsyncStorage from '@react-native-async-storage/async-storage';
import { loginUser } from '../../API/api'; // Importujemy funkcję loginUser

export default function LoginScreen() {
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false); // Stan dla przycisku "Ładowanie"
  const [errors, setErrors] = useState({}); // Stan dla błędów formularza
  const [errorMessage, setErrorMessage] = useState(''); // Dodatkowy stan dla komunikatu o błędzie

  const navigation = useNavigation(); // Hook do nawigacji

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
    setErrorMessage('');
  
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setIsSubmitting(false);
      return;
    }
  
    try {
      const { Token } = await loginUser(form);
  
      // Zapisujemy token w AsyncStorage
      await AsyncStorage.setItem('token', Token);
  
      Alert.alert('Sukces', 'Zalogowano pomyślnie', [
        { text: 'OK', onPress: () => navigation.replace('CustomerTabNavigator') },
      ]);
    } catch (error) {
      setErrorMessage('Nieprawidłowy email lub hasło');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <View className="flex-1 justify-center px-4 py-6 bg-custom-light">
      <Text className="text-2xl font-bold text-black text-center mb-6">
        Zaloguj się do systemu
      </Text>

      {errorMessage ? (
        <Text className="text-red-500 text-center mb-4">{errorMessage}</Text>
      ) : null}

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
        <Text className="text-black text-lg">Nie masz konta? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text className="text-custom-dark text-lg font-semibold">Zarejestruj się</Text>
        </TouchableOpacity>
      </View>

      <View className="flex-row justify-center mt-4">
        <Text className="text-black text-lg">Służbowe konto? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('EmployeeLogin')}>
          <Text className="text-custom-dark text-lg font-semibold">Zaloguj się</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
