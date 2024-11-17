import { View, Text, TouchableOpacity, Alert, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react'; // Dodano useEffect
import FormField from '../../components/FormField'; // Komponent do pól formularza
import CustomButton from '../../components/CustomButton'; // Komponent przycisku
import { useNavigation } from '@react-navigation/native'; // Hook do nawigacji
import { registerUser, testConnection } from '../../API/api'; // Dodano testConnection

export default function RegisterScreen() {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    address: '',
    phoneNumber: '', // Dodano pole numeru telefonu
    email: '',
    password: '', // Usunięte pole confirmPassword
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const navigation = useNavigation();

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

  // Dodanie testu połączenia z backendem w useEffect
  useEffect(() => {
    const checkBackendConnection = async () => {
      try {
        console.log("Rozpoczęcie testu połączenia z backendem...");
        await testConnection();
        console.log("Backend działa poprawnie.");
      } catch (error) {
        console.log("Nie udało się połączyć z backendem:", error.message);
      }
    };
  
    checkBackendConnection();
  }, []);
  

  const handleSubmit = async () => {
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    setIsSubmitting(true);

    try {
      await registerUser({
        firstName: form.firstName,
        lastName: form.lastName,
        address: form.address,
        phoneNumber: form.phoneNumber,
        email: form.email,
        password: form.password,
      });

      Alert.alert('Sukces', 'Rejestracja zakończona pomyślnie', [
        {
          text: 'OK',
          onPress: () => navigation.navigate('Login'),
        },
      ]);
    } catch (error) {
      console.log('Error details:', error.message);
      console.log('Full error object:', error); // Dodatkowe szczegóły błędu
      Alert.alert('Błąd', error.message || 'Coś poszło nie tak podczas rejestracji.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ScrollView className="flex-1 px-4 py-6 bg-custom-light">
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
    </ScrollView>
  );
}
