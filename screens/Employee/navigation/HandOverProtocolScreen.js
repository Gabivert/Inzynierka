import React, { useState } from 'react';
import { View, Text, TextInput, Button, Image, ScrollView, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import CustomButton from '../../../components/CustomButton'; // Własny przycisk
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HandOverProtocolScreen() {
  const [description, setDescription] = useState('');
  const [images, setImages] = useState([]);

  // Funkcja obsługi wyboru zdjęcia
  const handlePickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImages([...images, result.assets[0].uri]);
    }
  };

  // Funkcja obsługi usuwania zdjęcia
  const handleRemoveImage = (index) => {
    const updatedImages = images.filter((_, i) => i !== index);
    setImages(updatedImages);
  };

  // Funkcja obsługi zapisu protokołu
  const handleSubmitProtocol = () => {
    if (!description || images.length === 0) {
      Alert.alert('Błąd', 'Wypełnij opis i dodaj co najmniej jedno zdjęcie.');
      return;
    }
    Alert.alert('Sukces', 'Protokół został zapisany.');
    setDescription('');
    setImages([]);
  };

  return (
    <SafeAreaView className="flex-1 bg-custom-light p-4">
      <ScrollView>
        <Text className="text-2xl font-bold text-black text-center mb-6">
          Protokół przyjęcia pojazdu
        </Text>

        {/* Opis */}
        <View className="mb-6">
          <Text className="text-lg font-semibold mb-2">Opis stanu pojazdu</Text>
          <TextInput
            value={description}
            onChangeText={setDescription}
            placeholder="Wprowadź opis"
            className="bg-white p-2 rounded border"
            multiline
          />
        </View>

        {/* Zdjęcia */}
        <View className="mb-6">
          <Text className="text-lg font-semibold mb-2">Zdjęcia pojazdu</Text>
          <CustomButton
            title="Dodaj zdjęcie"
            onPress={handlePickImage}
            className="bg-blue-500 mb-4"
          />
          <ScrollView horizontal>
            {images.map((uri, index) => (
              <View key={index} className="relative mr-4">
                <Image source={{ uri }} className="w-32 h-32 rounded" />
                <CustomButton
                  title="Usuń"
                  onPress={() => handleRemoveImage(index)}
                  className="bg-red-500 mt-2"
                />
              </View>
            ))}
          </ScrollView>
        </View>

        {/* Zapis protokołu */}
        <CustomButton
          title="Zapisz protokół"
          onPress={handleSubmitProtocol}
          className="bg-green-500 mt-6"
        />
      </ScrollView>
    </SafeAreaView>
  );
}
