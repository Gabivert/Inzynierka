import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { uploadProtocolPhoto, addProtocolDescription, generateProtocolPDF } from '../../API/Protocol_api';
import * as ImagePicker from 'expo-image-picker';

export default function CreateProtocolScreen({ route }) {
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
    <SafeAreaView style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 16 }}>Stwórz Protokół Przyjęcia</Text>

      {/* Pole opisu */}
      <TextInput
        placeholder="Opis stanu pojazdu"
        value={description}
        onChangeText={setDescription}
        multiline
        style={{ borderWidth: 1, borderColor: 'gray', padding: 8, marginBottom: 16 }}
      />
      <Button title="Dodaj opis" onPress={handleAddDescription} />

      {/* Przesyłanie zdjęcia */}
      {selectedImage && <Image source={{ uri: selectedImage }} style={{ width: 200, height: 200, marginBottom: 16 }} />}
      <Button title="Wybierz zdjęcie" onPress={pickImage} />
      <Button title="Prześlij zdjęcie" onPress={handleUploadPhoto} />

      {/* Generowanie PDF */}
      <Button title="Generuj PDF" onPress={handleGeneratePDF} disabled={loading} />
    </SafeAreaView>
  );
}
