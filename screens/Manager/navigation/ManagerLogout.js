import React from 'react';
import { View, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomButton from '../../../components/CustomButton'; // Przycisk

export default function LogoutScreen({ navigation }) {
  // Funkcja wylogowywania
  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('token'); // Usunięcie tokenu
      Alert.alert('Wylogowano', 'Zostałeś pomyślnie wylogowany.');
      navigation.reset({
        index: 0,
        routes: [{ name: 'EmployeeLogin' }], // Powrót do ekranu powitalnego
      });
    } catch (error) {
      console.error('Błąd podczas wylogowywania:', error.message);
      Alert.alert('Błąd', 'Nie udało się wylogować.');
    }
  };

  return (
    <SafeAreaView className="flex-1 justify-center items-center bg-custom-light">
      <CustomButton
        title="Wyloguj się"
        onPress={handleLogout}
        className="bg-red-500"
      />
    </SafeAreaView>
  );
}
