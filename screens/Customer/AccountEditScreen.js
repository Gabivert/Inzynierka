// screens/Customer/AccountEditScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, Alert, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import FormField from '../../components/FormField';
import CustomButton from '../../components/CustomButton';
import { updateUserData } from '../../API/api'; // Zaktualizuj ścieżkę importu
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function AccountEditScreen({ route, navigation }) {
  const { userData } = route.params; // Odbieramy dane użytkownika z nawigacji
  const [user, setUser] = useState(userData); // Ustawiamy dane użytkownika w stanie
  const [isLoading, setIsLoading] = useState(false);

  // Funkcja do zapisania zmian
  const handleSaveChanges = async () => {
    if (!user.id) {
      Alert.alert('Błąd', 'Brak ID użytkownika. Nie można zaktualizować danych.');
      return;
    }

    try {
      const updatedData = await updateUserData(user); // Zaktualizowanie danych użytkownika
      console.log('Dane po aktualizacji:', updatedData);
      setUser(updatedData); // Zaktualizowanie danych lokalnie
      await AsyncStorage.setItem('user', JSON.stringify(updatedData)); // Zapisz dane w AsyncStorage
      Alert.alert('Sukces', 'Twoje dane zostały zaktualizowane.');
      navigation.goBack(); // Wróć do ekranu konta
    } catch (error) {
      Alert.alert('Błąd', 'Nie udało się zaktualizować danych. Spróbuj ponownie.');
    }
  };

  if (isLoading) {
    // Wyświetl wskaźnik ładowania, jeśli dane użytkownika są wczytywane
    return (
      <View className="flex-1 justify-center items-center bg-custom-light">
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View className="flex-1 bg-custom-light">
      <SafeAreaView className="flex-1">
        <View className="px-4 py-6">
          <Text className="text-2xl font-bold text-black text-center mb-6">Edytuj dane</Text>

          <FormField
            title="Imię"
            value={user.firstName}
            handleChangeText={(e) => setUser({ ...user, firstName: e })}
            otherStyle="mb-4"
          />
          <FormField
            title="Nazwisko"
            value={user.lastName}
            handleChangeText={(e) => setUser({ ...user, lastName: e })}
            otherStyle="mb-4"
          />
          <FormField
            title="Adres e-mail"
            value={user.email}
            handleChangeText={(e) => setUser({ ...user, email: e })}
            keyboardType="email-address"
            otherStyle="mb-4"
          />
          <FormField
            title="Numer telefonu"
            value={user.phoneNumber}
            handleChangeText={(e) => setUser({ ...user, phoneNumber: e })}
            keyboardType="phone-pad"
            otherStyle="mb-4"
          />
          <FormField
            title="Adres"
            value={user.address}
            handleChangeText={(e) => setUser({ ...user, address: e })}
            otherStyle="mb-4"
          />

          <CustomButton
            title="Zapisz zmiany"
            onPress={handleSaveChanges}
            className="bg-green-500"
          />
        </View>
      </SafeAreaView>
    </View>
  );
}
