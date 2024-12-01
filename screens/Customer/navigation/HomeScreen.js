import React from 'react';
import { View, Text, SafeAreaView, ScrollView } from 'react-native';

export default function HomeScreen() {
  return (
    <SafeAreaView className="flex-1 bg-custom-light">
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <Text className="text-3xl font-bold text-black text-center mb-6">
          Witamy w serwisie IGJ!
        </Text>

        <View className="bg-white p-6 rounded-lg shadow mb-6">
          <Text className="text-lg text-gray-700 mb-4">
            Nasz serwis **IGJ** to innowacyjne rozwiązanie stworzone z myślą o
            Twoich potrzebach. Oferujemy kompleksowe usługi naprawy pojazdów
            oraz zarządzania serwisem, zapewniając wygodę i profesjonalizm na
            każdym etapie współpracy.
          </Text>

          <Text className="text-lg text-gray-700 mb-4">
            Jako lider w branży motoryzacyjnej, łączymy najnowsze technologie z
            doświadczeniem naszych ekspertów. Dzięki naszej aplikacji
            możesz:
          </Text>

          <Text className="text-base text-gray-600 mb-2">- Rezerwować naprawy online</Text>
          <Text className="text-base text-gray-600 mb-2">
            - Zarządzać swoimi pojazdami
          </Text>
          <Text className="text-base text-gray-600 mb-2">
            - Śledzić historię napraw i zgłoszeń
          </Text>
          <Text className="text-base text-gray-600 mb-2">
            - Kontaktować się z ekspertami w czasie rzeczywistym
          </Text>
        </View>

        <View className="bg-white p-6 rounded-lg shadow mb-6">
          <Text className="text-lg font-bold text-black mb-4">
            Dlaczego warto wybrać IGJ?
          </Text>
          <Text className="text-base text-gray-600 mb-2">
            ✔ Innowacyjne podejście do zarządzania naprawami.
          </Text>
          <Text className="text-base text-gray-600 mb-2">
            ✔ Doświadczeni mechanicy gotowi na każde wyzwanie.
          </Text>
          <Text className="text-base text-gray-600 mb-2">
            ✔ Bezpieczne i intuicyjne narzędzia cyfrowe.
          </Text>
          <Text className="text-base text-gray-600 mb-2">
            ✔ Transparentność na każdym etapie współpracy.
          </Text>
        </View>

        <View className="bg-white p-6 rounded-lg shadow">
          <Text className="text-lg font-bold text-black mb-4">
            Skontaktuj się z nami
          </Text>
          <Text className="text-base text-gray-600 mb-2">
            Masz pytania lub potrzebujesz pomocy? Nasi specjaliści są do Twojej
            dyspozycji:
          </Text>
          <Text className="text-base text-gray-600 mb-2">📞 Telefon: +48 123 456 789</Text>
          <Text className="text-base text-gray-600 mb-2">📧 E-mail: kontakt@igj-serwis.pl</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
