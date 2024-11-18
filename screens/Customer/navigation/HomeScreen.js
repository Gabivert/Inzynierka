import React from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import CustomButton from '../../../components/CustomButton'; // Import komponentu przycisku

export default function HomeScreen({ navigation }) {
  const handleLogout = () => {
    // Wywołanie nawigacji do ekranu logowania klienta
    navigation.replace('Login');
  };

  return (
    <SafeAreaView className="flex-1 justify-center items-center bg-custom-light">
      <Text className="text-2xl font-bold text-black mb-6">Strona główna klienta</Text>

      {/* Dodanie przycisku */}
      <CustomButton
        title="Wyloguj się"
        onPress={handleLogout}
        className="bg-red-500 w-3/4"
      />
    </SafeAreaView>
  );
}
