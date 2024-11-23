import React from 'react';
import { View, Text } from 'react-native';

export default function InvoicesScreen() {
  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Faktury</Text>
      <Text>Tu znajdzie się lista faktur.</Text>
    </View>
  );
}
