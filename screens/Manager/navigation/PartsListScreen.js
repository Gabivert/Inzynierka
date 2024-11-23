import React from 'react';
import { View, Text } from 'react-native';

export default function PartsListScreen() {
  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Stany części</Text>
      <Text>Tu znajdzie się lista części.</Text>
    </View>
  );
}
