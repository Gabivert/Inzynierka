import React from 'react';
import { View, Text } from 'react-native';

export default function ScheduleScreen() {
  return (
    <View className="flex-1 bg-custom-light">
      <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Terminarz</Text>
      <Text>Tu znajdzie się widok terminarza.</Text>
    </View>
  );
}

