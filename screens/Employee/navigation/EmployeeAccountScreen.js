import React from 'react';
import { View, Text, SafeAreaView, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomButton from '../../../components/CustomButton'; // Import przycisku

export default function EmployeeAccountScreen({ navigation }) {
  const handleLogout = async () => {
    try {
      // Czyszczenie tokenu z AsyncStorage
      await AsyncStorage.removeItem('token');
      Alert.alert('Wylogowano', 'Zostałeś pomyślnie wylogowany.');
      // Nawigacja do ekranu logowania
      navigation.replace('EmployeeLogin');
    } catch (error) {
      console.error('Błąd podczas wylogowywania:', error.message);
      Alert.alert('Błąd', 'Nie udało się wylogować.');
    }
  };

  return (
    <SafeAreaView className="flex-1 justify-center items-center bg-custom-light">
      <Text className="text-2xl font-bold text-black mb-6">Profil pracownika</Text>
      
      <CustomButton
        title="Wyloguj się"
        onPress={handleLogout}
        className="bg-red-500 w-3/4"
      />
    </SafeAreaView>
  );
}
