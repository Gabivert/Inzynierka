import { View, Text, ScrollView, Alert } from 'react-native';
import React, { useState } from 'react';
import FormField from '../../components/FormField'; // Komponent formularza
import CustomButton from '../../components/CustomButton'; // Komponent przycisku
import { SafeAreaView } from 'react-native-safe-area-context';

export default function AccountScreen({ navigation }) {
  const [user, setUser] = useState({
    firstName: 'Jan',
    lastName: 'Kowalski',
    email: 'jan.kowalski@example.com',
    phoneNumber: '123456789',
    address: 'Lipowa 12, Warszawa',
  });

  const [isEditing, setIsEditing] = useState(false);

  // Funkcja do obsługi zmiany hasła
  const handlePasswordChange = () => {
    navigation.navigate('PasswordEdit'); // Nawigacja do ekranu zmiany hasła
  };

  // Funkcja do obsługi zapisywania edytowanych danych
  const handleSaveChanges = () => {
    Alert.alert('Sukces', 'Twoje dane zostały zaktualizowane.');
    setIsEditing(false); // Wyłącz tryb edycji
  };

  // Funkcja do obsługi usunięcia konta
  const handleDeleteAccount = () => {
    Alert.alert(
      'Potwierdzenie',
      'Czy na pewno chcesz usunąć swoje konto?',
      [
        { text: 'Nie', style: 'cancel' },
        {
          text: 'Tak',
          onPress: () => Alert.alert('Usunięto', 'Twoje konto zostało usunięte.'),
        },
      ]
    );
  };

  return (
    <View className="flex-1 bg-custom-light">
      <SafeAreaView className="flex-1">
        <ScrollView className="flex-1 px-4 py-6">
          <Text className="text-2xl font-bold text-black text-center mb-6">Twoje konto</Text>

          {/* Sekcja: Wyświetlanie i edycja danych użytkownika */}
          <View className="mb-6">
            {isEditing ? (
              <>
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
              </>
            ) : (
              <>
                <Text className="text-lg mb-2">Imię: {user.firstName}</Text>
                <Text className="text-lg mb-2">Nazwisko: {user.lastName}</Text>
                <Text className="text-lg mb-2">E-mail: {user.email}</Text>
                <Text className="text-lg mb-2">Telefon: {user.phoneNumber}</Text>
                <Text className="text-lg mb-2">Adres: {user.address}</Text>
                <CustomButton
                  title="Edytuj dane"
                  onPress={() => setIsEditing(true)}
                  className="mt-4 bg-custom-dark"
                />
              </>
            )}
          </View>

          {/* Sekcja: Zmiana hasła */}
          <View className="mt-6 items-center">
            <CustomButton
              title="Zmiana hasła"
              onPress={handlePasswordChange}
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
