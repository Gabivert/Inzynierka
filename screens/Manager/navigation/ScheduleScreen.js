import React from 'react';
import { View, Text } from 'react-native';

export default function ScheduleScreen() {
  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Terminarz</Text>
      <Text>Tu znajdzie się widok terminarza.</Text>
    </View>
  );
}
