import React, { useState } from 'react';
import { Text, TextInput, Alert, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { uploadProtocolPhoto, addProtocolDescription, generateProtocolPDF } from '../../API/Protocol_api';
import CustomButton from '../../components/CustomButton'; // Przyciski
import * as ImagePicker from 'expo-image-picker';

export default function CreateProtocolScreen({ route, navigation }) {
  const { orderId } = route.params;
  const [description, setDescription] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(false);

  // Dodanie opisu protokołu
  const handleAddDescription = async () => {
    try {
      setLoading(true);
      await addProtocolDescription(orderId, description);
      Alert.alert('Sukces', 'Opis został dodany.');
    } catch (error) {
      Alert.alert('Błąd', 'Nie udało się dodać opisu.');
    } finally {
      setLoading(false);
    }
  };

  // Wybór zdjęcia
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  // Przesyłanie zdjęcia
  const handleUploadPhoto = async () => {
    try {
      setLoading(true);
      await uploadProtocolPhoto(orderId, selectedImage);
      Alert.alert('Sukces', 'Zdjęcie zostało przesłane.');
      setSelectedImage(null);
    } catch (error) {
      Alert.alert('Błąd', 'Nie udało się przesłać zdjęcia.');
    } finally {
      setLoading(false);
    }
  };

  // Generowanie protokołu PDF
  const handleGeneratePDF = async () => {
    try {
      setLoading(true);
      const response = await generateProtocolPDF(orderId);
      Alert.alert('Sukces', `Protokół został wygenerowany: ${response.ProtocolLink}`);
    } catch (error) {
      Alert.alert('Błąd', 'Nie udało się wygenerować protokołu.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 p-4 bg-custom-light">
      <Text className="text-2xl font-bold text-black mb-6">Stwórz Protokół Przyjęcia</Text>

      {/* Pole opisu */}
      <TextInput
        placeholder="Opis stanu pojazdu"
        value={description}
        onChangeText={setDescription}
        multiline
        className="border p-2 mb-4 rounded"
      />
      <CustomButton title="Dodaj opis" onPress={handleAddDescription} className="bg-green-500 mb-4" />

      {/* Przesyłanie zdjęcia */}
      {selectedImage && <Image source={{ uri: selectedImage }} className="w-full h-40 mb-4 rounded" />}
      <CustomButton title="Wybierz zdjęcie" onPress={pickImage} className="bg-blue-500 mb-2" />
      <CustomButton title="Prześlij zdjęcie" onPress={handleUploadPhoto} className="bg-green-500 mb-4" />

      {/* Generowanie PDF */}
      <CustomButton
        title="Generuj PDF"
        onPress={handleGeneratePDF}
        disabled={loading}
        className="bg-purple-500 mb-4"
      />
    </SafeAreaView>
  );
}