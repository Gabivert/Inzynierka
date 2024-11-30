import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AssignEmployeeScreen from './AssignEmployeeScreen';
import UnfinishedOrdersScreen from './UnfinishedOrdersScreen';
import CompletedOrdersScreen from './CompletedOrdersScreen';
import AssignedOrdersScreen from './AssignedOrdersScreen';

const Tab = createBottomTabNavigator();

export default function ManagerTabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="AssignEmployee" component={AssignEmployeeScreen} options={{
          title: 'Przypisz pracownika',
          headerShown: false, // Wyłączamy nagłówek
        }} />
      <Tab.Screen
        name="UnfinishedOrders"
        component={UnfinishedOrdersScreen}
        options={{
          title: 'Nieukończone zlecenia',
          headerShown: false, // Wyłączamy nagłówek
        }}
      />
       <Tab.Screen
        name="CompletedOrders"
        component={CompletedOrdersScreen}
        options={{
          title: 'Historia zleceń',
          headerShown: false, // Wyłączamy nagłówek
        }}
      />
      <Tab.Screen
        name="AssignedOrders"
        component={AssignedOrdersScreen} // Nowy ekran
        options={{
          title: 'Wyloguj',
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
}
