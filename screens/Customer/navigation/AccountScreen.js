import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Alert, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { fetchUserProfile, deleteUserAccount } from '../../../API/api';
import CustomButton from '../../../components/CustomButton';

export default function AccountScreen({ navigation }) {
  const [user, setUser] = useState(null); // Przechowywanie danych użytkownika
  const [isLoading, setIsLoading] = useState(true); // Stan ładowania

  // Funkcja do pobierania danych użytkownika
  const loadUserProfile = async () => {
    try {
      const userData = await fetchUserProfile(); // Pobierz dane z API
      setUser(userData); // Ustaw dane użytkownika
    } catch (error) {
      Alert.alert('Błąd', 'Nie udało się załadować danych użytkownika.');
    } finally {
      setIsLoading(false); // Wyłącz ładowanie
    }
  };

  // Funkcja do obsługi usunięcia konta
  const handleDeleteAccount = async () => {
    if (!user?.id) {
      Alert.alert('Błąd', 'Nie znaleziono identyfikatora użytkownika.');
      return;
    }

    Alert.alert(
      'Potwierdzenie',
      'Czy na pewno chcesz usunąć swoje konto? Upewnij się, że wszystkie pojazdy zostały usunięte.',
      [
        { text: 'Nie', style: 'cancel' },
        {
          text: 'Tak',
          onPress: async () => {
            try {
              await deleteUserAccount(user.id); // Przekazujemy identyfikator użytkownika
              Alert.alert('Sukces', 'Twoje konto zostało usunięte.');
              navigation.reset({
                index: 0,
                routes: [{ name: 'Login' }], // Powrót do logowania
              });
            } catch (error) {
              if (error.response?.status === 400) {
                Alert.alert(
                  'Błąd',
                  'Nie możesz usunąć konta, dopóki nie usuniesz powiązanych pojazdów.'
                );
              } else {
                Alert.alert('Błąd', 'Nie udało się usunąć konta. Spróbuj ponownie.');
              }
            }
          },
        },
      ]
    );
  };

  // Wczytaj dane użytkownika przy pierwszym renderze
  useEffect(() => {
    loadUserProfile();
  }, []);

  if (isLoading) {
    // Wyświetl wskaźnik ładowania, jeśli dane jeszcze się ładują
    return (
      <View className="flex-1 justify-center items-center bg-custom-light">
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View className="flex-1 bg-custom-light">
      <SafeAreaView className="flex-1">
        <ScrollView className="flex-1 px-4 py-6">
          <Text className="text-2xl font-bold text-black text-center mb-6">Twoje konto</Text>

          {/* Sekcja: Wyświetlanie danych użytkownika */}
          {user && (
            <View className="mb-6">
              <Text className="text-lg mb-2">Imię: {user.firstName}</Text>
              <Text className="text-lg mb-2">Nazwisko: {user.lastName}</Text>
              <Text className="text-lg mb-2">E-mail: {user.email}</Text>
              <Text className="text-lg mb-2">Telefon: {user.phoneNumber}</Text>
              <Text className="text-lg mb-2">Adres: {user.address}</Text>
              <CustomButton
                title="Edytuj dane"
                onPress={() =>
                  navigation.navigate('AccountEdit', {
                    userData: user, // Przekazanie danych użytkownika do ekranu edycji
                  })
                }
                className="mt-4 bg-custom-dark"
              />
            </View>
          )}

          {/* Sekcja: Zmiana hasła */}
          <View className="mt-6 items-center">
            <CustomButton
              title="Zmiana hasła"
              onPress={() => navigation.navigate('PasswordEdit')}
              className="bg-blue-500 w-3/4"
            />
          </View>
        </ScrollView>

        {/* Sekcja: Usunięcie konta */}
        <View className="px-4 py-4">
          <CustomButton
            title="Usuń konto"
            onPress={handleDeleteAccount}
            className="bg-red-600"
          />
        </View>
      </SafeAreaView>
    </View>
  );
}
