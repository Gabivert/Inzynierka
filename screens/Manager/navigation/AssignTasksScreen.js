import React from 'react';
import { View, Text, FlatList, Button, Alert } from 'react-native';

export default function AssignTasksScreen() {
  const mockTasks = [
    { id: '1', title: 'Naprawa silnika', status: 'oczekuje' },
    { id: '2', title: 'Wymiana oleju', status: 'oczekuje' },
    { id: '3', title: 'Przegląd techniczny', status: 'potwierdzone' },
  ];

  const mockEmployees = [
    { id: '1', name: 'Jan Kowalski', available: true },
    { id: '2', name: 'Anna Nowak', available: false },
    { id: '3', name: 'Piotr Zięba', available: true },
  ];

  const assignTask = (taskId, employeeId) => {
    // Tu dodamy logikę przypisania zadania do pracownika
    Alert.alert('Przypisano', `Zadanie ${taskId} zostało przypisane do pracownika ${employeeId}.`);
  };

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 16 }}>Przypisanie zadań</Text>
      <FlatList
        data={mockTasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={{ marginBottom: 16 }}>
            <Text style={{ fontSize: 16 }}>{item.title}</Text>
            <Text>Status: {item.status}</Text>
            <FlatList
              data={mockEmployees}
              keyExtractor={(emp) => emp.id}
              horizontal
              renderItem={({ item: emp }) => (
                <Button
                  title={emp.name}
                  disabled={!emp.available}
                  onPress={() => assignTask(item.id, emp.id)}
                />
              )}
            />
          </View>
        )}
      />
    </View>
  );
}
