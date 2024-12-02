import React from 'react';
import { View, Text, SafeAreaView, ScrollView } from 'react-native';

export default function EmployeeHomeScreen() {
  return (
    <SafeAreaView className="flex-1 bg-custom-light">
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <Text className="text-3xl font-bold text-black text-center mb-6">
          Witaj Pracowniku!
        </Text>

        <View className="bg-white p-6 rounded-lg shadow mb-6">
          <Text className="text-lg text-gray-700 mb-4">
            Cieszymy się, że jesteś częścią naszego zespołu w serwisie **IGJ**.
          </Text>

          <Text className="text-lg text-gray-700 mb-4">
            Twoje zadania w aplikacji obejmują:
          </Text>

          <Text className="text-base text-gray-600 mb-2">- Obsługę zleceń napraw pojazdów</Text>
          <Text className="text-base text-gray-600 mb-2">
            - Przygotowywanie protokołów przyjęcia
          </Text>
          <Text className="text-base text-gray-600 mb-2">
            - Aktualizację statusów zleceń
          </Text>
          <Text className="text-base text-gray-600 mb-2">
            - Kontakt z kierownikiem i klientami
          </Text>
        </View>

        <View className="bg-white p-6 rounded-lg shadow mb-6">
          <Text className="text-lg font-bold text-black mb-4">
            Twoje korzyści:
          </Text>
          <Text className="text-base text-gray-600 mb-2">
            ✔ Łatwy dostęp do przypisanych zleceń
          </Text>
          <Text className="text-base text-gray-600 mb-2">
            ✔ Wygodne zarządzanie protokołami i dokumentacją
          </Text>
          <Text className="text-base text-gray-600 mb-2">
            ✔ Możliwość szybkiej aktualizacji statusów prac
          </Text>
          <Text className="text-base text-gray-600 mb-2">
            ✔ Intuicyjny interfejs do zarządzania pojazdami
          </Text>
        </View>

        <View className="bg-white p-6 rounded-lg shadow">
          <Text className="text-lg font-bold text-black mb-4">
            Pamiętaj o regularnym odświeżaniu swoich zadań
          </Text>
          <Text className="text-base text-gray-600 mb-2">
            Dzięki naszej aplikacji masz dostęp do najnowszych informacji o
            przypisanych zleceniach. W razie pytań lub problemów skontaktuj się z
            kierownikiem.
          </Text>
          <Text className="text-base text-gray-600 mb-2">📞 Telefon: +48 987 654 321</Text>
          <Text className="text-base text-gray-600 mb-2">📧 E-mail: wsparcie@igj-serwis.pl</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
