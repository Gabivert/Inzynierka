import React, { useState } from 'react';
import { View, Text, ScrollView, Alert, TouchableOpacity } from 'react-native';
import FormField from '../../components/FormField';
import CustomButton from '../../components/CustomButton';
import { registerUser } from '../../API/Client_api';
import { SafeAreaView } from 'react-native-safe-area-context';

const RegisterScreen = ({ navigation }) => {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    address: '',
    phoneNumber: '',
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const errors = {};
    if (!form.firstName) errors.firstName = 'Imię jest wymagane';
    if (!form.lastName) errors.lastName = 'Nazwisko jest wymagane';
    if (!form.address) errors.address = 'Adres jest wymagany';
    if (!form.phoneNumber) errors.phoneNumber = 'Numer telefonu jest wymagany';
    if (!/^\d{9}$/.test(form.phoneNumber)) errors.phoneNumber = 'Podaj poprawny numer telefonu';
    if (!form.email) {
      errors.email = 'Email jest wymagany';
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      errors.email = 'Email jest nieprawidłowy';
    }
    if (!form.password) {
      errors.password = 'Hasło jest wymagane';
    } else if (form.password.length < 6) {
      errors.password = 'Hasło musi mieć co najmniej 6 znaków';
    }
    return errors;
  };

  const handleSubmit = async () => {
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    try {
      await registerUser(form);
      Alert.alert('Sukces!', 'Rejestracja przebiegła pomyślnie!');
      navigation.navigate('Login');
    } catch (error) {
      Alert.alert('Błąd', error.response?.data || 'Coś poszło nie tak.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ScrollView className="flex-1 px-4 py-6 bg-custom-light">
      <SafeAreaView>
      <Text className="text-2xl font-bold text-black text-center mb-6">
        Zarejestruj się do systemu
      </Text>

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
        title={isSubmitting ? 'Ładowanie...' : 'Zarejestruj się'}
        onPress={handleSubmit}
        className="mt-6"
        disabled={isSubmitting}
      />

      <View className="flex-row justify-center mt-4">
        <Text className="text-black text-lg">Masz już konto? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text className="text-custom-dark text-lg font-semibold">Zaloguj się teraz</Text>
        </TouchableOpacity>
      </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default RegisterScreen;
